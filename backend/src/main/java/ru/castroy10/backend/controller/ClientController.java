package ru.castroy10.backend.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.castroy10.backend.dto.client.ClientRequestSaveDto;
import ru.castroy10.backend.dto.client.ClientRequestUpdateDto;
import ru.castroy10.backend.service.ClientService;

@RestController
@RequestMapping("/api/v1/client")
public class ClientController {

    private final ClientService clientService;

    @Autowired
    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @PostMapping("/save")
    public ResponseEntity<?> save(@RequestBody @Valid ClientRequestSaveDto clientRequestSaveDto) {
        return clientService.save(clientRequestSaveDto);
    }


    @PutMapping("/update")
    public ResponseEntity<?> update(@RequestBody @Valid ClientRequestUpdateDto clientRequestUpdateDto) {
        return clientService.update(clientRequestUpdateDto);
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
}
