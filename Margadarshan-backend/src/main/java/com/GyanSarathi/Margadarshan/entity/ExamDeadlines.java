package com.GyanSarathi.Margadarshan.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "exam_dates")
public class ExamDeadlines {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "exam_date_id" )
    private int examDateId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "exam_id")
    private Exam exam;

    @Column(name = "exam_date")
    private String examDate;

    @Column(name = "registration_deadline")
    private String registrationDeadline;

    @Column(name = "late_registration_deadline")
    private String lateRegistrationDeadline;

    /*CREATE TABLE `exam_dates` (
  `exam_date_id` int NOT NULL AUTO_INCREMENT,
  `exam_id` int NOT NULL,
  `exam_date` varchar(50) DEFAULT NULL,
  `registration_deadline` varchar(50) DEFAULT NULL,
  `late_registration_deadline` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`exam_date_id`),
  KEY `exam_id` (`exam_id`),
  CONSTRAINT `exam_dates_ibfk_1` FOREIGN KEY (`exam_id`) REFERENCES `exams` (`exam_id`)
)

*/
}
