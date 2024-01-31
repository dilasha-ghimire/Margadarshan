package com.GyanSarathi.Margadarshan.Repository;

import com.GyanSarathi.Margadarshan.entity.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentRepository extends JpaRepository<Document,Integer> {

    @Query(value = "SELECT * FROM document WHERE student_id = ?1", nativeQuery = true)
    List<Document> listByStudentId(int studentId);

    Document getDocumentByDocumentId(int documentId);

    long countAllByDocumentStudentId(int studentId);

    Document findDocumentByDocumentStudentId(int profileId);
}
