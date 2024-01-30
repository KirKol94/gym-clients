package ru.castroy10.backend.service;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import ru.castroy10.backend.controller.ClientController;
import ru.castroy10.backend.dto.client.ClientDto;
import ru.castroy10.backend.dto.client.ClientDtoUpdate;
import ru.castroy10.backend.dto.client.ClientFullDto;
import ru.castroy10.backend.dto.client.ClientSaveDto;
import ru.castroy10.backend.model.Client;
import ru.castroy10.backend.repository.ClientRepository;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@SpringBootTest
class ClientServiceTest {

    @MockBean
    private final ClientRepository clientRepository;

    private final ClientService clientService;
    private final ModelMapper modelMapper;

    @InjectMocks
    private final ClientController clientController;

    private final Client client = new Client();

    @Autowired
    ClientServiceTest(ClientRepository clientRepository, ClientService clientService, ModelMapper modelMapper, ClientController clientController) {
        this.clientRepository = clientRepository;
        this.clientService = clientService;
        this.modelMapper = modelMapper;
        this.clientController = clientController;
    }

    @BeforeEach
    public void init() {
        client.setId(1L);
    }

    @Test
    void testFindByNameSuccess() {
        Mockito.when(clientRepository.findByName(Mockito.anyString())).thenReturn(List.of(client));
        ResponseEntity<?> response = clientController.findByName("name");

        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
        Assertions.assertEquals(List.of(client), response.getBody());
    }

    @Test
    void testFindByNameException() {
        Mockito.when(clientRepository.findByName(Mockito.anyString())).thenThrow(new RuntimeException(new SQLException()));
        ResponseEntity<?> response = clientController.findByName("name");

        Assertions.assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        Assertions.assertEquals(Map.of("Ошибка", "java.sql.SQLException"), response.getBody());
    }

    @Test
    public void testFindAllSuccess() {
        Mockito.when(clientRepository.findAll()).thenReturn(List.of(client));
        ResponseEntity<?> response = clientController.findAll();

        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
        Assertions.assertEquals(List.of(client), response.getBody());
    }

    @Test
    public void testFindAllException() {
        Mockito.when(clientRepository.findAll()).thenThrow(new RuntimeException(new SQLException()));
        ResponseEntity<?> response = clientController.findAll();

        Assertions.assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        Assertions.assertEquals(Map.of("Ошибка", "java.sql.SQLException"), response.getBody());
    }

    @Test
    void testFindByIdSuccess() {
        Mockito.when(clientRepository.findById(1L)).thenReturn(Optional.of(client));
        ResponseEntity<?> response = clientService.findById(1L);

        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
        Assertions.assertEquals(modelMapper.map(client, ClientFullDto.class), response.getBody());
    }

    @Test
    void testFindByIdException() {
        Mockito.when(clientRepository.findById(1L)).thenThrow(new RuntimeException(new SQLException()));
        ResponseEntity<?> response = clientService.findById(1L);

        Assertions.assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        Assertions.assertEquals(Map.of("Ошибка", "java.sql.SQLException"), response.getBody());
    }

    @Test
    void testFindByIdExceptionUserNotFound() {
        Mockito.when(clientRepository.findById(1L)).thenThrow(new RuntimeException(new UsernameNotFoundException("Пользователь не найден")));
        ResponseEntity<?> response = clientService.findById(1L);

        Assertions.assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        Assertions.assertEquals(Map.of("Ошибка", "org.springframework.security.core.userdetails.UsernameNotFoundException: Пользователь не найден"), response.getBody());
    }

    @Test
    public void testUpdateSuccess() {
        ClientDtoUpdate clientDtoUpdate = new ClientDtoUpdate();
        clientDtoUpdate.setId(2L);
        ClientSaveDto expectedClientSaveDto = new ClientSaveDto();
        expectedClientSaveDto.setId(2L);

        Mockito.when(clientRepository.findById(2L)).thenReturn(Optional.of(client));
        Mockito.when(clientRepository.save(client)).thenReturn(client);
        ResponseEntity<?> response = clientController.update(clientDtoUpdate);

        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
        Assertions.assertEquals(expectedClientSaveDto, response.getBody());
    }

    @Test
    public void testUpdateNotSuccess() {
        ClientDtoUpdate clientDtoUpdate = new ClientDtoUpdate();
        clientDtoUpdate.setId(2L);

        Mockito.when(clientRepository.findById(2L)).thenReturn(Optional.empty());
        ResponseEntity<?> response = clientController.update(clientDtoUpdate);

        Assertions.assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        Assertions.assertEquals(Map.of("Ошибка", "Пользователь не найден"), response.getBody());
    }

    @Test
    public void testUpdateException() {
        ClientDtoUpdate clientDtoUpdate = new ClientDtoUpdate();
        clientDtoUpdate.setId(2L);

        Mockito.when(clientRepository.findById(2L)).thenThrow(new RuntimeException(new SQLException()));
        ResponseEntity<?> response = clientController.update(clientDtoUpdate);

        Assertions.assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        Assertions.assertEquals(Map.of("Ошибка", "java.sql.SQLException"), response.getBody());
    }

    @Test
    public void testSaveSuccess() {
        ClientDto clientDto = new ClientDto();
        clientDto.setFirstName("test");
        ClientSaveDto expectedClientSaveDto = new ClientSaveDto();
        expectedClientSaveDto.setFirstName("test");

        Mockito.when(clientRepository.save(Mockito.any(Client.class))).thenReturn(client);
        ResponseEntity<?> response = clientController.save(clientDto);

        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
        Assertions.assertEquals(expectedClientSaveDto, response.getBody());
    }

    @Test
    public void testSaveException() {
        ClientDto clientDto = new ClientDto();

        Mockito.when(clientRepository.save(Mockito.any(Client.class))).thenThrow(new RuntimeException(new SQLException()));
        ResponseEntity<?> response = clientController.save(clientDto);

        Assertions.assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        Assertions.assertEquals(Map.of("Ошибка", "java.sql.SQLException"), response.getBody());
    }
}