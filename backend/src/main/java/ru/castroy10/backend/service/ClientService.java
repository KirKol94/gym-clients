package ru.castroy10.backend.service;

import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.castroy10.backend.dto.client.ClientDto;
import ru.castroy10.backend.dto.client.ClientDtoUpdate;
import ru.castroy10.backend.dto.client.ClientFullDto;
import ru.castroy10.backend.dto.client.ClientSaveDto;
import ru.castroy10.backend.model.Client;
import ru.castroy10.backend.repository.ClientRepository;

import java.util.List;
import java.util.Map;


@Slf4j
@Service
public class ClientService {

    private final ClientRepository clientRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public ClientService(ClientRepository clientRepository, ModelMapper modelMapper) {
        this.clientRepository = clientRepository;
        this.modelMapper = modelMapper;
    }

    @Transactional
    public ResponseEntity<?> save(ClientDto clientDto) {
        try {
            Client client = modelMapper.map(clientDto, Client.class);
//            clientRepository.save(client);
            log.info("Клиент {} {} {} записан в базу данных, id={}", client.getLastName(), client.getFirstName(), client.getMiddleName(), client.getId());
            return ResponseEntity.ok(modelMapper.map(client, ClientSaveDto.class));
        } catch (Exception e) {
            log.error("Ошибка записи клиента в базу данных, {}", e.getMessage());
            return ResponseEntity.badRequest().body(Map.of("Ошибка", e.getMessage()));
        }
    }

    @Transactional
    public ResponseEntity<?> update(ClientDtoUpdate clientDtoUpdate) {
        try {
            Client client = clientRepository.findById(clientDtoUpdate.getId()).orElseThrow(() -> new UsernameNotFoundException("Пользователь не найден"));
            modelMapper.map(clientDtoUpdate, client);
//            clientRepository.save(client);
            log.info("Клиент {} {} {} обновлен, id={}", client.getLastName(), client.getFirstName(), client.getMiddleName(), client.getId());
            return ResponseEntity.ok(modelMapper.map(client, ClientSaveDto.class));
        } catch (UsernameNotFoundException e) {
            log.error("Пользователь с id={} не найден", clientDtoUpdate.getId());
            return ResponseEntity.badRequest().body(Map.of("Ошибка", e.getMessage()));
        } catch (Exception e) {
            log.error("Ошибка записи клиента в базу данных, {}", e.getMessage());
            return ResponseEntity.badRequest().body(Map.of("Ошибка", e.getMessage()));
        }
    }

    public ResponseEntity<?> findById(Long id) {
        try {
            Client client = clientRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("Пользователь не найден"));
            return ResponseEntity.ok(modelMapper.map(client, ClientFullDto.class));
        } catch (UsernameNotFoundException e) {
            log.error("Пользователь с id={} не найден", id);
            return ResponseEntity.badRequest().body(Map.of("Ошибка", e.getMessage()));
        }
    }

    public ResponseEntity<?> findAll() {
        try {
            List<Client> clientList = clientRepository.findAll();
            return ResponseEntity.ok(clientList);
        } catch (Exception e) {
            log.error("Ошибка доступа к базе данных, {}", e.getMessage());
            return ResponseEntity.badRequest().body(Map.of("Ошибка", e.getMessage()));
        }
    }

    public ResponseEntity<?> findByName(String name) {
        try {
            List<Client> clientList = clientRepository.findByName(name);
            return ResponseEntity.ok(clientList);
        } catch (Exception e) {
            log.error("Ошибка доступа к базе данных, {}", e.getMessage());
            return ResponseEntity.badRequest().body(Map.of("Ошибка", e.getMessage()));
        }
    }
}
