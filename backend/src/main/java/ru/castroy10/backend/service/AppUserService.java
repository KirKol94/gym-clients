package ru.castroy10.backend.service;

import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.castroy10.backend.dto.appuser.AppUserDto;
import ru.castroy10.backend.dto.appuser.AppUserRegisterDto;
import ru.castroy10.backend.dto.appuser.AppUserUpdateDto;
import ru.castroy10.backend.exception.RollbackException;
import ru.castroy10.backend.exception.UserDuplicateException;
import ru.castroy10.backend.model.Appuser;
import ru.castroy10.backend.model.Role;
import ru.castroy10.backend.repository.AppUserRepository;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
public class AppUserService {

    private final AppUserRepository appUserRepository;
    private final ModelMapper modelMapper;
    private final RoleService roleService;
    private final PasswordEncoder passwordEncoder;
    @Value("${pathForAvatars}")
    private String pathForAvatars;

    @Autowired
    public AppUserService(AppUserRepository appUserRepository, ModelMapper modelMapper, RoleService roleService, PasswordEncoder passwordEncoder) {
        this.appUserRepository = appUserRepository;
        this.roleService = roleService;
        this.modelMapper = modelMapper;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public void save(Appuser appuser) {
        try {
            appUserRepository.save(appuser);
            log.info("Пользователь {} {} {} записан в базу данных, id={}", appuser.getLastName(), appuser.getFirstName(), appuser.getMiddleName(), appuser.getId());
        } catch (Exception e) {
            log.error("Ошибка записи пользователя в базу данных, {}", e.getMessage());
            throw new RuntimeException(e);
        }
    }

    @Transactional(rollbackFor = RollbackException.class)
    public ResponseEntity<?> register(AppUserRegisterDto appUserRegisterDto) throws RollbackException {
        try {
            String avatarFile = null;
            if (checkUserExist(appUserRegisterDto.getUsername()))
                throw new UserDuplicateException("Такой пользователь уже существует");
            if (checkAvatarExist(appUserRegisterDto)) avatarFile = saveAvatarFile(appUserRegisterDto);
            Appuser appuser = modelMapper.map(appUserRegisterDto, Appuser.class);
            setUserAttributes(appuser, appUserRegisterDto, avatarFile);
            save(appuser);
            return ResponseEntity.ok().body(Map.of("Пользователь сохранен с id", appuser.getId().intValue()));
        } catch (UserDuplicateException e) {
            log.error("Ошибка регистрации клиента {}, {}", appUserRegisterDto.getUsername(), e.getMessage());
            return ResponseEntity.badRequest().body(Map.of("Ошибка", e.getMessage()));
        } catch (Exception e) {
            log.error("Ошибка регистрации клиента {}, {}", appUserRegisterDto.getUsername(), e.getMessage());
            throw new RollbackException(e.getMessage());
        }
    }

    @Transactional
    public ResponseEntity<?> update(AppUserUpdateDto appUserUpdateDto) {
        try {
            String avatarFile = null;
            if (!checkUserExist(appUserUpdateDto.getId()))
                throw new UserDuplicateException("Пользователя с таким id не существует");
            if (checkAvatarExist(appUserUpdateDto)) avatarFile = saveAvatarFile(appUserUpdateDto);
            Appuser appuser = appUserRepository.findAppuserById(appUserUpdateDto.getId()).orElse(new Appuser());
            modelMapper.map(appUserUpdateDto, appuser);
            setUserAttributes(appuser, appUserUpdateDto, avatarFile);
            if (appUserUpdateDto.getRoles() != null) {
                appuser.setRoles(null);
                appuser.setRoles(getRolesFromDB(appUserUpdateDto));
            }
            log.info("Пользователь {} {} {} обновлен в базу данных, id={}", appuser.getLastName(), appuser.getFirstName(), appuser.getMiddleName(), appuser.getId());
            System.out.println(appuser);
            return ResponseEntity.ok().body(Map.of("Пользователь обновлен с id", appuser.getId().intValue()));
        } catch (Exception e) {
            log.error("Ошибка обновления клиента id {}, {}", appUserUpdateDto.getId(), e.getMessage());
            return ResponseEntity.badRequest().body(Map.of("Ошибка", e.getMessage()));
        }
    }

    private boolean checkUserExist(String username) {
        Optional<Appuser> appuser = appUserRepository.findAppuserByUsername(username);
        return appuser.isPresent();
    }

    private boolean checkUserExist(Long id) {
        Optional<Appuser> appuser = appUserRepository.findAppuserById(id);
        return appuser.isPresent();
    }

    private boolean checkAvatarExist(AppUserDto appUserDto) {
        if (appUserDto.getAvatarFileName() == null
                || appUserDto.getAvatarFileData() == null
                || appUserDto.getAvatarFileName().isBlank()
                || appUserDto.getAvatarFileData().isBlank()) {
            return false;
        } else return true;
    }

    private Set<Role> getRolesFromDB(AppUserUpdateDto appUserUpdateDto) {
        Set<Role> roles = appUserUpdateDto.getRoles().stream()
                .map(role -> roleService.findByRoleName(role.getRoleName()))
                .collect(Collectors.toSet());
        return roles;
    }

    private void setUserAttributes(Appuser appuser, AppUserDto appUserDto, String avatarFile) {
        appuser.setPassword(passwordEncoder.encode(appUserDto.getPassword()));
        appuser.setAvatar(avatarFile);
        appuser.setAccountNonLocked(true);
        appuser.setAccountNonExpired(true);
        appuser.setCredentialsNonExpired(true);
        appuser.setEnabled(true);
        if (appUserDto instanceof AppUserRegisterDto) {
            Role role = roleService.findByRoleName("ROLE_USER");
            appuser.setRoles(Set.of(role));
        }
    }

    private String saveAvatarFile(AppUserDto appUserDto) throws IOException {
        String filename = UUID.randomUUID() + "." + appUserDto.getAvatarFileName().substring(appUserDto.getAvatarFileName().lastIndexOf(".") + 1);
        String base64Data = appUserDto.getAvatarFileData();
        byte[] binaryBytes = Base64.getDecoder().decode(base64Data);
        Path avatarFile = Path.of(pathForAvatars + filename);
        if (!Files.exists(avatarFile)) Files.createFile(avatarFile);
        Files.write(avatarFile, binaryBytes, StandardOpenOption.WRITE);
        return avatarFile.toString();
    }
}


