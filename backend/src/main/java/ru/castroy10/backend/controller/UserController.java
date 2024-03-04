package ru.castroy10.backend.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import ru.castroy10.backend.dto.appuser.AppUserRequestLoginDto;
import ru.castroy10.backend.dto.appuser.AppUserRequestRegisterDto;
import ru.castroy10.backend.dto.appuser.AppUserRequestUpdateDto;
import ru.castroy10.backend.exception.RollbackException;
import ru.castroy10.backend.exception.UserDuplicateException;
import ru.castroy10.backend.security.jwt.JwtUtil;
import ru.castroy10.backend.service.AppUserService;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    private final AppUserService appUserService;

    public UserController(JwtUtil jwtUtil, AuthenticationManager authenticationManager, AppUserService appUserService) {
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
        this.appUserService = appUserService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> getToken(@RequestBody AppUserRequestLoginDto appUserRequestLoginDto) {
        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(appUserRequestLoginDto.getUsername(), appUserRequestLoginDto.getPassword());
        authenticationManager.authenticate(auth);
        return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(Map.of("Token", jwtUtil.generateToken(appUserRequestLoginDto.getUsername())));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid AppUserRequestRegisterDto appUserRequestRegisterDto) throws RollbackException {
        return appUserService.register(appUserRequestRegisterDto);
    }

    @PutMapping("/update")
    public ResponseEntity<?> update(@RequestBody @Valid AppUserRequestUpdateDto appUserRequestUpdateDto) throws UserDuplicateException, IOException {
        return appUserService.update(appUserRequestUpdateDto);
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(HttpServletRequest httpServletRequest) {
        return ResponseEntity.ok().body(Map.of("Refreshtoken", jwtUtil.refreshToken(httpServletRequest)));
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<?> findById(@PathVariable("id") Long id) throws UserDuplicateException {
        return appUserService.findById(id);
    }

    @GetMapping("/find")
    public ResponseEntity<?> findByUserName(String username) throws UserDuplicateException {
        return appUserService.findByUserName(username);
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(HttpServletRequest httpServletRequest) throws UserDuplicateException {
        return appUserService.getProfile(httpServletRequest);
    }

    @GetMapping("/getavatar/{filename}")
    public ResponseEntity<?> getAvatar(@PathVariable("filename") String filename) throws MalformedURLException {
        return appUserService.getAvatar(filename);
    }
}
