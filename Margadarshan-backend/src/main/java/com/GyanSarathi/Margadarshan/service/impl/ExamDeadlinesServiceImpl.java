package com.GyanSarathi.Margadarshan.service.impl;

import com.GyanSarathi.Margadarshan.Repository.ExamDeadlinesRepository;
import com.GyanSarathi.Margadarshan.dto.ExamDto;
import com.GyanSarathi.Margadarshan.entity.Exam;
import com.GyanSarathi.Margadarshan.entity.ExamDeadlines;
import com.GyanSarathi.Margadarshan.service.ExamDeadlineService;
import jakarta.persistence.EntityNotFoundException;
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

    @Override
    public String save(ExamDto examDto) {
        ExamDeadlines examDeadlines = new ExamDeadlines();
        Exam exam = new Exam();
        exam.setExamId(examDto.getExamId());
        exam.setExamName(examDto.getExamName());
        if(examDto.getExamDateId()!=null){
            examDeadlines = examDeadlinesRepository.findById(examDto.getExamDateId())
                    .orElseThrow(()-> new NullPointerException("data not found"));
        }
        examDeadlines.setExamDate(examDto.getExamDate());
        examDeadlines.setRegistrationDeadline(examDto.getRegistrationDeadline());
        examDeadlines.setLateRegistrationDeadline(examDto.getLateRegistrationDeadline());
        examDeadlines.setExam(exam);
        examDeadlinesRepository.save(examDeadlines);
        return "data saved";
    }

    @Override
    public String updateExamDeadlines(ExamDto examDto) {
        ExamDeadlines examDeadlines = examDeadlinesRepository.findById(examDto.getExamDateId())
                .orElseThrow(() -> new EntityNotFoundException("Exam deadline not found"));
        Exam exam = new Exam();
        exam.setExamId(examDto.getExamId());
        exam.setExamName(examDto.getExamName());
        examDeadlines.setRegistrationDeadline(examDto.getRegistrationDeadline());
        examDeadlines.setExamDate(examDto.getExamDate());
        examDeadlines.setLateRegistrationDeadline(examDto.getLateRegistrationDeadline());
        examDeadlines.setExam(exam);
        examDeadlinesRepository.save(examDeadlines);
        return "Exam deadline saved";
    }
}
