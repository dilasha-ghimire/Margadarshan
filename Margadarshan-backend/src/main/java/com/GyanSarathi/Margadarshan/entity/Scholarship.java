package com.GyanSarathi.Margadarshan.entity;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "scholarship")
public class Scholarship {
    @Column(name = "scholarship_id",nullable = false)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "scholarship_name", nullable = false)
    private String scholarshipName;

    @Column(name = "scholarship_organization", nullable = false)
    private String scholarshipOrganization;

    @Column(name = "scholarship_type", nullable = false)
    private String scholarshipType;

    @Column(name = "scholarship_grant", nullable = false)
    private String grant;

    @Column(name = "scholarship_deadline", nullable = false)
    private String scholarshipDeadline;

    @Column(name = "scholarship_gpa", nullable = false)
    private String scholarshipGpa;

    @Column(name = "scholarship_image", nullable = false)
    private String scholarshipImage;

      /*
    CREATE TABLE `Scholarship` (
  `scholarship_id` int NOT NULL AUTO_INCREMENT,
  `scholarship_name` varchar(255) NOT NULL,
  `scholarship_organization` varchar(255) NOT NULL,
  `scholarship_type` varchar(255) NOT NULL,
  `scholarship_grant` varchar(255) NOT NULL,
  `scholarship_deadline` varchar(255) NOT NULL,
  `scholarship_gpa` varchar(255) DEFAULT NULL,
  `scholarship_image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`scholarship_id`)
)
*/

}
