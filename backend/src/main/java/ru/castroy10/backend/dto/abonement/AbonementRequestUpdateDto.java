package ru.castroy10.backend.dto.abonement;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;
@Data
public class AbonementRequestUpdateDto{
    @NotNull
    private Long id;
    private LocalDate dateCreated;
    private LocalDate dateExpired;
    private Integer price;
    private boolean isActive;
    private boolean isFrozen;
    private LocalDate dateFrozen;
    private Long client_id;
}
