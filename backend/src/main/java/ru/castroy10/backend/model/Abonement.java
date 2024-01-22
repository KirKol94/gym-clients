package ru.castroy10.backend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name="abonement")
@Data
public class Abonement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "date_created")
    private LocalDateTime dateCreated;
    @Column(name = "date_experied")
    private LocalDateTime dateExperied;
    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;
}
