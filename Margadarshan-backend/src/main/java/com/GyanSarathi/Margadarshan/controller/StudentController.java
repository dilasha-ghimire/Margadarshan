package com.GyanSarathi.Margadarshan.controller;

import com.GyanSarathi.Margadarshan.entity.Student;
import com.GyanSarathi.Margadarshan.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://127.0.0.1:5500")
@RestController
@RequestMapping("/api")
public class StudentController {
    private StudentService studentService;

    @Autowired
    public StudentController(StudentService studentService){
        this.studentService = studentService;
    }

    //expose "/students" and return a list of employees
    @GetMapping("/students")
    public List<Student> findAll(){
        return studentService.findAll();
    }
    
    // add mapping for GET /students/{studentId}
    @GetMapping("/students/{studentId}")
    public Student getEmployee(@PathVariable int studentId){
        Student theStudent = studentService.findById(studentId);
        if(theStudent == null){
            throw new RuntimeException("Student id not found - " + studentId);
        }
        return theStudent;
    }

    // add mapping for POST /employees - add new employee

    @PostMapping("/students")
    public Student addStudent(@RequestBody Student theStudent){
        //aso just in case they pass an id in JSON ... set id to 0
        //this is to force a save of new item ... instead of update
        Student dbStudent = studentService.save(theStudent);
        return dbStudent;
    }

    //add mapping for PUT/employees - update existing employee
    //@RequestBody   because data is gonna come as a json
    @PutMapping("/students")
    public Student updateStudent(@RequestBody Student theStudent){
        Student dbStudent = studentService.save(theStudent);
        return dbStudent;
    }

    //add mapping for DELETE/employees/{employeeId} - delete employee

    @DeleteMapping("/students/{studentId}")
    public String deleteStudent(@PathVariable int studentId){
        Student tempStudent = studentService.findById(studentId);
        if(tempStudent == null){
            throw new RuntimeException("Student id not found -" + studentId);
        }
        studentService.deleteById(studentId);
        return "Deleted student id - " + studentId;
    }
}
