package com.GyanSarathi.Margadarshan.Repository;

import com.GyanSarathi.Margadarshan.entity.Education;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EducationRepository extends JpaRepository<Education,Integer> {

   /* @Query(value = "SELECT Education.education_id, Education.education_institute, Education.education_qualification, Students.student_id, Students.full_name FROM Education LEFT JOIN Students ON Education.student_id = Students.student_id WHERE Students.student_id = ?1", nativeQuery = true)
    List<?> listOfEducation(int studentId);*/

    @Query("SELECT e, s.fullName FROM Education e JOIN e.student s")
    List<Object[]> listOfEducationWithStudentName();

//    @Query(value ="INSERT INTO Education VALUES (?1,?2,?3)" ,nativeQuery = true)
//    void educationAddOn(String educationInstitute, String educationQualification, int studentId);
//
//    @Query(value = "SELECT Education.education_id, Education.education_institute, Education.education_qualification, Students.student_id, Students.full_name FROM Education LEFT JOIN Students ON Education.student_id = Students.student_id WHERE Students.student_id = ?1", nativeQuery = true)
//    List<Education> listOfEducationTwo(int studentId);


}
