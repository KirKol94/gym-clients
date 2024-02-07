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
import ru.castroy10.backend.dto.appuser.AppUserResponseFullDto;
import ru.castroy10.backend.dto.appuser.AppUserUpdateDto;
import ru.castroy10.backend.exception.RollbackException;
import ru.castroy10.backend.exception.UserDuplicateException;
import ru.castroy10.backend.model.Appuser;
import ru.castroy10.backend.model.Role;
import ru.castroy10.backend.repository.AppUserRepository;

import java.io.IOException;
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
    public Appuser save(Appuser appuser) {
        Appuser savedUser = appUserRepository.save(appuser);
        log.info("Пользователь {} {} {} записан в базу данных, id={}", appuser.getLastName(), appuser.getFirstName(), appuser.getMiddleName(), appuser.getId());
        return savedUser;
    }

    @Transactional(rollbackFor = RollbackException.class)
    public ResponseEntity<?> register(AppUserRegisterDto appUserRegisterDto) throws RollbackException {
        try {
            if (checkUserExist(appUserRegisterDto.getUsername()))
                throw new UserDuplicateException("Такой пользователь уже существует");
            Appuser appuser = modelMapper.map(appUserRegisterDto, Appuser.class);
            appUserAvatarService.saveAvatar(appuser, appUserRegisterDto);
            setUserAttributes(appuser, appUserRegisterDto);
            appuser = save(appuser);
            return ResponseEntity.ok().body(Map.of("Пользователь сохранен с id", appuser.getId().intValue()));
        } catch (Exception e) {
            log.error("Ошибка регистрации клиента {}, {}", appUserRegisterDto.getUsername(), e.getMessage());
            throw new RollbackException(e.getMessage());
        }
    }

    @Transactional
    public ResponseEntity<?> update(AppUserUpdateDto appUserUpdateDto) throws UserDuplicateException, IOException {
        if (!checkUserExist(appUserUpdateDto.getId()))
            throw new UserDuplicateException("Пользователя с таким id не существует");
        Appuser appuser = appUserRepository.findAppuserById(appUserUpdateDto.getId()).orElse(new Appuser());
        modelMapper.map(appUserUpdateDto, appuser);
        appUserAvatarService.saveAvatar(appuser, appUserUpdateDto);
        setUserAttributes(appuser, appUserUpdateDto);
        setUserRoles(appuser, appUserUpdateDto);
        log.info("Пользователь {} {} {} обновлен в базу данных, id={}", appuser.getLastName(), appuser.getFirstName(), appuser.getMiddleName(), appuser.getId());
        return ResponseEntity.ok().body(Map.of("Пользователь обновлен с id", appuser.getId().intValue()));
    }

    public ResponseEntity<?> findById(Long id) throws UserDuplicateException {
        if (!checkUserExist(id))
            throw new UserDuplicateException("Пользователя с таким id не существует");
        Appuser appuser = appUserRepository.findAppuserById(id).orElse(new Appuser());
        return ResponseEntity.ok().body(modelMapper.map(appuser, AppUserResponseFullDto.class));
    }

    public ResponseEntity<?> findByUserName(String username) throws UserDuplicateException {
        if (!checkUserExist(username))
            throw new UserDuplicateException("Пользователя с таким username не существует");
        Appuser appuser = appUserRepository.findAppuserByUsername(username).orElse(new Appuser());
        return ResponseEntity.ok().body(modelMapper.map(appuser, AppUserResponseFullDto.class));
    }

    private boolean checkUserExist(String username) {
        Optional<Appuser> appuser = appUserRepository.findAppuserByUsername(username);
        return appuser.isPresent();
    }

    private boolean checkUserExist(Long id) {
        Optional<Appuser> appuser = appUserRepository.findAppuserById(id);
        return appuser.isPresent();
    }

    private void setUserRoles(Appuser appuser, AppUserUpdateDto appUserUpdateDto) {
        if (appUserUpdateDto.getRoles() != null && !getRolesFromDB(appUserUpdateDto).isEmpty()) {
            appuser.setRoles(null);
            appuser.setRoles(getRolesFromDB(appUserUpdateDto));
        }
    }

    private Set<Role> getRolesFromDB(AppUserUpdateDto appUserUpdateDto) {
        return appUserUpdateDto.getRoles().stream()
                .map(role -> roleService.findByRoleName(role.getRoleName()))
                .collect(Collectors.toSet());
    }

    private void setUserAttributes(Appuser appuser, AppUserDto appUserDto) {
        if (appUserDto.getPassword() != null) appuser.setPassword(passwordEncoder.encode(appUserDto.getPassword()));
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

