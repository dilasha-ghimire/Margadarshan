package com.GyanSarathi.Margadarshan.service.impl;

import com.GyanSarathi.Margadarshan.Repository.ProfileRepository;
import com.GyanSarathi.Margadarshan.Repository.ProfileRepository;
import com.GyanSarathi.Margadarshan.Repository.StudentRepository;
import com.GyanSarathi.Margadarshan.dto.*;
import com.GyanSarathi.Margadarshan.dto.ProfileDto;
import com.GyanSarathi.Margadarshan.entity.Document;
import com.GyanSarathi.Margadarshan.entity.Profile;
import com.GyanSarathi.Margadarshan.entity.Student;
import com.GyanSarathi.Margadarshan.response.LoginResponse;
import com.GyanSarathi.Margadarshan.response.OtpResponse;
import com.GyanSarathi.Margadarshan.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.mail.SimpleMailMessage;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;

@Service
public class StudentServiceImpl implements StudentService {
    private final StudentRepository studentRepository;
    private final PasswordEncoder passwordEncoder;

    private final JavaMailSender javaMailSender;

    @Value("${upload.path}")
    private String uploadPath;

    @Autowired
    public StudentServiceImpl(StudentRepository studentRepository, PasswordEncoder passwordEncoder, JavaMailSender javaMailSender) {
        this.studentRepository = studentRepository;
        this.passwordEncoder = passwordEncoder;
        this.javaMailSender = javaMailSender;
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
            int id = student1.getId();
            String encodedPassword = student1.getPassword();
            boolean isPwdRight = passwordEncoder.matches(password, encodedPassword);
            if (isPwdRight) {
                Optional<Student> student = studentRepository.findOneByEmailAndPassword(loginDto.getEmail(), encodedPassword);
                if (student.isPresent()) {
                    return new LoginResponse("Login Success", true,id);
                } else {
                    return new LoginResponse("Login Failed", false,0);
                }
            } else {
                return new LoginResponse("password does not match", false,0);
            }
        }else {
            return new LoginResponse("Email does not exist", false,0);
        }
    }

    public String generateOtp(){
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000);
        return String.valueOf(otp);
    }

    @Override
    public OtpResponse generateOtpToEmail(String email) {
        SimpleMailMessage message = new SimpleMailMessage();
        long emailExists = studentRepository.emailExists(email);
        if(emailExists==1){
            String otp = generateOtp();
            studentRepository.updateOtp(otp,email);
            message.setTo(email);
            message.setSubject("Margadarshan password reset OTP");
            message.setText("Your OTP for password reset is: " + otp);
            javaMailSender.send(message);
            return new OtpResponse("OTP Sent");
        }else {
            return new OtpResponse("Email does not exist");
        }
    }

    @Override
    public OtpResponse validateOtp(String email, String Otp) {
        String otp = studentRepository.otp(email);
        if(Objects.equals(Otp,otp)){
            return new OtpResponse("Success");
        }else {
            return new OtpResponse("Unsuccessful");
        }
    }

    @Override
    public void updatePassword(String password, String email) {
        String encodedPassword = this.passwordEncoder.encode(password);
        studentRepository.updatePassword(encodedPassword,email);
    }

    @Override
    public String updateProfileWithCitizenship(StudentDto studentDto) {
        Student existingStudent = studentRepository.findStudentById(studentDto.getStudentId());
        String fileName = UUID.randomUUID().toString()+"_"+ studentDto.getCitizenshipFront().getOriginalFilename();
        Path filePath = Paths.get(uploadPath,fileName);
        try {
            Files.copy(studentDto.getCitizenshipFront().getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        String fileName2 = UUID.randomUUID().toString()+"_"+ studentDto.getCitizenshipBack().getOriginalFilename();
        Path filePath2 = Paths.get(uploadPath,fileName2);
        try {
            Files.copy(studentDto.getCitizenshipBack().getInputStream(), filePath2, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        existingStudent.setCitizenshipFront(fileName);
        existingStudent.setCitizenshipBack(fileName2);
        existingStudent.setFullName(studentDto.getStudentFullName());
        existingStudent.setNumber(studentDto.getStudentNumber());
        existingStudent.setAddress(studentDto.getStudentAddress());
        studentRepository.save(existingStudent);
        return "Profile updated";
    }

    @Override
    public String updateProfileWithoutCitizenship(StudentDto studentDto) {
        Student existingStudent = studentRepository.findStudentById(studentDto.getStudentId());
        existingStudent.setFullName(studentDto.getStudentFullName());
        existingStudent.setNumber(studentDto.getStudentNumber());
        existingStudent.setAddress(studentDto.getStudentAddress());
        studentRepository.save(existingStudent);
        return "Profile updated";
    }

    @Override
    public StudentDto getStudentByStudentId(StudentDto studentDto) {
        Student student = studentRepository.findStudentById(studentDto.getStudentId());
        return StudentDto.builder()
                .studentAddress(student.getAddress())
                .studentEmail(student.getEmail())
                .studentNumber(student.getNumber())
                .studentFullName(student.getFullName())
                .citizenshipBackString(student.getCitizenshipBack())
                .citizenshipFrontString(student.getCitizenshipFront())
                .build();
    }
}

