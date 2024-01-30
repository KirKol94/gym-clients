package ru.castroy10.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name="role",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "role_role_name_key",
                        columnNames = "role_name"
                )
        })
@Data
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "role_name")
    private String roleName;
}
