package com.GyanSarathi.Margadarshan.controller;

import com.GyanSarathi.Margadarshan.dto.LoginDto;
import com.GyanSarathi.Margadarshan.dto.ProfileDto;
import com.GyanSarathi.Margadarshan.dto.StudentDto;
import com.GyanSarathi.Margadarshan.entity.Profile;
import com.GyanSarathi.Margadarshan.entity.Student;
import com.GyanSarathi.Margadarshan.response.LoginResponse;
import com.GyanSarathi.Margadarshan.response.OtpResponse;
import com.GyanSarathi.Margadarshan.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class StudentController {
    private final StudentService studentService;
    private static String otp;

    @Autowired
    public StudentController(StudentService studentService){
        this.studentService = studentService;
    }

    @GetMapping("/students")
    public List<Student> findAll(){
        return studentService.findAll();
    }

    @GetMapping("/students-record")
    public ResponseEntity<Object> findAllRecords() {
        List<Student> students = studentService.findAll();
        int totalRecords = students.size();
        Map<String, Object> response = new HashMap<>();
        response.put("totalRecords", totalRecords);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/student-by-id/{studentId}")
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
        
    @PostMapping("/send-otp")
    public ResponseEntity<?> sendOtp(@RequestBody StudentDto studentDto){
        OtpResponse otpResponse = studentService.generateOtpToEmail(studentDto.getStudentEmail());
        return ResponseEntity.ok(otpResponse);
    }

    @PostMapping("/validate-otp")
    public ResponseEntity<?> validateOtp(@RequestBody StudentDto studentDto){
        OtpResponse otpResponse = studentService.validateOtp(studentDto.getStudentEmail(),studentDto.getOtp());
        return ResponseEntity.ok(otpResponse);
    }

    @PostMapping("/password-reset")
    public String resetPassword(@RequestBody StudentDto studentDto){
        studentService.updatePassword(studentDto.getStudentPassword(),studentDto.getStudentEmail());
        return "Password reset complete";
    }

}
