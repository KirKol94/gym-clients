package ru.castroy10.backend.dto.personaltraining;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class PersonalTrainingRequestSaveDto {
    private LocalDate date;
    private Integer price;
    @NotNull
    private Long client_id;
    @NotNull
    private Long trainee_id;
}
