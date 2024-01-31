package com.GyanSarathi.Margadarshan.service;

import com.GyanSarathi.Margadarshan.dto.DocumentDto;
import com.GyanSarathi.Margadarshan.dto.ProfileDto;
import com.GyanSarathi.Margadarshan.entity.Document;
import com.GyanSarathi.Margadarshan.entity.Profile;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface DocumentService {
    void saveDocument(DocumentDto documentDto);

    List<DocumentDto> getDocumentByStudentId(int studentId);

    List<DocumentDto> mapDocumentToDtos(List<Document> documents);

    String updateDocument(DocumentDto documentDto);

    List<DocumentDto> getAllDocuments();

    List<DocumentDto> mapDocumentsToDtosTwo(List<Document> documents);

}
