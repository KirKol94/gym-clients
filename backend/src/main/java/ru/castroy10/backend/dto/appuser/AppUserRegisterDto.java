package ru.castroy10.backend.dto.appuser;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AppUserRegisterDto implements AppUserDto{

    @NotNull
    @NotBlank
    private String lastName;
    @NotNull
    @NotBlank
    private String firstName;
    @NotNull
    @NotBlank
    private String middleName;
    @NotNull
    @NotBlank
    private String username;
    @NotNull
    @NotBlank
    private String password;
    @Email
    private String email;
    private String avatarFileName;
    private String avatarFileData;
}