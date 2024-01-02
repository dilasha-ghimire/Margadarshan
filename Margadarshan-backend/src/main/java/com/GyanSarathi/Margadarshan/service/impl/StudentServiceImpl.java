package com.GyanSarathi.Margadarshan.service.impl;

import com.GyanSarathi.Margadarshan.Repository.StudentRepository;
import com.GyanSarathi.Margadarshan.dto.LoginDto;
import com.GyanSarathi.Margadarshan.dto.StudentDto;
import com.GyanSarathi.Margadarshan.entity.Student;
import com.GyanSarathi.Margadarshan.response.LoginResponse;
import com.GyanSarathi.Margadarshan.service.StudentService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentServiceImpl implements StudentService {
    private final StudentRepository studentRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public StudentServiceImpl(StudentRepository studentRepository, PasswordEncoder passwordEncoder) {
        this.studentRepository = studentRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public List<Student> findAll() {
        return studentRepository.findAll();
    }

    @Override
    public Optional<Student> findById(int theId) {
        return studentRepository.findById(theId);
    }

    @Override
    public String save(StudentDto studentDto) {
        Student student = new Student();
        if(studentDto.getStudentId()!=null){
            student = studentRepository.findById(studentDto.getStudentId())
                    .orElseThrow(()-> new NullPointerException("data not found"));
        }
        student.setFullName(studentDto.getStudentFullName());
        student.setAddress(studentDto.getStudentAddress());
        student.setNumber(studentDto.getStudentNumber());
        student.setEmail(studentDto.getStudentEmail());
        student.setPassword(this.passwordEncoder.encode(studentDto.getStudentPassword()));
        studentRepository.save(student);
        return "Data Saved";
    }

    @Override
    public void deleteById(int theId) {
        studentRepository.deleteById(theId);
    }


    @Override
    public LoginResponse loginStudent(LoginDto loginDto) {
        String msg = "";
        Student student1 = studentRepository.findByEmail(loginDto.getEmail());
        if (student1 != null) {
            String password = loginDto.getPassword();
            String encodedPassword = student1.getPassword();
            boolean isPwdRight = passwordEncoder.matches(password, encodedPassword);
            if (isPwdRight) {
                Optional<Student> student = studentRepository.findOneByEmailAndPassword(loginDto.getEmail(), encodedPassword);
                if (student.isPresent()) {
                    return new LoginResponse("Login Success", true);
                } else {
                    return new LoginResponse("Login Failed", false);
                }
            } else {
                return new LoginResponse("password does not match", false);
            }
        }else {
            return new LoginResponse("Email does not exist", false);
        }
    }
}

