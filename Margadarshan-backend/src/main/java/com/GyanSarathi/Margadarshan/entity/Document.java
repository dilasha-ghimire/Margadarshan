package com.GyanSarathi.Margadarshan.entity;

import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
@Setter
@Entity
@Table(name = "document")
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "document_id")
    private int documentId;

    @Column(name = "document_image")
    private String documentImage;

    @Column(name = "document_name")
    private String documentName;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student documentStudent;
}
