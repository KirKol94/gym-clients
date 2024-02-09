package ru.castroy10.backend.dto.trainee;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.validator.constraints.Range;

@Data
public class TraineeRequestUpdateDto {
    @NotNull
    private Long id;
    private String lastName;
    private String firstName;
    private String middleName;
    @Range(min = 0, max = 1)
    private Integer sex;
    @Email
    private String email;
    private String mobilePhone;
}
