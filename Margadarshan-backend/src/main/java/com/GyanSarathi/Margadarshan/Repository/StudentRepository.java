package com.GyanSarathi.Margadarshan.Repository;

import com.GyanSarathi.Margadarshan.entity.Student;


import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface StudentRepository extends JpaRepository <Student,Integer>{

    Student findStudentById(int studentId);

    Optional<Student> findOneByEmailAndPassword(String email, String password);
    Student findByEmail(String email);

    @Query(value = "SELECT EXISTS(SELECT 1 FROM Students WHERE email = ?1)", nativeQuery = true)
    long emailExists(String email);

    @Modifying
    @Transactional
    @Query(value = "UPDATE Students SET Otp = ?1 WHERE email = ?2",nativeQuery = true)
    void updateOtp(String otp, String email);

    @Query(value = "SELECT Otp from Students where email=?1",nativeQuery = true)
    String otp(String email);

    @Modifying
    @Transactional
    @Query(value = "UPDATE Students SET password = ?1 WHERE email = ?2",nativeQuery = true)
    void updatePassword(String password, String email);
}
