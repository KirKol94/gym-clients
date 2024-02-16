package ru.castroy10.backend.dto.client;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.validator.constraints.Range;

@Data
public class ClientRequestSaveDto {

    @NotNull
    @NotBlank
    private String lastName;
    @NotNull
    @NotBlank
    private String firstName;
    private String middleName;
    private String birthday;
    @Range(min = 0, max = 1)
    private Integer sex;
    private Integer personalTrainingCount;
    @Email
    private String email;
    private String mobilePhone;
}
