package ru.castroy10.backend.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.castroy10.backend.dto.abonement.AbonementRequestSaveDto;
import ru.castroy10.backend.dto.abonement.AbonementRequestUpdateDto;
import ru.castroy10.backend.exception.AbonementNotFoundException;
import ru.castroy10.backend.service.AbonementService;

@RestController
@RequestMapping("/api/v1/abonement")
public class AbonementController {

    private final AbonementService abonementService;

    @Autowired
    public AbonementController(AbonementService abonementService) {
        this.abonementService = abonementService;
    }

    @PostMapping("/save")
    public ResponseEntity<?> save(@RequestBody @Valid AbonementRequestSaveDto abonementRequestSaveDto) {
        return abonementService.save(abonementRequestSaveDto);
    }

    @PutMapping("/update")
    public ResponseEntity<?> update(@RequestBody @Valid AbonementRequestUpdateDto abonementRequestUpdateDto) throws AbonementNotFoundException {
        return abonementService.update(abonementRequestUpdateDto);
    }

    @GetMapping("/find/all")
    public ResponseEntity<?> findAll() {
        return abonementService.findAll();
    }
}
