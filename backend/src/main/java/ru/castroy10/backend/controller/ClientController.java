package ru.castroy10.backend.controller;

import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.castroy10.backend.dto.client.ClientRequestSaveDto;
import ru.castroy10.backend.dto.client.ClientRequestUpdateDto;
import ru.castroy10.backend.dto.client.ClientResponseFullDto;
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

    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = ClientResponseFullDto.class))
            })
    })
        @GetMapping("/find/{id}")
    public ResponseEntity<?> findById(@PathVariable("id") Long id) {
        return clientService.findById(id);
    }

    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", content = {
                    @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = ClientResponseFullDto.class)))
            })
    })
    @GetMapping("/find/all")
    public ResponseEntity<?> findAll() {
        return clientService.findAll();
    }

    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", content = {
                    @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = ClientResponseFullDto.class)))
            })
    })
    @GetMapping("/find")
    public ResponseEntity<?> findByName(String name) {
        return clientService.findByName(name);
    }
}
