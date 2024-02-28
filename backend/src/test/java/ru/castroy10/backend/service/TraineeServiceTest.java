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
import ru.castroy10.backend.controller.TraineeController;
import ru.castroy10.backend.dto.trainee.TraineeRequestSaveDto;
import ru.castroy10.backend.dto.trainee.TraineeRequestUpdateDto;
import ru.castroy10.backend.dto.trainee.TraineeResponseFullDto;
import ru.castroy10.backend.dto.trainee.TraineeResponseSaveDto;
import ru.castroy10.backend.model.Trainee;
import ru.castroy10.backend.repository.TraineeRepository;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

@SpringBootTest
class TraineeServiceTest {

    @MockBean
    private final TraineeRepository traineeRepository;

    private final ModelMapper modelMapper;
    private final TraineeService traineeService;
    private final TraineeController traineeController;
    private final WebApplicationContext webApplicationContext;
    private MockMvc mockMvc;

    private final Trainee trainee = new Trainee();

    @Autowired
    TraineeServiceTest(TraineeRepository traineeRepository, ModelMapper modelMapper, TraineeService traineeService, TraineeController traineeController, WebApplicationContext webApplicationContext) {
        this.traineeRepository = traineeRepository;
        this.modelMapper = modelMapper;
        this.traineeService = traineeService;
        this.traineeController = traineeController;
        this.webApplicationContext = webApplicationContext;
    }

    @BeforeEach
    public void init() {
        mockMvc = webAppContextSetup(webApplicationContext).build();
        trainee.setId(999L);
    }

    @Test
    public void testSaveSuccess() {
        TraineeRequestSaveDto traineeRequestSaveDto = new TraineeRequestSaveDto();
        traineeRequestSaveDto.setFirstName("test");
        TraineeResponseSaveDto traineeResponseSaveDto = new TraineeResponseSaveDto();
        traineeResponseSaveDto.setFirstName("test");

        Mockito.when(traineeRepository.save(Mockito.any(Trainee.class))).thenReturn(trainee);
        ResponseEntity<?> response = traineeController.save(traineeRequestSaveDto);

        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
        Assertions.assertEquals(traineeResponseSaveDto, response.getBody());
    }

    @Test
    public void testSaveException() throws Exception {
        Mockito.when(traineeRepository.save(Mockito.any(Trainee.class))).thenThrow(new RuntimeException(new SQLException("this test is valid, sql exception with runtime exception")));
        mockMvc.perform(post("/api/v1/trainee/save").contentType(MediaType.APPLICATION_JSON).content("{\"lastName\": \"A\",\"firstName\": \"A\",\"middleName\": \"A\"}")).andExpect(status().is(400)).andExpect(result -> {
            String errorMessage = result.getResponse().getContentAsString();
            Assertions.assertTrue(errorMessage.contains("this test is valid, sql exception with runtime exception"));
        });
    }

    @Test
    public void testUpdateSuccess() {
        TraineeRequestUpdateDto traineeRequestUpdateDto = new TraineeRequestUpdateDto();
        traineeRequestUpdateDto.setId(2L);
        TraineeResponseSaveDto traineeResponseSaveDto = new TraineeResponseSaveDto();
        traineeResponseSaveDto.setId(2L);

        Mockito.when(traineeRepository.findById(2L)).thenReturn(Optional.of(trainee));
        Mockito.when(traineeRepository.save(trainee)).thenReturn(trainee);
        ResponseEntity<?> response = traineeController.update(traineeRequestUpdateDto);

        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
        Assertions.assertEquals(traineeResponseSaveDto, response.getBody());
    }

    @Test
    public void testUpdateNotSuccess() throws Exception {
        Mockito.doAnswer((invocation) -> {
            throw new UsernameNotFoundException("this test is valid, username not found");
        }).when(traineeRepository).findById(2L);

        mockMvc.perform(put("/api/v1/trainee/update").contentType(MediaType.APPLICATION_JSON).content("{\"id\": 2}")).andExpect(status().is(400)).andExpect(result -> {
            String errorMessage = result.getResponse().getContentAsString();
            Assertions.assertTrue(errorMessage.contains("this test is valid, username not found"));
        });
    }

