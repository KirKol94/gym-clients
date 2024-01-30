package ru.castroy10.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "other_product",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "other_product_name_key",
                        columnNames = "name"
                )
        })
public class OtherProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "name")
    private String name;
    @Column(name = "price")
    private Integer price;
}
