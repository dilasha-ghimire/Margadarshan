package com.GyanSarathi.Margadarshan.service;

import com.GyanSarathi.Margadarshan.dto.ExamDto;
import com.GyanSarathi.Margadarshan.entity.ExamDeadlines;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ExamDeadlineService {

    List<ExamDeadlines> findAll();

    String save(ExamDto examDto);

    String updateExamDeadlines(ExamDto examDto);
}
