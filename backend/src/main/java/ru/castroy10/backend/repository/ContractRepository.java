package ru.castroy10.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.castroy10.backend.model.Contract;

@Repository
public interface ContractRepository extends JpaRepository<Contract, Long> {
}
