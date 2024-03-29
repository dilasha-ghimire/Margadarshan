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


    @Query(value = "SELECT * from Scholarship WHERE scholarship_type=?1 AND scholarship_gpa =?2",nativeQuery = true)
    List<Scholarship> findByTypeAndGpa(String scholarshipType, String scholarshipGpa);

    //for other type
    @Query(value = "SELECT * from Scholarship WHERE scholarship_type=?1",nativeQuery = true)
    List<Scholarship> findByType(String scholarshipType);

    @Query(value ="SELECT * FROM Scholarship WHERE ((CAST(scholarship_grant AS SIGNED) <= ?1 AND CAST(scholarship_grant AS SIGNED) >= ?2))", nativeQuery = true)
    List<Scholarship> findByGrant(long grantUpperBound, long grantLowerBound);

    @Query(value ="SELECT * FROM Scholarship WHERE ((CAST(scholarship_grant AS SIGNED) <= ?1 AND CAST(scholarship_grant AS SIGNED) >= ?2))AND scholarship_type = ?3 AND scholarship_gpa=?4", nativeQuery = true)
    List<Scholarship> findByGrantAndTypeAndGpa(long grantUpperBound, long grantLowerBound, String scholarshipType, String scholarshipGpa);

    @Query(value ="SELECT * FROM Scholarship WHERE ((CAST(scholarship_grant AS SIGNED) <= ?1 AND CAST(scholarship_grant AS SIGNED) >= ?2) AND scholarship_type =?3)", nativeQuery = true)
    List<Scholarship> findByGrantAndType(long grantUpperBound, long grantLowerBound,String scholarshipType);

}

