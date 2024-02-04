package ru.castroy10.backend.repository;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.castroy10.backend.model.Appuser;

import java.util.Optional;

@Repository
public interface AppUserRepository extends JpaRepository<Appuser, Long> {

    @EntityGraph(attributePaths = {"roles"})
    Optional<Appuser> findAppuserByUsername(String username);

    @EntityGraph(attributePaths = {"roles"})
    Optional<Appuser> findAppuserById(Long id);
}
