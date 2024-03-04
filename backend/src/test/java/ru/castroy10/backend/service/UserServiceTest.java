package ru.castroy10.backend.service;

import jakarta.servlet.http.HttpServletRequest;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;
import ru.castroy10.backend.controller.UserController;
import ru.castroy10.backend.dto.appuser.AppUserRequestLoginDto;
import ru.castroy10.backend.dto.appuser.AppUserRequestRegisterDto;
import ru.castroy10.backend.dto.appuser.AppUserRequestUpdateDto;
import ru.castroy10.backend.exception.RollbackException;
import ru.castroy10.backend.exception.UserDuplicateException;
import ru.castroy10.backend.model.Appuser;
import ru.castroy10.backend.model.Role;
import ru.castroy10.backend.repository.AppUserRepository;
import ru.castroy10.backend.security.jwt.JwtUtil;

import java.sql.SQLException;
import java.util.Optional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

@SpringBootTest
public class UserServiceTest {

    @MockBean
    private final AppUserRepository appUserRepository;
    @MockBean
    private final RoleService roleService;

    private final UserController userController;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    private final Appuser appuser = new Appuser();
    private final AppUserRequestLoginDto appUserRequestLoginDto = new AppUserRequestLoginDto();
    private final AppUserRequestRegisterDto appUserRequestRegisterDto = new AppUserRequestRegisterDto();
    private final AppUserRequestUpdateDto appUserRequestUpdateDto = new AppUserRequestUpdateDto();
    private final Role role = new Role();
    private final WebApplicationContext webApplicationContext;

    private MockMvc mockMvc;

    @Autowired
    public UserServiceTest(AppUserRepository appUserRepository, RoleService roleService, UserController userController, PasswordEncoder passwordEncoder, JwtUtil jwtUtil, WebApplicationContext webApplicationContext) {
        this.appUserRepository = appUserRepository;
        this.roleService = roleService;
        this.userController = userController;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.webApplicationContext = webApplicationContext;
    }

    @BeforeEach
    public void init() {
        mockMvc = webAppContextSetup(webApplicationContext).build();
        appuser.setId(999L);
        appuser.setUsername("user");
        appuser.setPassword(passwordEncoder.encode("password"));
        appuser.setAccountNonLocked(true);
        appuser.setAccountNonExpired(true);
        appuser.setCredentialsNonExpired(true);
        appuser.setEnabled(true);

        appUserRequestLoginDto.setUsername("user");
        appUserRequestLoginDto.setPassword("password");

        appUserRequestUpdateDto.setId(999L);

        appUserRequestRegisterDto.setFirstName("a");
        appUserRequestRegisterDto.setLastName("b");
        appUserRequestRegisterDto.setMiddleName("c");
        appUserRequestRegisterDto.setUsername("test_user");
        appUserRequestRegisterDto.setPassword("test_password");

        role.setId(999L);
        role.setRoleName("ROLE_SUPERUSER");
    }

    @Test
    public void testLoginSuccess() {
        Mockito.when(appUserRepository.findAppuserByUsername(Mockito.anyString())).thenReturn(Optional.of(appuser));
        ResponseEntity<?> response = userController.getToken(appUserRequestLoginDto);

        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
        Assertions.assertTrue(response.getBody().toString().contains("Token"));
    }

    @Test
    public void testLoginFail() throws Exception {
        Mockito.doAnswer((invocation) -> {
            throw new BadCredentialsException("this test is valid");
        }).when(appUserRepository).findAppuserByUsername(Mockito.anyString());

        mockMvc.perform(post("/api/v1/user/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\": \"user\",\"password\": \"wrong\"}"))
                .andExpect(status().is(400))
                .andExpect(result -> {
                    String errorMessage = result.getResponse().getContentAsString();
                    Assertions.assertTrue(errorMessage.contains("this test is valid"));
                });
    }

    @Test
    public void testRegisterSuccess() throws RollbackException {
        Mockito.when(appUserRepository.save(Mockito.any(Appuser.class))).thenReturn(appuser);
        Mockito.when(roleService.findByRoleName(Mockito.any(String.class))).thenReturn(role);
        ResponseEntity<?> response = userController.register(appUserRequestRegisterDto);

        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
        Assertions.assertEquals("{Пользователь сохранен с id=999}", response.getBody().toString());
    }

    @Test
    public void testRegisterFail() throws Exception {
        Mockito.doAnswer((invocation) -> {
            throw new RollbackException("this test is valid");
        }).when(appUserRepository).save(Mockito.any(Appuser.class));
        Mockito.when(roleService.findByRoleName(Mockito.any(String.class))).thenReturn(role);

        mockMvc.perform(post("/api/v1/user/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"lastName\": \"A\",\"firstName\": \"A\",\"email\": \"A@a.a\",\"username\": \"A\",\"password\": \"A\"}"))
                .andExpect(status().is(400))
                .andExpect(result -> {
                    String errorMessage = result.getResponse().getContentAsString();
                    Assertions.assertTrue(errorMessage.contains("this test is valid"));
                });
    }

