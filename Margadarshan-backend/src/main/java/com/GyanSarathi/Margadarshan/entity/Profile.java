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

    @Column(name = "citizenship_front", nullable = false)
    private String citizenshipFront;

    @Column(name = "citizenship_back", nullable = false)
    private String citizenshipBack;

    @OneToOne
    @JoinColumn(name = "student_id")
    private Student profileStudent;


}
