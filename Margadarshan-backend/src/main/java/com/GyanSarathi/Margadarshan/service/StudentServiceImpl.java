package com.GyanSarathi.Margadarshan.service;

import com.GyanSarathi.Margadarshan.Repository.StudentRepository;
import com.GyanSarathi.Margadarshan.entity.Student;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentServiceImpl implements StudentService{
    //setting up constructor injection
    private StudentRepository studentRepository;

    @Autowired
    public StudentServiceImpl(StudentRepository studentRepository){
        this.studentRepository =  studentRepository;
    }

    @Override
    public List<Student> findAll() {
        return studentRepository.findAll();
    }

    @Override
    public Student findById(int theId) {
        Optional<Student> result = studentRepository.findById(theId);
        Student student = null;
        if(result.isPresent()){
            student = result.get();
        }
        else{
            throw new RuntimeException("Did not find the student with ID : " + theId);
        }
        return student;
    }

    @Transactional
    @Override
    public Student save(Student theStudent) {
        return studentRepository.save(theStudent);
    }
    @Transactional
    @Override
    public void deleteById(int theId) {
        studentRepository.deleteById(theId);
    }
}
