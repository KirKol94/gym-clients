package ru.castroy10.backend.dto.client;

import lombok.Data;

@Data
public class ClientResponseFullDto {
    private Long id;
    private String lastName;
    private String firstName;
    private String middleName;
    private String birthday;
    private Integer sex;
    private Integer personalTrainingCount;
    private String email;
    private String mobilePhone;
}
