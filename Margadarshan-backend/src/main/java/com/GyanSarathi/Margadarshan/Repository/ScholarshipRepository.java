package com.GyanSarathi.Margadarshan.Repository;

import com.GyanSarathi.Margadarshan.entity.Scholarship;
import com.GyanSarathi.Margadarshan.entity.University;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScholarshipRepository extends JpaRepository<Scholarship,Integer> {

    //filter by name
    @Query(value = "SELECT * from Scholarship where scholarship_name = :scholarshipName",nativeQuery = true )
    List<Scholarship> findByName(@Param("scholarshipName") String scholarshipName);

    @Query(value ="SELECT * FROM Scholarship WHERE ((CAST(scholarship_grant AS SIGNED) <= ?1 AND CAST(scholarship_grant AS SIGNED) >= ?2))AND scholarship_type = ?3 OR scholarship_gpa = ?4", nativeQuery = true)
    List<Scholarship> findByGrantOrTypeOrGpa(long grantUpperBound, long grantLowerBound, String scholarshipType, String scholarshipGpa);

    @Query(value = "Select * from Scholarship WHERE scholarship_grant=?1 or scholarship_type=?2 or scholarship_gpa=?3",nativeQuery = true)
    List<Scholarship> findByGrantOrTypeOrGpaTwo(String scholarshipGrant, String scholarshipType, String scholarshipGpa);

}

