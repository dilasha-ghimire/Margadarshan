package com.GyanSarathi.Margadarshan.entity;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
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
    private long grant;

    @Column(name = "scholarship_deadline", nullable = false)
    private String scholarshipDeadline;

    @Column(name = "scholarship_gpa", nullable = false)
    private int scholarshipGpa;

    @Column(name = "scholarship_image", nullable = false)
    private byte[] scholarshipImage;

}
