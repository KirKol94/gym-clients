package ru.castroy10.backend.service;

import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.castroy10.backend.dto.client.ClientRequestSaveDto;
import ru.castroy10.backend.dto.client.ClientRequestUpdateDto;
import ru.castroy10.backend.dto.client.ClientResponseFullDto;
import ru.castroy10.backend.dto.client.ClientResponseSaveDto;
import ru.castroy10.backend.model.Client;
import ru.castroy10.backend.repository.ClientRepository;

import java.util.List;
import java.util.Optional;

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
    public ResponseEntity<?> save(ClientRequestSaveDto clientRequestSaveDto) {
        Client client = modelMapper.map(clientRequestSaveDto, Client.class);
        clientRepository.save(client);
        log.info("Клиент {} {} {} записан в базу данных, id={}", client.getLastName(), client.getFirstName(), client.getMiddleName(), client.getId());
        return ResponseEntity.ok(modelMapper.map(client, ClientResponseSaveDto.class));
    }

    @Transactional
    public ResponseEntity<?> update(ClientRequestUpdateDto clientRequestUpdateDto) {
        Client client = clientRepository.findById(clientRequestUpdateDto.getId()).orElseThrow(() -> new UsernameNotFoundException("Клиент не найден"));
        modelMapper.map(clientRequestUpdateDto, client);
        log.info("Клиент {} {} {} обновлен, id={}", client.getLastName(), client.getFirstName(), client.getMiddleName(), client.getId());
        return ResponseEntity.ok(modelMapper.map(client, ClientResponseSaveDto.class));
    }

    public ResponseEntity<?> findById(Long id) {
        Client client = clientRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("Клиент не найден"));
        return ResponseEntity.ok(modelMapper.map(client, ClientResponseFullDto.class));
    }

    public Optional<Client> getById(Long id) {
        return clientRepository.findById(id);
    }


    public ResponseEntity<?> findAll() {
        List<Client> clientList = clientRepository.findAll();
        return ResponseEntity.ok(clientList.stream().map(client -> modelMapper.map(client, ClientResponseFullDto.class)).toList());
    }

    public ResponseEntity<?> findByName(String name) {
        List<Client> clientList = clientRepository.findByName(name.toLowerCase());
        return ResponseEntity.ok(clientList.stream().map(client -> modelMapper.map(client, ClientResponseFullDto.class)).toList());
    }
}
