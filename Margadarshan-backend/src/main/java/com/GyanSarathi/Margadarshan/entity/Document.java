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


//    CREATE TABLE document (
//          document_id INT NOT NULL AUTO_INCREMENT,
//          document_image VARCHAR(255),
//          document_name VARCHAR(255),
//          student_id INT NOT NULL,
//          PRIMARY KEY (document_id),
//          KEY student_id (student_id),
//          CONSTRAINT fk_student_id FOREIGN KEY (student_id) REFERENCES Students (student_id)
//   );

