package ru.castroy10.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.castroy10.backend.model.Contract;

public interface ContractRepository extends JpaRepository<Contract, Long> {
}
