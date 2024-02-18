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
import ru.castroy10.backend.controller.PersonalTrainingController;
import ru.castroy10.backend.dto.personaltraining.PersonalTrainingRequestSaveDto;
import ru.castroy10.backend.model.Client;
import ru.castroy10.backend.model.PersonalTraining;
import ru.castroy10.backend.model.Trainee;
import ru.castroy10.backend.repository.PersonalTrainingRepository;

import java.sql.SQLException;
import java.util.Optional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;


@SpringBootTest
class PersonalTrainingServiceTest {

    @MockBean
    private final PersonalTrainingRepository personalTrainingRepository;
    @MockBean
    private final ClientService clientService;
    @MockBean
    private final TraineeService traineeService;
    private final PersonalTrainingController personalTrainingController;
    private final WebApplicationContext webApplicationContext;
    private MockMvc mockMvc;
    private final PersonalTraining personalTraining = new PersonalTraining();

    @Autowired
    PersonalTrainingServiceTest(PersonalTrainingRepository personalTrainingRepository, PersonalTrainingController personalTrainingController, ClientService clientService, TraineeService traineeService, WebApplicationContext webApplicationContext) {
        this.personalTrainingRepository = personalTrainingRepository;
        this.personalTrainingController = personalTrainingController;
        this.clientService = clientService;
        this.traineeService = traineeService;
        this.webApplicationContext = webApplicationContext;
    }

    @BeforeEach
    public void init() {
        mockMvc = webAppContextSetup(webApplicationContext).build();
        personalTraining.setId(999L);
    }

    @Test
    public void testSaveSuccess() {
        PersonalTrainingRequestSaveDto personalTrainingRequestSaveDto = new PersonalTrainingRequestSaveDto();
        personalTrainingRequestSaveDto.setClient_id(9L);
        personalTrainingRequestSaveDto.setTrainee_id(9L);

        Mockito.when(clientService.getById(Mockito.anyLong())).thenReturn(Optional.of(new Client()));
        Mockito.when(traineeService.getById(Mockito.anyLong())).thenReturn(Optional.of(new Trainee()));
        Mockito.when(personalTrainingRepository.save(Mockito.any(PersonalTraining.class))).thenReturn(personalTraining);
        ResponseEntity<?> response = personalTrainingController.save(personalTrainingRequestSaveDto);

        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
        Assertions.assertTrue(response.getBody().toString().contains("id=999"));
    }

    @Test
    public void testSaveFail() throws Exception {
        Mockito.when(clientService.getById(Mockito.anyLong())).thenReturn(Optional.empty());
        Mockito.when(traineeService.getById(Mockito.anyLong())).thenReturn(Optional.of(new Trainee()));
        Mockito.when(personalTrainingRepository.save(Mockito.any(PersonalTraining.class))).thenReturn(personalTraining);

        mockMvc.perform(post("/api/v1/personaltraining/save")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"client_id\":999,\"trainee_id\": 999}"))
                .andExpect(status().is(400))
                .andExpect(result -> {
                    String errorMessage = result.getResponse().getContentAsString();
                    Assertions.assertTrue(errorMessage.contains("id"));
                });
    }

    @Test
    public void testSaveException() throws Exception {
        Mockito.when(clientService.getById(Mockito.anyLong())).thenReturn(Optional.of(new Client()));
        Mockito.when(traineeService.getById(Mockito.anyLong())).thenReturn(Optional.of(new Trainee()));
        Mockito.when(personalTrainingRepository.save(Mockito.any(PersonalTraining.class))).thenThrow(new RuntimeException(new SQLException("this test is valid, sql exception with runtime exception")));

        mockMvc.perform(post("/api/v1/personaltraining/save")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"client_id\":999,\"trainee_id\": 999}"))
                .andExpect(status().is(400))
                .andExpect(result -> {
                    String errorMessage = result.getResponse().getContentAsString();
                    Assertions.assertTrue(errorMessage.contains("this test is valid, sql exception with runtime exception"));
                });
    }
}