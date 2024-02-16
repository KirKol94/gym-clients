package ru.castroy10.backend.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.castroy10.backend.dto.personaltraining.PersonalTrainingRequestSaveDto;
import ru.castroy10.backend.service.PersonalTrainingService;

@RestController
@RequestMapping("/api/v1/personaltraining")
public class PersonalTrainingController {

    private final PersonalTrainingService personalTrainingService;

    @Autowired
    public PersonalTrainingController(PersonalTrainingService personalTrainingService) {
        this.personalTrainingService = personalTrainingService;
    }

    @PostMapping("/save")
    public ResponseEntity<?> save(@RequestBody @Valid PersonalTrainingRequestSaveDto personalTrainingRequestSaveDto) {
        return personalTrainingService.save(personalTrainingRequestSaveDto);
    }
}
