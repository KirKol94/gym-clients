package ru.castroy10.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.castroy10.backend.model.Abonement;

@Repository
public interface AbonementRepository extends JpaRepository<Abonement, Long> {
}
