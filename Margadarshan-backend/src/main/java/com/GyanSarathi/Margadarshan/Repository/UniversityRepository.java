package com.GyanSarathi.Margadarshan.Repository;

import com.GyanSarathi.Margadarshan.entity.University;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UniversityRepository extends JpaRepository<University,Integer> {
    List<University> findUniversitiesByName(String universityName);

    @Query(value = "select * from Universities where (university_fees <= ?1 and university_fees >=?2) OR university_major=?3 OR university_state=?4", nativeQuery = true)
    List<University> findByMajorOrFeesOrState(long universityFeesUpperBound,
                                              long universityFeesLowerBound, String universityMajor, String universityState);

    @Query(value = "select university_major from Universities", nativeQuery = true)
    List<?> listAllMajors();


    @Query(value = "select * from Universities where university_name=?1 OR CAST(average_bachelors_gpa AS SIGNED)<=?2 OR (CAST(average_ielts_score AS SIGNED)<=?3 or CAST(average_toefl_score AS SIGNED) <= ?4) OR (CAST(average_gre_score AS SIGNED)<=?5 or CAST(average_sat_score AS SIGNED)<=?6)", nativeQuery = true)
    University filterForRoadmap(String universityName,double averageBachelorsGpa, int averageIeltsScore, int averageToeflScore, int averageGreScore, int averageSatScore);

    @Query(value = "select * from Universities where university_name=?1 AND CAST(average_masters_gpa AS SIGNED)<=?2 OR (CAST(average_ielts_score AS SIGNED)<=?3 or CAST(average_toefl_score AS SIGNED) <= ?4) OR (CAST(average_gre_score AS SIGNED)<=?5 or CAST(average_sat_score AS SIGNED)<=?6)", nativeQuery = true)
    University filterForRoadmapTwo(String universityName,double averageMastersGpa, int averageIeltsScore, int averageToeflScore, int averageGreScore, int averageSatScore);

    @Query(value = "select university_name from Universities", nativeQuery = true)
    List<?> listAllUniversities();

}
