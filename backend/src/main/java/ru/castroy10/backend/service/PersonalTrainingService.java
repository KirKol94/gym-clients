package ru.castroy10.backend.service;

import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ru.castroy10.backend.dto.personaltraining.PersonalTrainingRequestSaveDto;
import ru.castroy10.backend.dto.personaltraining.PersonalTrainingResponseFullDto;
import ru.castroy10.backend.model.Client;
import ru.castroy10.backend.model.PersonalTraining;
import ru.castroy10.backend.model.Trainee;
import ru.castroy10.backend.repository.PersonalTrainingRepository;

import java.util.Optional;

@Slf4j
@Service
public class PersonalTrainingService {

    private final ClientService clientService;
    private final TraineeService traineeService;
    private final ModelMapper modelMapper;
    private final PersonalTrainingRepository personalTrainingRepository;

    @Autowired
    public PersonalTrainingService(ClientService clientService, TraineeService traineeService, ModelMapper modelMapper, PersonalTrainingRepository personalTrainingRepository) {
        this.clientService = clientService;
        this.traineeService = traineeService;
        this.modelMapper = modelMapper;
        this.personalTrainingRepository = personalTrainingRepository;
    }

    public ResponseEntity<?> save(PersonalTrainingRequestSaveDto personalTrainingRequestSaveDto) {
        if (checkClientNotExist(personalTrainingRequestSaveDto.getClient_id()))
            throw new UsernameNotFoundException("Клиент c таким id не найден");
        if (checkTraineeNotExist(personalTrainingRequestSaveDto.getTrainee_id()))
            throw new UsernameNotFoundException("Тренер c таким id не найден");
        PersonalTraining personalTraining = modelMapper.map(personalTrainingRequestSaveDto, PersonalTraining.class);
        personalTraining = personalTrainingRepository.save(personalTraining);
        log.info("Персональная тренировка записана в базу данных, id={}", personalTraining.getId());
        return ResponseEntity.ok(modelMapper.map(personalTraining, PersonalTrainingResponseFullDto.class));
    }

    private boolean checkClientNotExist(Long id) {
        Optional<Client> client = clientService.getById(id);
        return client.isEmpty();
    }

    private boolean checkTraineeNotExist(Long id) {
        Optional<Trainee> trainee = traineeService.getById(id);
        return trainee.isEmpty();
    }
}
