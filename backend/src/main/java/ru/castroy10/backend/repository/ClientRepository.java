package ru.castroy10.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.castroy10.backend.model.Client;

public interface ClientRepository extends JpaRepository<Client, Long> {
}
