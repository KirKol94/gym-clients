package ru.castroy10.backend.dto.appuser;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AppUserRequestRegisterDto implements AppUserDto{

    @NotNull
    @NotBlank
    private String lastName;
    @NotNull
    @NotBlank
    private String firstName;
    private String middleName;
    @NotNull
    @NotBlank
    private String username;
    @NotNull
    @NotBlank
    private String password;
    @NotNull
    @NotBlank
    @Email
    private String email;
    private String avatarFileName;
    private String avatarFileData;
}
