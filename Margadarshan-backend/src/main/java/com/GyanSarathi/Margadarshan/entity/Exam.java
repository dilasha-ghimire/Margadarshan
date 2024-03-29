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


    /*CREATE TABLE `exams` (
  `exam_id` int NOT NULL,
  `exam_name` varchar(100) NOT NULL,
  PRIMARY KEY (`exam_id`)
)

*/





}
