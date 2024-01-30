package ru.castroy10.backend.dto.client;

import lombok.Data;

@Data
public class ClientSaveDto {

    private Long id;
    private String lastName;
    private String firstName;
    private String middleName;
}
