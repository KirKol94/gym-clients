package ru.castroy10.backend.model;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "abonement_type",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "abonement_type_type_key",
                        columnNames = "type"
                )
        })
public class AbonementType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "type")
    private String type;
}
