package ru.castroy10.backend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
@Table(name = "personal_training")
public class PersonalTraining {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "date")
    private LocalDate date;
    @Column(name = "price")
    private Integer price;
    @ManyToOne
    @JoinColumn (name = "client_id")
    private Client client;
    @ManyToOne
    @JoinColumn (name = "trainee_id")
    private Trainee trainee;
}
