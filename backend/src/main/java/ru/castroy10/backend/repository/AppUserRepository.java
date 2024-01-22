package ru.castroy10.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.castroy10.backend.model.Appuser;

public interface AppUserRepository extends JpaRepository<Appuser, Long> {

}
