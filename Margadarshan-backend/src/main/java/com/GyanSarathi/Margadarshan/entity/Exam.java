package com.GyanSarathi.Margadarshan.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "exams")
public class Exam{

    @Column(name = "exam_id")
    @Id
    private int examId;

    @Column(name = "exam_name")
    private String examName;

    @OneToMany(fetch = FetchType.EAGER,mappedBy = "exam",cascade = CascadeType.ALL)
    private List<ExamDeadlines> examDeadlines = new ArrayList<>();



}
