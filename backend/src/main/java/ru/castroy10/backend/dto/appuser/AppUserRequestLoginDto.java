package ru.castroy10.backend.dto.appuser;

import lombok.Data;

@Data
public class AppUserRequestLoginDto {
    private String username;
    private String password;
}
