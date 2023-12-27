package com.GyanSarathi.Margadarshan.Repository;

import com.GyanSarathi.Margadarshan.entity.Student;


import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StudentRepository extends JpaRepository <Student,Integer>{
    Optional<Student> findOneByEmailAndPassword(String email, String password);
    Student findByEmail(String email);
}