    @Test
    public void testUpdateException() throws Exception {
        Mockito.when(traineeRepository.findById(2L)).thenThrow(new RuntimeException(new SQLException("this test is valid, sql exception with runtime exception")));
        mockMvc.perform(put("/api/v1/trainee/update").contentType(MediaType.APPLICATION_JSON).content("{\"id\": 2}")).andExpect(status().is(400)).andExpect(result -> {
            String errorMessage = result.getResponse().getContentAsString();
            Assertions.assertTrue(errorMessage.contains("this test is valid, sql exception with runtime exception"));
        });
    }

    @Test
    public void testFindByIdSuccess() {
        Mockito.when(traineeRepository.findById(1L)).thenReturn(Optional.of(trainee));
        ResponseEntity<?> response = traineeService.findById(1L);

        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
        Assertions.assertEquals(modelMapper.map(trainee, TraineeResponseFullDto.class), response.getBody());
    }

    @Test
    public void testFindByIdException() throws Exception {
        Mockito.doAnswer((invocation) -> {
            throw new SQLException("this test is valid, sql exception");
        }).when(traineeRepository).findById(1L);

        mockMvc.perform(get("/api/v1/trainee/find/1")).andExpect(status().is(400)).andExpect(result -> {
            String errorMessage = result.getResponse().getContentAsString();
            Assertions.assertTrue(errorMessage.contains("this test is valid, sql exception"));
        });
    }

    @Test
    public void testFindByIdExceptionUserNotFound() throws Exception {
        Mockito.doAnswer((invocation) -> {
            throw new UsernameNotFoundException("this test is valid");
        }).when(traineeRepository).findById(1L);

        mockMvc.perform(get("/api/v1/trainee/find/1")).andExpect(status().is(400)).andExpect(result -> {
            String errorMessage = result.getResponse().getContentAsString();
            Assertions.assertTrue(errorMessage.contains("this test is valid"));
        });
    }

    @Test
    public void testFindAllSuccess() {
        Mockito.when(traineeRepository.findAll()).thenReturn(List.of(trainee));
        ResponseEntity<?> response = traineeController.findAll();

        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
        Assertions.assertEquals(List.of(trainee), response.getBody());
    }

    @Test
    public void testFindAllException() throws Exception {
        Mockito.doAnswer((invocation) -> {
            throw new SQLException("this test is valid");
        }).when(traineeRepository).findAll();

        mockMvc.perform(get("/api/v1/trainee/find/all")).andExpect(status().is(400)).andExpect(result -> {
            String errorMessage = result.getResponse().getContentAsString();
            Assertions.assertTrue(errorMessage.contains("this test is valid"));
        });
    }

    @Test
    public void testFindByNameSuccess() {
        Mockito.when(traineeRepository.findByName(Mockito.anyString())).thenReturn(List.of(trainee));
        ResponseEntity<?> response = traineeController.findByName("name");

        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
        Assertions.assertEquals(List.of(trainee), response.getBody());
    }

    @Test
    public void testFindByNameException() throws Exception {
        Mockito.doAnswer((invocation) -> {
            throw new SQLException("this test is valid");
        }).when(traineeRepository).findByName(Mockito.anyString());

        mockMvc.perform(get("/api/v1/trainee/find?name=a"))
                .andExpect(status().is(400))
                .andExpect(result -> {
                    String errorMessage = result.getResponse().getContentAsString();
                    Assertions.assertTrue(errorMessage.contains("this test is valid"));
                });
    }

    @Test
    public void testGetByIdSuccess(){
        Mockito.when(traineeRepository.findById(1L)).thenReturn(Optional.of(trainee));
        Assertions.assertEquals(traineeService.getById(1L).get(),trainee);
    }
}