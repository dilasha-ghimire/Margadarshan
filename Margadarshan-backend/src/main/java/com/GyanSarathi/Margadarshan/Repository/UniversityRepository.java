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
    @Query("SELECT u FROM University u WHERE u.major = :university_major OR u.state = :university_state OR u.fees = :university_fees")
    List<University> findByMajorOrFeesOrState(@Param("university_major") String universityMajor,
                                              @Param("university_state") String universityState,
                                              @Param("university_fees") long universityFees);
}


