package ru.castroy10.backend.service;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;
import ru.castroy10.backend.controller.ClientController;
import ru.castroy10.backend.dto.client.ClientRequestSaveDto;
import ru.castroy10.backend.dto.client.ClientRequestUpdateDto;
import ru.castroy10.backend.dto.client.ClientResponseFullDto;
import ru.castroy10.backend.dto.client.ClientResponseSaveDto;
import ru.castroy10.backend.model.Client;
import ru.castroy10.backend.repository.ClientRepository;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

@SpringBootTest
class ClientServiceTest {

    @MockBean
    private final ClientRepository clientRepository;

    private final ClientService clientService;
    private final ModelMapper modelMapper;
    private final ClientController clientController;
    private final WebApplicationContext webApplicationContext;

    private MockMvc mockMvc;
    private final Client client = new Client();

    @Autowired
    ClientServiceTest(ClientRepository clientRepository, ClientService clientService, ModelMapper modelMapper, ClientController clientController, WebApplicationContext webApplicationContext) {
        this.clientRepository = clientRepository;
        this.clientService = clientService;
        this.modelMapper = modelMapper;
        this.clientController = clientController;
        this.webApplicationContext = webApplicationContext;
    }

    @BeforeEach
    public void init() {
        client.setId(1L);
        mockMvc = webAppContextSetup(webApplicationContext).build();
    }

    @Test
    void testFindByNameSuccess() {
        Mockito.when(clientRepository.findByName(Mockito.anyString())).thenReturn(List.of(client));
        ResponseEntity<?> response = clientController.findByName("name");

        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
        Assertions.assertEquals(List.of(client), response.getBody());
    }

    @Test
    void testFindByNameException() throws Exception {
        Mockito.doAnswer((invocation) -> {
            throw new SQLException("this test is valid");
        }).when(clientRepository).findByName(Mockito.anyString());

        mockMvc.perform(get("/api/v1/client/find?name=a"))
                .andExpect(status().is(400))
                .andExpect(result -> {
                    String errorMessage = result.getResponse().getContentAsString();
                    Assertions.assertTrue(errorMessage.contains("this test is valid"));
                });
    }

    @Test
    public void testFindAllSuccess() {
        Mockito.when(clientRepository.findAll()).thenReturn(List.of(client));
        ResponseEntity<?> response = clientController.findAll();

        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
        Assertions.assertEquals(List.of(client), response.getBody());
    }

    @Test
    public void testFindAllException() throws Exception {
        Mockito.doAnswer((invocation) -> {
            throw new SQLException("this test is valid");
        }).when(clientRepository).findAll();

        mockMvc.perform(get("/api/v1/client/find/all"))
                .andExpect(status().is(400))
                .andExpect(result -> {
                    String errorMessage = result.getResponse().getContentAsString();
                    Assertions.assertTrue(errorMessage.contains("this test is valid"));
                });
    }

    @Test
    void testFindByIdSuccess() {
        Mockito.when(clientRepository.findById(1L)).thenReturn(Optional.of(client));
        ResponseEntity<?> response = clientService.findById(1L);

        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
        Assertions.assertEquals(modelMapper.map(client, ClientResponseFullDto.class), response.getBody());
    }

    @Test
    void testFindByIdException() throws Exception {
        Mockito.doAnswer((invocation) -> {
            throw new SQLException("this test is valid, sql exception");
        }).when(clientRepository).findById(1L);

        mockMvc.perform(get("/api/v1/client/find/1"))
                .andExpect(status().is(400))
                .andExpect(result -> {
                    String errorMessage = result.getResponse().getContentAsString();
                    Assertions.assertTrue(errorMessage.contains("this test is valid, sql exception"));
                });
    }

    @Test
    void testFindByIdExceptionUserNotFound() throws Exception {
        Mockito.doAnswer((invocation) -> {
            throw new UsernameNotFoundException("this test is valid");
        }).when(clientRepository).findById(1L);

        mockMvc.perform(get("/api/v1/client/find/1"))
                .andExpect(status().is(400))
                .andExpect(result -> {
                    String errorMessage = result.getResponse().getContentAsString();
                    Assertions.assertTrue(errorMessage.contains("this test is valid"));
                });
    }

    @Test
    public void testUpdateSuccess() {
        ClientRequestUpdateDto clientRequestUpdateDto = new ClientRequestUpdateDto();
        clientRequestUpdateDto.setId(2L);
        ClientResponseSaveDto expectedClientResponseSaveDto = new ClientResponseSaveDto();
        expectedClientResponseSaveDto.setId(2L);

        Mockito.when(clientRepository.findById(2L)).thenReturn(Optional.of(client));
        Mockito.when(clientRepository.save(client)).thenReturn(client);
        ResponseEntity<?> response = clientController.update(clientRequestUpdateDto);

        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
        Assertions.assertEquals(expectedClientResponseSaveDto, response.getBody());
    }

    @Test
    public void testUpdateNotSuccess() throws Exception {
        Mockito.doAnswer((invocation) -> {
            throw new UsernameNotFoundException("this test is valid, username not found");
        }).when(clientRepository).findById(2L);

        mockMvc.perform(put("/api/v1/client/update")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"id\": 2}"))
                .andExpect(status().is(400))
                .andExpect(result -> {
                    String errorMessage = result.getResponse().getContentAsString();
                    Assertions.assertTrue(errorMessage.contains("this test is valid, username not found"));
                });
    }

    @Test
    public void testUpdateException() throws Exception {
        Mockito.when(clientRepository.findById(2L)).thenThrow(new RuntimeException(new SQLException("this test is valid, sql exception with runtime exception")));
        mockMvc.perform(put("/api/v1/client/update")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"id\": 2}"))
                .andExpect(status().is(400))
                .andExpect(result -> {
                    String errorMessage = result.getResponse().getContentAsString();
                    Assertions.assertTrue(errorMessage.contains("this test is valid, sql exception with runtime exception"));
                });
    }

    @Test
    public void testSaveSuccess() {
        ClientRequestSaveDto clientRequestSaveDto = new ClientRequestSaveDto();
        clientRequestSaveDto.setFirstName("test");
        ClientResponseSaveDto expectedClientResponseSaveDto = new ClientResponseSaveDto();
        expectedClientResponseSaveDto.setFirstName("test");

        Mockito.when(clientRepository.save(Mockito.any(Client.class))).thenReturn(client);
        ResponseEntity<?> response = clientController.save(clientRequestSaveDto);

        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
        Assertions.assertEquals(expectedClientResponseSaveDto, response.getBody());
    }

    @Test
    public void testSaveException() throws Exception {
        Mockito.when(clientRepository.save(Mockito.any(Client.class))).thenThrow(new RuntimeException(new SQLException("this test is valid, sql exception with runtime exception")));
        mockMvc.perform(post("/api/v1/client/save")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"lastName\": \"A\",\"firstName\": \"A\",\"middleName\": \"A\"}"))
                .andExpect(status().is(400))
                .andExpect(result -> {
                    String errorMessage = result.getResponse().getContentAsString();
                    Assertions.assertTrue(errorMessage.contains("this test is valid, sql exception with runtime exception"));
                });
    }

    @Test
    public void testGetByIdSuccess(){
        Mockito.when(clientRepository.findById(1L)).thenReturn(Optional.of(client));
        Assertions.assertEquals(clientService.getById(1L).get(),client);
    }
}