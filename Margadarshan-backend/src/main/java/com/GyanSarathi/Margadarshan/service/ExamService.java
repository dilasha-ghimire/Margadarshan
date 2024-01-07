package com.GyanSarathi.Margadarshan.service;

import com.GyanSarathi.Margadarshan.entity.Exam;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ExamService {
    public List<Exam> findAll();
}
