package ru.castroy10.backend;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import ru.castroy10.backend.model.Appuser;
import ru.castroy10.backend.model.Role;
import ru.castroy10.backend.security.jwt.JwtUtil;
import ru.castroy10.backend.service.AppUserService;

import java.util.Set;

@SpringBootTest
class BackendApplicationTests {

    private final AppUserService appUserService;
    private final JwtUtil jwtUtil;

    @Autowired
    BackendApplicationTests(AppUserService appUserService, JwtUtil jwtUtil) {
        this.appUserService = appUserService;
        this.jwtUtil = jwtUtil;
    }

    @Test
    void contextLoads() {
        Appuser appuser = new Appuser();
        appuser.setFirstName("Самый");
        appuser.setMiddleName("Главный");
        appuser.setLastName("Админ");
        appuser.setUsername("admin");
        appuser.setPassword("$2a$10$.Mpu96rUydo9RvNv.LykQOg72KUFLpZuQkHoNZ.3SHKg5Q00jwbly");
        Role role = new Role();
        role.setRoleName("ROLE_ADMIN");
        appuser.setRoles(Set.of(role));
        appuser.setAccountNonExpired(true);
        appuser.setAccountNonLocked(true);
        appuser.setCredentialsNonExpired(true);
        appuser.setEnabled(true);
        System.out.println(appuser);
//		appUserService.save(appuser);
    }

    @Test
    void JwtUtil() {
        String token = jwtUtil.generateToken("user32");
        Assertions.assertEquals("user32", jwtUtil.verifyToken(token));
    }

}
