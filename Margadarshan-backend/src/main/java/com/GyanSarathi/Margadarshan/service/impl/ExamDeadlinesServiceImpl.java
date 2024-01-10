package com.GyanSarathi.Margadarshan.service.impl;

import com.GyanSarathi.Margadarshan.Repository.ExamDeadlinesRepository;
import com.GyanSarathi.Margadarshan.entity.ExamDeadlines;
import com.GyanSarathi.Margadarshan.service.ExamDeadlineService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExamDeadlinesServiceImpl implements ExamDeadlineService {
    private final ExamDeadlinesRepository examDeadlinesRepository;

    @Autowired
    public ExamDeadlinesServiceImpl(ExamDeadlinesRepository examDeadlinesRepository){
        this.examDeadlinesRepository = examDeadlinesRepository;
    }


    @Override
    public List<ExamDeadlines> findAll() {
        return examDeadlinesRepository.findAll();
    }
}
