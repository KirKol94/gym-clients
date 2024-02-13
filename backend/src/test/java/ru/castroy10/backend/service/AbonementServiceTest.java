package ru.castroy10.backend.service;


import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;
import ru.castroy10.backend.controller.AbonementController;
import ru.castroy10.backend.dto.abonement.AbonementRequestSaveDto;
import ru.castroy10.backend.dto.abonement.AbonementRequestUpdateDto;
import ru.castroy10.backend.exception.AbonementNotFoundException;
import ru.castroy10.backend.model.Abonement;
import ru.castroy10.backend.model.Client;
import ru.castroy10.backend.repository.AbonementRepository;

import java.sql.SQLException;
import java.time.LocalDate;
import java.util.Optional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

@SpringBootTest
class AbonementServiceTest {

    @MockBean
    private final AbonementRepository abonementRepository;
    @MockBean
    private final ClientService clientService;

    private final AbonementController abonementController;
    private final WebApplicationContext webApplicationContext;
    private MockMvc mockMvc;

    private final Abonement abonement = new Abonement();
    private final Client client = new Client();
    private final AbonementRequestSaveDto abonementRequestSaveDto = new AbonementRequestSaveDto();
    private final AbonementRequestUpdateDto abonementRequestUpdateDto = new AbonementRequestUpdateDto();

    @Autowired
    AbonementServiceTest(AbonementRepository abonementRepository, ClientService clientService, AbonementController abonementController, WebApplicationContext webApplicationContext) {
        this.abonementRepository = abonementRepository;
        this.clientService = clientService;
        this.abonementController = abonementController;
        this.webApplicationContext = webApplicationContext;
    }

    @BeforeEach
    public void init() {
        mockMvc = webAppContextSetup(webApplicationContext).build();
        abonement.setId(999L);
        client.setId(777L);

        abonementRequestSaveDto.setDateCreated(LocalDate.now());
        abonementRequestSaveDto.setDateExpired(LocalDate.now());
        abonementRequestSaveDto.setPrice(7777);
        abonementRequestSaveDto.setActive(true);
        abonementRequestSaveDto.setClient_id(888L);

        abonementRequestUpdateDto.setId(998L);
        abonementRequestUpdateDto.setClient_id(888L);
    }

    @Test
    public void testSaveSuccess() {
        Mockito.when(clientService.getById(Mockito.anyLong())).thenReturn(Optional.of(new Client()));
        Mockito.when(abonementRepository.save(Mockito.any(Abonement.class))).thenReturn(abonement);
        ResponseEntity<?> response = abonementController.save(abonementRequestSaveDto);

        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
        Assertions.assertTrue(response.getBody().toString().contains("id=999"));
    }

    @Test
    public void testSaveFail() throws Exception {
        Mockito.when(clientService.getById(Mockito.anyLong())).thenReturn(Optional.empty());
        Mockito.when(abonementRepository.save(Mockito.any(Abonement.class))).thenReturn(abonement);

        mockMvc.perform(post("/api/v1/abonement/save")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"dateCreated\": \"2000-01-01\",\"dateExpired\": \"2000-01-01\",\"price\": 1000,\"isActive\": true,\"client_id\": 20}"))
                .andExpect(status().is(400))
                .andExpect(result -> {
                    String errorMessage = result.getResponse().getContentAsString();
                    Assertions.assertTrue(errorMessage.contains("id"));
                });
    }

    @Test
    public void testSaveException() throws Exception {
        Mockito.when(abonementRepository.save(Mockito.any(Abonement.class))).thenThrow(new RuntimeException(new SQLException("this test is valid, sql exception with runtime exception")));
        Mockito.when(clientService.getById(Mockito.anyLong())).thenReturn(Optional.of(new Client()));
        mockMvc.perform(post("/api/v1/abonement/save")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"dateCreated\": \"2000-01-01\",\"dateExpired\": \"2000-01-01\",\"price\": 1000,\"isActive\": true,\"client_id\": 20}"))
                .andExpect(status().is(400))
                .andExpect(result -> {
                    String errorMessage = result.getResponse().getContentAsString();
                    Assertions.assertTrue(errorMessage.contains("this test is valid, sql exception with runtime exception"));
                });
    }

    @Test
    public void testUpdateSuccess() throws AbonementNotFoundException {
        Mockito.when(clientService.getById(Mockito.anyLong())).thenReturn(Optional.of(new Client()));
        Mockito.when(abonementRepository.findById(Mockito.any(Long.class))).thenReturn(Optional.of(abonement));
        Mockito.when(abonementRepository.save(Mockito.any(Abonement.class))).thenReturn(abonement);
        ResponseEntity<?> response = abonementController.update(abonementRequestUpdateDto);

        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
        Assertions.assertTrue(response.getBody().toString().contains("id=998"));
    }

    @Test
    public void testUpdateFail() throws Exception {
        Mockito.when(clientService.getById(Mockito.anyLong())).thenReturn(Optional.empty());
        Mockito.when(abonementRepository.findById(Mockito.any(Long.class))).thenReturn(Optional.of(abonement));
        Mockito.when(abonementRepository.save(Mockito.any(Abonement.class))).thenReturn(abonement);

        mockMvc.perform(put("/api/v1/abonement/update")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"id\": 999,\"client_id\": 20}"))
                .andExpect(status().is(400))
                .andExpect(result -> {
                    String errorMessage = result.getResponse().getContentAsString();
                    Assertions.assertTrue(errorMessage.contains("id"));
                });
    }

    @Test
    public void testUpdateException() throws Exception {
        Mockito.when(clientService.getById(Mockito.any())).thenReturn(Optional.of(client));
        Mockito.when(abonementRepository.findById(Mockito.any(Long.class))).thenThrow(new RuntimeException(new SQLException("this test is valid, sql exception with runtime exception")));

        mockMvc.perform(put("/api/v1/abonement/update")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"id\": 777}"))
                .andExpect(status().is(400))
                .andExpect(result -> {
                    String errorMessage = result.getResponse().getContentAsString();
                    Assertions.assertTrue(errorMessage.contains("this test is valid, sql exception with runtime exception"));
                });
    }
}