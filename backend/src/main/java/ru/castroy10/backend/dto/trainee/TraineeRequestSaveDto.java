package ru.castroy10.backend.dto.trainee;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.validator.constraints.Range;

@Data
public class TraineeRequestSaveDto {
    @NotNull
    @NotBlank
    private String lastName;
    @NotNull
    @NotBlank
    private String firstName;
    @NotNull
    @NotBlank
    private String middleName;
    @Range(min = 0, max = 1)
    private Integer sex;
    @Email
    private String email;
    private String mobilePhone;
}
