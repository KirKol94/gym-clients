package ru.castroy10.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.castroy10.backend.model.Trainee;

import java.util.List;

@Repository
public interface TraineeRepository extends JpaRepository<Trainee, Long> {

    @Query("from Trainee c where " +
            "lower(concat(c.lastName, ' ', c.firstName, ' ', c.middleName)) like (concat('%', :name, '%')) "+
            "or lower(concat(c.firstName, ' ', c.lastName,' ', c.middleName)) like (concat('%', :name, '%'))" +
            "or lower(concat(c.firstName, ' ', c.middleName,' ', c.lastName)) like (concat('%', :name, '%'))")
    List<Trainee> findByName(@Param("name") String name);

}