    @Test
    public void testUpdateSuccess() throws Exception {
        Mockito.when(appUserRepository.findAppuserById(Mockito.any(Long.class))).thenReturn(Optional.of(appuser));
        Mockito.when(roleService.findByRoleName(Mockito.any(String.class))).thenReturn(role);
        ResponseEntity<?> response = userController.update(appUserRequestUpdateDto);

        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
        Assertions.assertEquals("{Пользователь обновлен с id=999}", response.getBody().toString());
    }

    @Test
    public void testUpdateFailDuplicate() throws Exception {
        Mockito.doAnswer((invocation) -> {
            throw new UserDuplicateException("this test is valid");
        }).when(appUserRepository).findAppuserById(Mockito.any(Long.class));

        mockMvc.perform(put("/api/v1/user/update")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"id\":999,\"lastName\": \"A\",\"firstName\": \"A\",\"middleName\": \"A\"}"))
                .andExpect(status().is(400))
                .andExpect(result -> {
                    String errorMessage = result.getResponse().getContentAsString();
                    Assertions.assertTrue(errorMessage.contains("this test is valid"));
                });
    }

    @Test
    public void testUpdateFailException() throws Exception {
        Mockito.when(appUserRepository.findAppuserById(Mockito.any(Long.class))).thenThrow(new RuntimeException(new SQLException("this test is valid, sql exception with runtime exception")));

        mockMvc.perform(put("/api/v1/user/update")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"id\":999,\"lastName\": \"A\",\"firstName\": \"A\",\"middleName\": \"A\"}"))
                .andExpect(status().is(400))
                .andExpect(result -> {
                    String errorMessage = result.getResponse().getContentAsString();
                    Assertions.assertTrue(errorMessage.contains("this test is valid, sql exception with runtime exception"));
                });
    }

    @Test
    public void testRefresh() {
        HttpServletRequest request = Mockito.mock(HttpServletRequest.class);
        Mockito.when(appUserRepository.findAppuserByUsername(Mockito.anyString())).thenReturn(Optional.of(appuser));
        String token = jwtUtil.generateToken(appuser.getUsername());
        Mockito.when(request.getHeader("Authorization")).thenReturn("Bearer " + token);
        ResponseEntity<?> response = userController.refresh(request);

        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
        Assertions.assertTrue(response.getBody().toString().contains("Refreshtoken"));
    }

    @Test
    public void testFindByIdSuccess() throws UserDuplicateException {
        Mockito.when(appUserRepository.findAppuserById(Mockito.any(Long.class))).thenReturn(Optional.of(appuser));
        ResponseEntity<?> response = userController.findById(1L);

        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
        Assertions.assertTrue(response.getBody().toString().contains("id=999"));
    }

    @Test
    public void testFindByIdFail() throws Exception {
        Mockito.doAnswer((invocation) -> {
            throw new UserDuplicateException("this test is valid");
        }).when(appUserRepository).findAppuserById(Mockito.any(Long.class));

        mockMvc.perform(get("/api/v1/user/find/999")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().is(400))
                .andExpect(result -> {
                    String errorMessage = result.getResponse().getContentAsString();
                    Assertions.assertTrue(errorMessage.contains("this test is valid"));
                });
    }

    @Test
    public void testFindByUserNameSuccess() throws UserDuplicateException {
        Mockito.when(appUserRepository.findAppuserByUsername(Mockito.any(String.class))).thenReturn(Optional.of(appuser));
        ResponseEntity<?> response = userController.findByUserName("username");

        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
        Assertions.assertTrue(response.getBody().toString().contains("id=999"));
    }

    @Test
    public void testFindByUserNameFail() throws Exception {
        Mockito.doAnswer((invocation) -> {
            throw new UserDuplicateException("this test is valid");
        }).when(appUserRepository).findAppuserByUsername(Mockito.any(String.class));

        mockMvc.perform(get("/api/v1/user/find?username=name")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().is(400))
                .andExpect(result -> {
                    String errorMessage = result.getResponse().getContentAsString();
                    Assertions.assertTrue(errorMessage.contains("this test is valid"));
                });
    }

    @Test
    public void testGetProfile() throws UserDuplicateException {
        HttpServletRequest request = Mockito.mock(HttpServletRequest.class);
        Mockito.when(appUserRepository.findAppuserByUsername(Mockito.anyString())).thenReturn(Optional.of(appuser));
        String token = jwtUtil.generateToken(appuser.getUsername());
        Mockito.when(request.getHeader("Authorization")).thenReturn("Bearer " + token);
        ResponseEntity<?> response = userController.getProfile(request);
        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
        Assertions.assertTrue(response.getBody().toString().contains("id=999"));
    }
}