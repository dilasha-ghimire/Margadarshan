package com.GyanSarathi.Margadarshan.Repository;

import com.GyanSarathi.Margadarshan.entity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProfileRepository extends JpaRepository<Profile, Integer>{

    @Query(value = "SELECT citizenship from profile WHERE student_id =?1",nativeQuery = true)
    List<Profile> findAlByStudentId(int studentId);
}
