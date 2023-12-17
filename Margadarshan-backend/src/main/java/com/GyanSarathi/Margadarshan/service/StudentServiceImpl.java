package com.GyanSarathi.Margadarshan.service;

import com.GyanSarathi.Margadarshan.dao.StudentDAO;
import com.GyanSarathi.Margadarshan.entity.Student;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class StudentServiceImpl implements StudentService{
    //setting up constructor injection
    private StudentDAO studentDAO;

    @Autowired
    public StudentServiceImpl(StudentDAO studentDAO){
        this.studentDAO =  studentDAO;
    }

    @Override
    public List<Student> findAll() {
        return studentDAO.findAll();
    }

    @Override
    public Student findById(int theId) {
        return studentDAO.findById(theId);
    }

    @Transactional
    @Override
    public Student save(Student theStudent) {
        return studentDAO.save(theStudent);
    }
    @Transactional
    @Override
    public void deleteById(int theId) {
        studentDAO.deleteById(theId);
    }
}
