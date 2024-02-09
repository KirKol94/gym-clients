package ru.castroy10.backend.dto.abonement;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class AbonementRequestSaveDto {

    @NotNull
    private LocalDate dateCreated;
    @NotNull
    private LocalDate dateExpired;
    @NotNull
    private Integer price;
    @NotNull
    private boolean isActive;
    private boolean isFrozen;
    private LocalDate dateFrozen;
    @NotNull
    private Long client_id;
}
