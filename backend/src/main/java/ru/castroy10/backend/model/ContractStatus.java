package ru.castroy10.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name ="contract_status",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "contract_status_status_key",
                        columnNames = "status"
                )
        })
public class ContractStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "status")
    private String status;
}
