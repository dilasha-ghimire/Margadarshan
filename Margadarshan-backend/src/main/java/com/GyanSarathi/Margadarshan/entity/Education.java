package com.GyanSarathi.Margadarshan.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ValueGenerationType;
import org.hibernate.id.factory.spi.GenerationTypeStrategy;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

@Entity
@Table(name = "Education")
public class Education {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "education_id")
    private int educationId;

    @Column(name = "education_institute", nullable = false)
    private String educationInstitute;

    @Column(name = "education_qualification", nullable = false)
    private String educationQualification;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;
    
    /*CREATE TABLE `Education` (
  `education_id` int NOT NULL AUTO_INCREMENT,
  `education_institute` varchar(100) NOT NULL,
  `education_qualification` varchar(100) NOT NULL,
  `student_id` int NOT NULL,
  PRIMARY KEY (`education_id`),
  KEY `student_id` (`student_id`),
  CONSTRAINT `education_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `Students` (`student_id`)
)
*/

}
