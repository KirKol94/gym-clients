package ru.castroy10.backend.service;

import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
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

import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Service
public class AppUserService {

    private final AppUserRepository appUserRepository;
    private final ModelMapper modelMapper;
    private final RoleService roleService;
    private final PasswordEncoder passwordEncoder;
    private final AppUserAvatarService appUserAvatarService;


    @Autowired
    public AppUserService(AppUserRepository appUserRepository, ModelMapper modelMapper, RoleService roleService, PasswordEncoder passwordEncoder, AppUserAvatarService appUserAvatarService) {
        this.appUserRepository = appUserRepository;
        this.roleService = roleService;
        this.modelMapper = modelMapper;
        this.passwordEncoder = passwordEncoder;
        this.appUserAvatarService = appUserAvatarService;
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
            if (checkUserExist(appUserRegisterDto.getUsername()))
                throw new UserDuplicateException("Такой пользователь уже существует");
            Appuser appuser = modelMapper.map(appUserRegisterDto, Appuser.class);
            appUserAvatarService.saveAvatar(appuser, appUserRegisterDto);
            setUserAttributes(appuser, appUserRegisterDto);
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
            if (!checkUserExist(appUserUpdateDto.getId()))
                throw new UserDuplicateException("Пользователя с таким id не существует");
            Appuser appuser = appUserRepository.findAppuserById(appUserUpdateDto.getId()).orElse(new Appuser());
            modelMapper.map(appUserUpdateDto, appuser);
            setUserAttributes(appuser, appUserUpdateDto);
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

    private Set<Role> getRolesFromDB(AppUserUpdateDto appUserUpdateDto) {
        return appUserUpdateDto.getRoles().stream()
                .map(role -> roleService.findByRoleName(role.getRoleName()))
                .collect(Collectors.toSet());
    }

    private void setUserAttributes(Appuser appuser, AppUserDto appUserDto) {
        appuser.setPassword(passwordEncoder.encode(appUserDto.getPassword()));
        appuser.setAccountNonLocked(true);
        appuser.setAccountNonExpired(true);
        appuser.setCredentialsNonExpired(true);
        appuser.setEnabled(true);
        if (appUserDto instanceof AppUserRegisterDto) {
            Role role = roleService.findByRoleName("ROLE_USER");
            appuser.setRoles(Set.of(role));
        }
    }
}


