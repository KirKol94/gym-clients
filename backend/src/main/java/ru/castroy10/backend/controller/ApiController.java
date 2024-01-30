package ru.castroy10.backend.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.castroy10.backend.dto.AppUserDto;
import ru.castroy10.backend.security.jwt.JwtUtil;

import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class ApiController {

    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    public ApiController(JwtUtil jwtUtil, AuthenticationManager authenticationManager) {
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/gettoken")
    public ResponseEntity<?> getToken(@RequestBody AppUserDto appUserDto) {
        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(appUserDto.getUsername(), appUserDto.getPassword());
        try {
            authenticationManager.authenticate(auth);
        } catch (AuthenticationException e) {
            return ResponseEntity.badRequest().contentType(MediaType.APPLICATION_JSON).body(Map.of("Login or password incorrect", e.toString()));
        }
        return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(Map.of("Token", jwtUtil.generateToken(appUserDto.getUsername())));
    }
}
