package com.GyanSarathi.Margadarshan.entity;

import jakarta.persistence.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "exams")
public class Exam{

    @Column(name = "exam_id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int examId;

    @Column(name = "exam_name")
    private String examName;

    @OneToMany(mappedBy = "exam",cascade = CascadeType.ALL)
    private List<ExamDeadlines> examDeadlines = new ArrayList<>();



}
