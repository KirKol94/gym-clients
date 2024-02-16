package ru.castroy10.backend.dto.trainee;

import lombok.Data;

@Data
public class TraineeResponseFullDto {

    private Long id;
    private String lastName;
    private String firstName;
    private String middleName;
    private Integer sex;
    private String email;
    private String mobilePhone;
}
