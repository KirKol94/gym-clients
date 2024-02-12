package ru.castroy10.backend.model;


import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
@Table(name="abonement")
public class Abonement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "date_created")
    private LocalDate dateCreated;
    @Column(name = "date_expired")
    private LocalDate dateExpired;
    @Column(name = "price")
    private Integer price;
    @Column(name = "is_active")
    private boolean isActive;
    @Column(name = "is_frozen")
    private boolean isFrozen;
    @Column(name = "date_frozen")
    private LocalDate dateFrozen;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "client_id")
    private Client client;
    @ManyToOne
    @JoinColumn (name = "type_id")
    private AbonementType abonementType;
}
