package com.GyanSarathi.Margadarshan.Repository;

import com.GyanSarathi.Margadarshan.entity.ExamDeadlines;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExamDeadlinesRepository extends JpaRepository<ExamDeadlines,Integer> {
    long countAllByExamExamId(int examId);

}
