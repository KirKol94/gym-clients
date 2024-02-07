package ru.castroy10.backend.dto.appuser;

import lombok.Data;
import ru.castroy10.backend.model.Role;

import java.util.Set;
@Data
public class AppUserResponseFullDto {
    private Long id;
    private String firstName;
    private String middleName;
    private String lastName;
    private String username;
    private String email;
    private String avatar;
    private boolean accountNonExpired;
    private boolean accountNonLocked;
    private boolean credentialsNonExpired;
    private boolean isEnabled;
    private Set<Role> roles;
}
