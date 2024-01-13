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

    @Query(value = "select * from Universities where (university_fees <= ?1 and university_fees >=?2) OR university_major=?3 OR university_state=?4" , nativeQuery = true)
    List<University> findByMajorOrFeesOrState(long universityFeesUpperBound,
                                long universityFeesLowerBound, String universityMajor, String universityState);

    @Query(value = "select university_major from Universities",nativeQuery = true)
    List<?> listAllMajors();

}


