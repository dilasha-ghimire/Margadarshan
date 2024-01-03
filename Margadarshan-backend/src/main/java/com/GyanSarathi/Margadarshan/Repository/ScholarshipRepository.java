package com.GyanSarathi.Margadarshan.Repository;

import com.GyanSarathi.Margadarshan.entity.Scholarship;
import com.GyanSarathi.Margadarshan.entity.University;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScholarshipRepository extends JpaRepository<Scholarship,Integer> {

<<<<<<< HEAD
    @Query("SELECT s FROM Scholarship s WHERE s.grant = :scholarship_grant OR s.scholarshipType = :scholarship_type OR s.scholarshipGpa >= :scholarship_gpa")
    List<Scholarship> findByGrantOrTypeOrGpa(@Param("scholarship_grant") long scholarshipGrant,
                                              @Param("scholarship_type") String scholarshipType,
                                              @Param("scholarship_gpa") int scholarshipGpa);
=======
>>>>>>> df41402d44421d4cccf374a582dbf3c0a6248ab3
}
