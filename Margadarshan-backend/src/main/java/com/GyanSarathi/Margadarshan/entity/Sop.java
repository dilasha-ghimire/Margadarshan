package com.GyanSarathi.Margadarshan.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NotNull
@Setter
@NoArgsConstructor

@Table(name = "SOP")
public class Sop{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int sopId;

    @Column(name = "sop_name",nullable = false)
    private String sopName;

    @Column(name = "sop_pdf")
    private String sopPdf;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

}
