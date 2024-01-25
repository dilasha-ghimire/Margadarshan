package com.GyanSarathi.Margadarshan.Repository;

import com.GyanSarathi.Margadarshan.entity.Education;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EducationRepository extends JpaRepository<Education,Integer> {

    @Query("SELECT e, s.fullName FROM Education e JOIN e.student s")
    List<Object[]> listOfEducationWithStudentName();

    @Query(value = "SELECT * FROM Education e WHERE e.student_id = ?1", nativeQuery = true)
    List<Education> findListOfEducation(int studentId);

    List<Education> findByStudentId(int studentId);

    Education findByEducationId(int educationId);

}
