package ru.castroy10.backend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
@Table(name = "purchase")
public class Purchase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "date")
    private LocalDate date;
    @ManyToOne
    @JoinColumn (name = "client_id")
    private Client client;
    @ManyToOne
    @JoinColumn (name = "other_product_id")
    private OtherProduct otherProduct;
}
