package com.GyanSarathi.Margadarshan.service.impl;

import com.GyanSarathi.Margadarshan.Repository.ExamRepository;
import com.GyanSarathi.Margadarshan.entity.Exam;
import com.GyanSarathi.Margadarshan.service.ExamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExamServiceImpl implements ExamService {

    private final ExamRepository examRepository;

    @Autowired
    public ExamServiceImpl(ExamRepository examRepository) {
        this.examRepository = examRepository;
    }


    @Override
    public List<Exam> findAll() {
        return examRepository.findAll();
    }
}
