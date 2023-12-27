package com.GyanSarathi.Margadarshan.controller;

import com.GyanSarathi.Margadarshan.dto.LoginDto;
import com.GyanSarathi.Margadarshan.dto.StudentDto;
import com.GyanSarathi.Margadarshan.entity.Student;
import com.GyanSarathi.Margadarshan.response.LoginResponse;
import com.GyanSarathi.Margadarshan.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class StudentController {
    private final StudentService studentService;

    @Autowired
    public StudentController(StudentService studentService){
        this.studentService = studentService;
    }

    @GetMapping("/students")
    public List<Student> findAll(){
        return studentService.findAll();
    }

    @GetMapping("/student-by-id/{studentId}")
    public Optional<Student> getStudent(@PathVariable int studentId){
        Optional<Student> theStudent = studentService.findById(studentId);
        if(theStudent.isEmpty()){
            throw new RuntimeException("Student id not found - " + studentId);
        }
        return theStudent;
    }

    @PostMapping("/save-student")
    public void addStudent(@RequestBody StudentDto studentDto){
        studentService.save(studentDto);
    }


    @DeleteMapping("/delete-student/{studentId}")
    public void deleteStudent(@PathVariable("studentId") int studentId){
        studentService.deleteById(studentId);
    }

    @PostMapping(path = "/login")
    public ResponseEntity<?> loginStudent(@RequestBody LoginDto loginDto)
    {
        LoginResponse loginResponse = studentService.loginStudent(loginDto);
        return ResponseEntity.ok(loginResponse);
    }

}
