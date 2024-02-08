package ru.castroy10.backend.service;

import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.castroy10.backend.dto.trainee.TraineeDto;
import ru.castroy10.backend.dto.trainee.TraineeDtoUpdate;
import ru.castroy10.backend.dto.trainee.TraineeFullDto;
import ru.castroy10.backend.dto.trainee.TraineeSaveDto;
import ru.castroy10.backend.model.Trainee;
import ru.castroy10.backend.repository.TraineeRepository;

import java.util.List;

@Slf4j
@Service
public class TraineeService {

    private final TraineeRepository traineeRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public TraineeService(TraineeRepository traineeRepository, ModelMapper modelMapper) {
        this.traineeRepository = traineeRepository;
        this.modelMapper = modelMapper;
    }

    @Transactional
    public ResponseEntity<?> save(TraineeDto traineeDto) {
        Trainee trainee = modelMapper.map(traineeDto, Trainee.class);
        traineeRepository.save(trainee);
        log.info("Тренер {} {} {} записан в базу данных, id={}", trainee.getLastName(), trainee.getFirstName(), trainee.getMiddleName(), trainee.getId());
        return ResponseEntity.ok(modelMapper.map(trainee, TraineeSaveDto.class));
    }

    @Transactional
    public ResponseEntity<?> update(TraineeDtoUpdate traineeDtoUpdate) {
        Trainee trainee = traineeRepository.findById(traineeDtoUpdate.getId()).orElseThrow(() -> new UsernameNotFoundException("Тренер не найден"));
        modelMapper.map(traineeDtoUpdate, trainee);
        log.info("Тренер {} {} {} обновлен, id={}", trainee.getLastName(), trainee.getFirstName(), trainee.getMiddleName(), trainee.getId());
        return ResponseEntity.ok(modelMapper.map(trainee, TraineeSaveDto.class));
    }

    public ResponseEntity<?> findById(Long id) {
        Trainee trainee = traineeRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("Тренер не найден"));
        return ResponseEntity.ok(modelMapper.map(trainee, TraineeFullDto.class));
    }

    public ResponseEntity<?> findAll() {
        List<Trainee> traineeList = traineeRepository.findAll();
        return ResponseEntity.ok(traineeList);
    }

    public ResponseEntity<?> findByName(String name) {
        List<Trainee> traineeList = traineeRepository.findByName(name);
        return ResponseEntity.ok(traineeList);
    }
}
