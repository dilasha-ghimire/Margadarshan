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

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "student_id")
    private Student student;

}
