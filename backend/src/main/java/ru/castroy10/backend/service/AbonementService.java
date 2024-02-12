package ru.castroy10.backend.service;

import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.castroy10.backend.dto.abonement.AbonementRequestSaveDto;
import ru.castroy10.backend.dto.abonement.AbonementRequestUpdateDto;
import ru.castroy10.backend.dto.abonement.AbonementResponseFullDto;
import ru.castroy10.backend.exception.AbonementNotFoundException;
import ru.castroy10.backend.model.Abonement;
import ru.castroy10.backend.model.Client;
import ru.castroy10.backend.repository.AbonementRepository;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class AbonementService {

    private final ModelMapper modelMapper;
    private final ClientService clientService;
    private final AbonementRepository abonementRepository;

    @Autowired
    public AbonementService(ModelMapper modelMapper, ClientService clientService, AbonementRepository abonementRepository) {
        this.modelMapper = modelMapper;
        this.clientService = clientService;
        this.abonementRepository = abonementRepository;
    }

    @Transactional
    public ResponseEntity<?> save(AbonementRequestSaveDto abonementRequestSaveDto) {
        if (checkClientNotExist(abonementRequestSaveDto.getClient_id()))
            throw new UsernameNotFoundException("Клиент c таким id не найден");
        Abonement abonement = modelMapper.map(abonementRequestSaveDto, Abonement.class);
        abonement = abonementRepository.save(abonement);
        log.info("Абонемент записан в базу данных, id={}", abonement.getId());
        return ResponseEntity.ok(modelMapper.map(abonement, AbonementResponseFullDto.class));
    }

    @Transactional
    public ResponseEntity<?> update(AbonementRequestUpdateDto abonementRequestUpdateDto) throws AbonementNotFoundException {
        if (abonementRequestUpdateDto.getClient_id() != null && checkClientNotExist(abonementRequestUpdateDto.getClient_id()))
            throw new UsernameNotFoundException("Клиент c таким id не найден");
        Abonement abonement = abonementRepository.findById(abonementRequestUpdateDto.getId()).orElseThrow(() -> new AbonementNotFoundException("Абонемент не найден"));
        modelMapper.map(abonementRequestUpdateDto, abonement);
        log.info("Абонемент обновлен, id={}", abonement.getId());
        return ResponseEntity.ok(modelMapper.map(abonement, AbonementResponseFullDto.class));
    }

    public ResponseEntity<?> findAll() {
        List<Abonement> abonementList = abonementRepository.findAll();
        return ResponseEntity.ok(abonementList);
    }

    private boolean checkClientNotExist(Long id) {
        Optional<Client> client = clientService.getById(id);
        return client.isEmpty();
    }
}
