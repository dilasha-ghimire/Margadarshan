package com.GyanSarathi.Margadarshan.dao;

import com.GyanSarathi.Margadarshan.entity.Student;

import java.util.List;

public interface StudentDAO {
    public List<Student> findAll();

    Student findById(int theId);

    Student save(Student theStudent);

    void deleteById(int theId);
}
