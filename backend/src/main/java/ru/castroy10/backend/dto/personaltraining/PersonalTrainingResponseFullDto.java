package ru.castroy10.backend.dto.personaltraining;

import lombok.Data;
import ru.castroy10.backend.model.Client;
import ru.castroy10.backend.model.Trainee;

import java.time.LocalDate;

@Data
public class PersonalTrainingResponseFullDto {
    private Long id;
    private LocalDate date;
    private Integer price;
    private Client client;
    private Trainee trainee;
}
