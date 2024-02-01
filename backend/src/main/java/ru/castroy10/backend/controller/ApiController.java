package ru.castroy10.backend.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.castroy10.backend.dto.appuser.AppUserDto;
import ru.castroy10.backend.dto.appuser.AppUserRegisterDto;
import ru.castroy10.backend.security.jwt.JwtUtil;
import ru.castroy10.backend.service.AppUserService;

import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class ApiController {

    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    private final AppUserService appUserService;

    public ApiController(JwtUtil jwtUtil, AuthenticationManager authenticationManager, AppUserService appUserService) {
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
        this.appUserService = appUserService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> getToken(@RequestBody AppUserDto appUserDto) {
        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(appUserDto.getUsername(), appUserDto.getPassword());
        try {
            authenticationManager.authenticate(auth);
        } catch (AuthenticationException e) {
            return ResponseEntity.badRequest().contentType(MediaType.APPLICATION_JSON).body(Map.of("Login or password incorrect", e.toString()));
        }
        return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(Map.of("Token", jwtUtil.generateToken(appUserDto.getUsername())));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AppUserRegisterDto appUserRegisterDto) {
        return appUserService.register(appUserRegisterDto);
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(HttpServletRequest httpServletRequest) {
        return ResponseEntity.ok().body(Map.of("Refresh token", jwtUtil.refreshToken(httpServletRequest)));
    }
}
