package ru.castroy10.backend.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.castroy10.backend.dto.trainee.TraineeDto;
import ru.castroy10.backend.dto.trainee.TraineeDtoUpdate;
import ru.castroy10.backend.service.TraineeService;

@RestController
@RequestMapping("/api/v1/trainee")
public class TraineeController {

    private final TraineeService traineeService;

    @Autowired
    public TraineeController(TraineeService traineeService) {
        this.traineeService = traineeService;
    }

    @PostMapping("/save")
    public ResponseEntity<?> save(@RequestBody @Valid TraineeDto traineeDto) {
        return traineeService.save(traineeDto);
    }


    @PutMapping("/update")
    public ResponseEntity<?> update(@RequestBody @Valid TraineeDtoUpdate traineeDtoUpdate) {
        return traineeService.update(traineeDtoUpdate);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<?> findById(@PathVariable("id") Long id) {
        return traineeService.findById(id);
    }

    @GetMapping("/find/all")
    public ResponseEntity<?> findAll() {
        return traineeService.findAll();
    }

    @GetMapping("/find")
    public ResponseEntity<?> findByName(String name) {
        return traineeService.findByName(name);
    }
}
