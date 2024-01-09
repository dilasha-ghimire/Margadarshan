package com.GyanSarathi.Margadarshan.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity

@Table(name = "Universities")
public class University{

    @Column(name = "university_id", nullable = false)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "university_name", nullable = false)
    private String name;

    @Column(name = "university_state", nullable = false)
    private String state;

    @Column(name = "university_city", nullable = false)
    private String city;

    @Column(name = "university_major", nullable = false)
    private String major;

    @Column(name = "university_fees", nullable = false)
    private long fees;

    @Column(name = "university_length", nullable = false)
    private int length;

    @Column(name = "university_image",nullable = false)
    private String universityImage;



}
