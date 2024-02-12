package ru.castroy10.backend.dto.abonement;

import lombok.Data;
import ru.castroy10.backend.model.Client;

import java.time.LocalDate;

@Data
public class AbonementResponseFullDto {
    private Long id;
    private LocalDate dateCreated;
    private LocalDate dateExpired;
    private Integer price;
    private boolean isActive;
    private boolean isFrozen;
    private LocalDate dateFrozen;
    private Client client;
}
