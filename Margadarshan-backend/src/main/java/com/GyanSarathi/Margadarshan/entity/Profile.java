package com.GyanSarathi.Margadarshan.entity;

import jakarta.persistence.*;
import lombok.*;


@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
@Setter
@Entity
@Table(name = "profile")
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "profile_id")
    private int profileId;

    @Column(name = "citizenship", nullable = false)
    private String citizenship;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;


}
