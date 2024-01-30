package ru.castroy10.backend.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "contract")
public class Contract {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "date_created")
    private LocalDate dateCreated;
    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;
    @ManyToOne
    @JoinColumn(name = "abonement_id")
    private Abonement abonement;
    @ManyToOne
    @JoinColumn(name = "status_id")
    private ContractStatus contractStatus;
}
