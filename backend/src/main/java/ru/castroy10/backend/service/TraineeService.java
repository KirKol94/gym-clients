package ru.castroy10.backend.service;

import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.castroy10.backend.dto.trainee.TraineeRequestSaveDto;
import ru.castroy10.backend.dto.trainee.TraineeRequestUpdateDto;
import ru.castroy10.backend.dto.trainee.TraineeResponseFullDto;
import ru.castroy10.backend.dto.trainee.TraineeResponseSaveDto;
import ru.castroy10.backend.model.Trainee;
import ru.castroy10.backend.repository.TraineeRepository;

import java.util.List;
import java.util.Optional;

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
    public ResponseEntity<?> save(TraineeRequestSaveDto traineeRequestSaveDto) {
        Trainee trainee = modelMapper.map(traineeRequestSaveDto, Trainee.class);
        traineeRepository.save(trainee);
        log.info("Тренер {} {} {} записан в базу данных, id={}", trainee.getLastName(), trainee.getFirstName(), trainee.getMiddleName(), trainee.getId());
        return ResponseEntity.ok(modelMapper.map(trainee, TraineeResponseSaveDto.class));
    }

    @Transactional
    public ResponseEntity<?> update(TraineeRequestUpdateDto traineeRequestUpdateDto) {
        Trainee trainee = traineeRepository.findById(traineeRequestUpdateDto.getId()).orElseThrow(() -> new UsernameNotFoundException("Тренер не найден"));
        modelMapper.map(traineeRequestUpdateDto, trainee);
        log.info("Тренер {} {} {} обновлен, id={}", trainee.getLastName(), trainee.getFirstName(), trainee.getMiddleName(), trainee.getId());
        return ResponseEntity.ok(modelMapper.map(trainee, TraineeResponseSaveDto.class));
    }

    public ResponseEntity<?> findById(Long id) {
        Trainee trainee = traineeRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("Тренер не найден"));
        return ResponseEntity.ok(modelMapper.map(trainee, TraineeResponseFullDto.class));
    }

    public ResponseEntity<?> findAll() {
        List<Trainee> traineeList = traineeRepository.findAll();
        return ResponseEntity.ok(traineeList.stream().map(trainee -> modelMapper.map(trainee, TraineeResponseFullDto.class)).toList());
    }

    public ResponseEntity<?> findByName(String name) {
        List<Trainee> traineeList = traineeRepository.findByName(name.toLowerCase());
        return ResponseEntity.ok(traineeList.stream().map(trainee -> modelMapper.map(trainee, TraineeResponseFullDto.class)).toList());
    }

    public Optional<Trainee> getById(Long id) {
        return traineeRepository.findById(id);
    }
}
