package ru.castroy10.backend.dto.appuser;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import ru.castroy10.backend.model.Role;

import java.util.Set;

@Data
public class AppUserRequestUpdateDto implements AppUserDto{

    @NotNull
    private Long id;
    private String lastName;
    private String firstName;
    private String middleName;
    private String username;
    private String password;
    @Email
    private String email;
    private String avatarFileName;
    private String avatarFileData;
    private Set<Role> roles;
}
