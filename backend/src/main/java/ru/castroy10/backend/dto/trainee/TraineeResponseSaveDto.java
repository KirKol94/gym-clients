package ru.castroy10.backend.dto.trainee;

import lombok.Data;

@Data
public class TraineeResponseSaveDto {

    private Long id;
    private String lastName;
    private String firstName;
    private String middleName;
}
