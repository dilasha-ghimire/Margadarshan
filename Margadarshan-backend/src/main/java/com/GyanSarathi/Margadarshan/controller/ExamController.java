package com.GyanSarathi.Margadarshan.controller;

import com.GyanSarathi.Margadarshan.entity.Exam;
import com.GyanSarathi.Margadarshan.entity.ExamDeadlines;
import com.GyanSarathi.Margadarshan.service.ExamDeadlineService;
import com.GyanSarathi.Margadarshan.service.ExamService;
import com.GyanSarathi.Margadarshan.service.impl.ExamDeadlinesServiceImpl;
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
    private final ExamDeadlineService examDeadlineService;
    @Autowired
    public ExamController(ExamDeadlineService examDeadlineService) {
        this.examDeadlineService = examDeadlineService;
    }
    @GetMapping("/exam-deadlines")
    public List<ExamDeadlines> findAllExams(){
        return examDeadlineService.findAll();
    }

}
