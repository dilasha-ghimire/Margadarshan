package com.GyanSarathi.Margadarshan.service;

import com.GyanSarathi.Margadarshan.dto.DocumentDto;
import com.GyanSarathi.Margadarshan.dto.LoginDto;
import com.GyanSarathi.Margadarshan.dto.ProfileDto;
import com.GyanSarathi.Margadarshan.dto.StudentDto;
import com.GyanSarathi.Margadarshan.entity.Document;
import com.GyanSarathi.Margadarshan.entity.Profile;
import com.GyanSarathi.Margadarshan.entity.Student;
import com.GyanSarathi.Margadarshan.response.LoginResponse;
import com.GyanSarathi.Margadarshan.response.OtpResponse;

import java.util.List;
import java.util.Optional;

public interface StudentService {
    List<Student> findAll();

    Optional<Student> findById(int theId);

    String save(StudentDto studentDto);

    void deleteById(int theId);
    LoginResponse loginStudent(LoginDto loginDTO);

    OtpResponse generateOtpToEmail(String email);

    OtpResponse validateOtp(String email, String Otp);

    void updatePassword(String password, String email);

    String updateProfileWithCitizenship(StudentDto studentDto);

    StudentDto getStudentByStudentId(StudentDto studentDto);




}
