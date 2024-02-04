package ru.castroy10.backend.dto.appuser;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import ru.castroy10.backend.model.Role;

import java.util.Set;

@Data
public class AppUserUpdateDto implements AppUserDto{

    @NotNull
    private Long id;
    @NotNull
    @NotBlank
    private String lastName;
    @NotNull
    @NotBlank
    private String firstName;
    @NotNull
    @NotBlank
    private String middleName;
    private String username;
    private String password;
    @Email
    private String email;
    private String avatarFileName;
    private String avatarFileData;
    private Set<Role> roles;
}
