package com.GyanSarathi.Margadarshan.controller;

import com.GyanSarathi.Margadarshan.entity.Exam;
import com.GyanSarathi.Margadarshan.service.ExamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class ExamController {
    private final ExamService examService;
    @Autowired
    public ExamController(ExamService examService) {
        this.examService = examService;
    }
    @GetMapping("/exams")
    public List<Exam> findAllExams(){
        return examService.findAll();
    }
}
