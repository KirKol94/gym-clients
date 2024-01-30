package ru.castroy10.backend.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import ru.castroy10.backend.dto.client.ClientDto;
import ru.castroy10.backend.dto.client.ClientDtoUpdate;
import ru.castroy10.backend.service.ClientService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/client")
public class ClientController {

    private final ClientService clientService;

    @Autowired
    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @PostMapping("/save")
    public ResponseEntity<?> save(@RequestBody @Valid ClientDto clientDto) {
        return clientService.save(clientDto);
    }

    @PutMapping("/update")
    public ResponseEntity<?> update(@RequestBody @Valid ClientDtoUpdate clientDtoUpdate) {
        return clientService.update(clientDtoUpdate);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<?> findById(@PathVariable("id") Long id) {
        return clientService.findById(id);
    }

    @GetMapping("/find/all")
    public ResponseEntity<?> findAll() {
        return clientService.findAll();
    }

    @GetMapping("/find")
    public ResponseEntity<?> findByName(String name) {
        return clientService.findByName(name);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleValidation(MethodArgumentNotValidException exception) {
        Map<String, String> errors = new HashMap<>();
        exception.getBindingResult().getAllErrors().forEach((e) -> {
            String fieldName = ((FieldError) e).getField();
            String message = e.getDefaultMessage();
            errors.put(fieldName, message);
        });
        return ResponseEntity.badRequest().body(errors);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<?> handleValidation2(HttpMessageNotReadableException exception) {
        return ResponseEntity.badRequest().body(Map.of("Ошибка, одно из значений находится вне допустимых вариантов значений", exception.getMessage()));
    }
}
