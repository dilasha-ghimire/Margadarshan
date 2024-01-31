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
<<<<<<< HEAD
    private Student profileStudent;
=======
    private Student student;
>>>>>>> d915e6f6301105017a2fa7f17e6eabc9d4cf192f


}
