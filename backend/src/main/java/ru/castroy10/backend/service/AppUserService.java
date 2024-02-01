package ru.castroy10.backend.service;

import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.castroy10.backend.dto.appuser.AppUserRegisterDto;
import ru.castroy10.backend.exception.UserDuplicateException;
import ru.castroy10.backend.model.Appuser;
import ru.castroy10.backend.model.Role;
import ru.castroy10.backend.repository.AppUserRepository;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.util.*;

@Slf4j
@Service
public class AppUserService {

    private final AppUserRepository appUserRepository;
    private final ModelMapper modelMapper;
    private final RoleService roleService;
    private final PasswordEncoder passwordEncoder;

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

    @Transactional
    public ResponseEntity<?> register(AppUserRegisterDto appUserRegisterDto) {
        try {
            String avatarFile = null;
            checkUserExist(appUserRegisterDto.getUsername());
            if (avatarExists(appUserRegisterDto)) {
                avatarFile = saveAvatarFile(appUserRegisterDto);
            }
            Appuser appuser = modelMapper.map(appUserRegisterDto, Appuser.class);
            setUserAttributes(appuser, appUserRegisterDto, avatarFile);
            save(appuser);
            System.out.println(appuser);
            return ResponseEntity.ok(avatarFile);
        } catch (IOException | UserDuplicateException e) {
            log.error("Ошибка регистрации клиента {}, {}", appUserRegisterDto.getUsername(), e.getMessage());
            return ResponseEntity.badRequest().body(Map.of("Ошибка", e.getMessage()));
        }
    }

    private void checkUserExist(String username) throws UserDuplicateException {
        Optional<Appuser> appuser = appUserRepository.findAppuserByUsername(username);
        if (appuser.isPresent()) throw new UserDuplicateException("Такой пользователь уже существует");
    }

    private void setUserAttributes(Appuser appuser, AppUserRegisterDto appUserRegisterDto, String avatarFile) {
        appuser.setPassword(passwordEncoder.encode(appUserRegisterDto.getPassword()));
        appuser.setAvatar(avatarFile);
        appuser.setAccountNonLocked(true);
        appuser.setAccountNonExpired(true);
        appuser.setCredentialsNonExpired(true);
        appuser.setEnabled(true);
        Role role = roleService.findByRoleName("ROLE_USER");
        appuser.setRoles(Set.of(role));
    }

    private boolean avatarExists(AppUserRegisterDto appUserRegisterDto) {
        if (appUserRegisterDto.getAvatarFileName() == null
                || appUserRegisterDto.getAvatarFileData() == null
                || appUserRegisterDto.getAvatarFileName().isBlank()
                || appUserRegisterDto.getAvatarFileData().isBlank()) {
            return false;
        } else return true;
    }

    private String saveAvatarFile(AppUserRegisterDto appUserRegisterDto) throws IOException {
        String filename = UUID.randomUUID() + "." + appUserRegisterDto.getAvatarFileName().substring(appUserRegisterDto.getAvatarFileName().lastIndexOf(".") + 1);
        String base64Data = appUserRegisterDto.getAvatarFileData();
        byte[] binaryBytes = Base64.getDecoder().decode(base64Data);
        Path avatarFile = Path.of("C:\\Users\\o.balychev\\AppData\\Local\\Temp\\" + filename);
        if (!Files.exists(avatarFile)) Files.createFile(avatarFile);
        Files.write(avatarFile, binaryBytes, StandardOpenOption.WRITE);
        return avatarFile.toString();
    }
}
