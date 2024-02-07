package ru.castroy10.backend.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import ru.castroy10.backend.exception.RollbackException;
import ru.castroy10.backend.exception.UserDuplicateException;

import java.io.IOException;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
@RestController
@Slf4j
public class ExceptionHandlerController {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> methodArgumentNotValid(MethodArgumentNotValidException exception) {
        Map<String, String> errors = new HashMap<>();
        exception.getBindingResult().getAllErrors().forEach((e) -> {
            String fieldName = ((FieldError) e).getField();
            String message = e.getDefaultMessage();
            errors.put(fieldName, message);
        });
        return ResponseEntity.badRequest().body(errors);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<?> httpMessageNotReadable(HttpMessageNotReadableException exception) {
        return ResponseEntity.badRequest().body(Map.of("Ошибка, одно из значений находится вне допустимых вариантов значений", exception.getMessage()));
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<?> authenticationException(AuthenticationException exception) {
        return ResponseEntity.badRequest().contentType(MediaType.APPLICATION_JSON).body(Map.of("Login or password incorrect", exception.getMessage()));
    }

    @ExceptionHandler(RollbackException.class)
    public ResponseEntity<?> rollbackException(RollbackException exception) {
        return ResponseEntity.badRequest().body(Map.of("Ошибка", exception.getMessage()));
    }

    @ExceptionHandler(UserDuplicateException.class)
    public ResponseEntity<?> userDuplicateException(UserDuplicateException exception) {
        log.error("Ошибка {}", exception.getMessage());
        return ResponseEntity.badRequest().body(Map.of("Ошибка", exception.getMessage()));
    }

    @ExceptionHandler(SQLException.class)
    public ResponseEntity<?> sqlException(SQLException exception) {
        log.error("Ошибка {}", exception.getMessage());
        return ResponseEntity.badRequest().body(Map.of("Ошибка", exception.getMessage()));
    }

    @ExceptionHandler(IOException.class)
    public ResponseEntity<?> IOException(IOException exception) {
        log.error("Ошибка {}", exception.getMessage());
        return ResponseEntity.badRequest().body(Map.of("Ошибка", exception.getMessage()));
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<?> UsernameNotFoundException(UsernameNotFoundException exception) {
        log.error("Ошибка {}", exception.getMessage());
        return ResponseEntity.badRequest().body(Map.of("Ошибка", exception.getMessage()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> exception(Exception exception) {
        log.error("Ошибка {}", exception.getMessage());
        return ResponseEntity.badRequest().body(Map.of("Ошибка", exception.getMessage()));
    }
}
