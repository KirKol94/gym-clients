package ru.castroy10.backend.service;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.castroy10.backend.dto.appuser.AppUserDto;
import ru.castroy10.backend.dto.appuser.AppUserRequestRegisterDto;
import ru.castroy10.backend.dto.appuser.AppUserResponseFullDto;
import ru.castroy10.backend.dto.appuser.AppUserRequestUpdateDto;
import ru.castroy10.backend.exception.RollbackException;
import ru.castroy10.backend.exception.UserDuplicateException;
import ru.castroy10.backend.model.Appuser;
import ru.castroy10.backend.model.Role;
import ru.castroy10.backend.repository.AppUserRepository;
import ru.castroy10.backend.security.jwt.JwtUtil;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
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
    private final JwtUtil jwtUtil;
    @Value("${pathForAvatars}")
    private String pathForAvatar;

    @Autowired
    public AppUserService(AppUserRepository appUserRepository, ModelMapper modelMapper, RoleService roleService, PasswordEncoder passwordEncoder, AppUserAvatarService appUserAvatarService, JwtUtil jwtUtil) {
        this.appUserRepository = appUserRepository;
        this.roleService = roleService;
        this.modelMapper = modelMapper;
        this.passwordEncoder = passwordEncoder;
        this.appUserAvatarService = appUserAvatarService;
        this.jwtUtil = jwtUtil;
    }

    @Transactional
    public Appuser save(Appuser appuser) {
        Appuser savedUser = appUserRepository.save(appuser);
        log.info("Пользователь {} {} {} записан в базу данных, id={}", appuser.getLastName(), appuser.getFirstName(), appuser.getMiddleName(), appuser.getId());
        return savedUser;
    }

    @Transactional(rollbackFor = RollbackException.class)
    public ResponseEntity<?> register(AppUserRequestRegisterDto appUserRequestRegisterDto) throws RollbackException {
        try {
            if (checkUserExist(appUserRequestRegisterDto.getUsername()))
                throw new UserDuplicateException("Такой пользователь уже существует");
            Appuser appuser = modelMapper.map(appUserRequestRegisterDto, Appuser.class);
            appUserAvatarService.saveAvatar(appuser, appUserRequestRegisterDto);
            setUserAttributes(appuser, appUserRequestRegisterDto);
            appuser = save(appuser);
            return ResponseEntity.ok().body(Map.of("Пользователь сохранен с id", appuser.getId().intValue()));
        } catch (Exception e) {
            log.error("Ошибка регистрации клиента {}, {}", appUserRequestRegisterDto.getUsername(), e.getMessage());
            throw new RollbackException(e.getMessage());
        }
    }

    @Transactional
    public ResponseEntity<?> update(AppUserRequestUpdateDto appUserRequestUpdateDto) throws UserDuplicateException, IOException {
        if (!checkUserExist(appUserRequestUpdateDto.getId()))
            throw new UserDuplicateException("Пользователя с таким id не существует");
        Appuser appuser = appUserRepository.findAppuserById(appUserRequestUpdateDto.getId()).orElse(new Appuser());
        modelMapper.map(appUserRequestUpdateDto, appuser);
        appUserAvatarService.saveAvatar(appuser, appUserRequestUpdateDto);
        setUserAttributes(appuser, appUserRequestUpdateDto);
        setUserRoles(appuser, appUserRequestUpdateDto);
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

    public ResponseEntity<?> getProfile(HttpServletRequest httpServletRequest) throws UserDuplicateException {
        String username = jwtUtil.verifyToken(httpServletRequest.getHeader("Authorization").substring(7));
        return findByUserName(username);
    }

    public ResponseEntity<?> getAvatar(String filename) throws MalformedURLException {
        File file = new File(pathForAvatar, filename);
        Resource resource = new UrlResource(file.toURI());
        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(resource);
    }

    private boolean checkUserExist(String username) {
        Optional<Appuser> appuser = appUserRepository.findAppuserByUsername(username);
        return appuser.isPresent();
    }

    private boolean checkUserExist(Long id) {
        Optional<Appuser> appuser = appUserRepository.findAppuserById(id);
        return appuser.isPresent();
    }

    private void setUserRoles(Appuser appuser, AppUserRequestUpdateDto appUserRequestUpdateDto) {
        if (appUserRequestUpdateDto.getRoles() != null && !getRolesFromDB(appUserRequestUpdateDto).isEmpty()) {
            appuser.setRoles(null);
            appuser.setRoles(getRolesFromDB(appUserRequestUpdateDto));
        }
    }

    private Set<Role> getRolesFromDB(AppUserRequestUpdateDto appUserRequestUpdateDto) {
        return appUserRequestUpdateDto.getRoles().stream()
                .map(role -> roleService.findByRoleName(role.getRoleName()))
                .collect(Collectors.toSet());
    }

    private void setUserAttributes(Appuser appuser, AppUserDto appUserDto) {
        if (appUserDto.getPassword() != null) appuser.setPassword(passwordEncoder.encode(appUserDto.getPassword()));
        appuser.setAccountNonLocked(true);
        appuser.setAccountNonExpired(true);
        appuser.setCredentialsNonExpired(true);
        appuser.setEnabled(true);
        if (appUserDto instanceof AppUserRequestRegisterDto) {
            Role role = roleService.findByRoleName("ROLE_USER");
            appuser.setRoles(Set.of(role));
        }
    }
}


