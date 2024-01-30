package com.GyanSarathi.Margadarshan.Repository;

import com.GyanSarathi.Margadarshan.entity.Sop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SopRepository extends JpaRepository<Sop,Integer> {

    @Query(value = "SELECT * FROM SOP WHERE student_id = ?1", nativeQuery = true)
    List<Sop> retrieveByStudentId(int studentId);

}
