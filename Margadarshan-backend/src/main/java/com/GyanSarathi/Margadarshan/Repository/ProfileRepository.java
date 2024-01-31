package com.GyanSarathi.Margadarshan.Repository;

import com.GyanSarathi.Margadarshan.entity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
<<<<<<< HEAD
import org.springframework.web.bind.annotation.RequestParam;
=======
>>>>>>> d915e6f6301105017a2fa7f17e6eabc9d4cf192f

import java.util.List;

@Repository
public interface ProfileRepository extends JpaRepository<Profile, Integer>{

<<<<<<< HEAD
    @Query(value = "SELECT * FROM Profile p WHERE p.student_id = ?1", nativeQuery = true)
    List<Profile> listByStudentId(int studentId);

=======
    @Query(value = "SELECT citizenship from profile WHERE student_id =?1",nativeQuery = true)
    List<Profile> findAlByStudentId(int studentId);
>>>>>>> d915e6f6301105017a2fa7f17e6eabc9d4cf192f
}
