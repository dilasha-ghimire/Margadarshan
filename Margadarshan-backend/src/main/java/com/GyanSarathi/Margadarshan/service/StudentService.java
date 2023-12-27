package com.GyanSarathi.Margadarshan.service;

import com.GyanSarathi.Margadarshan.dto.LoginDto;
import com.GyanSarathi.Margadarshan.dto.StudentDto;
import com.GyanSarathi.Margadarshan.entity.Student;
import com.GyanSarathi.Margadarshan.response.LoginResponse;

import java.util.List;
import java.util.Optional;

public interface StudentService {
    List<Student> findAll();

    Optional<Student> findById(int theId);

    String save(StudentDto studentDto);

    void deleteById(int theId);
    LoginResponse loginStudent(LoginDto loginDTO);
}
