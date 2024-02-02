package com.GyanSarathi.Margadarshan.service.impl;

import com.GyanSarathi.Margadarshan.Repository.DocumentRepository;
import com.GyanSarathi.Margadarshan.dto.DocumentDto;
import com.GyanSarathi.Margadarshan.dto.ProfileDto;
import com.GyanSarathi.Margadarshan.entity.Document;
import com.GyanSarathi.Margadarshan.entity.Education;
import com.GyanSarathi.Margadarshan.entity.Profile;
import com.GyanSarathi.Margadarshan.entity.Student;
import com.GyanSarathi.Margadarshan.service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class DocumentServiceImpl implements DocumentService {
    private final DocumentRepository documentRepository;


    @Value("${upload.path}")
    private String uploadPath;

    @Autowired
    public DocumentServiceImpl(DocumentRepository documentRepository) {
        this.documentRepository = documentRepository;
    }


    @Override
    public void saveDocument(DocumentDto documentDto) {
        long maxRowCount = 5;
        long rowCount = documentRepository.countAllByDocumentStudentId(documentDto.getStudentId());
        if(rowCount>=maxRowCount) {
            throw new RuntimeException("Documents fulfilled");
        }
        Document document = new Document();
        Student student = new Student();
        student.setId(documentDto.getStudentId());
        String fileName = UUID.randomUUID().toString()+"_"+ documentDto.getDocumentImage().getOriginalFilename();
        Path filePath = Paths.get(uploadPath,fileName);
        try {
            Files.copy(documentDto.getDocumentImage().getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        document.setDocumentImage(fileName);
        document.setDocumentName(documentDto.getDocumentName());
        document.setDocumentStudent(student);
        documentRepository.save(document);
    }

    @Override
    public List<DocumentDto> getDocumentByStudentId(int studentId) {
        List<Document> documents = documentRepository.listByStudentId(studentId);
        return mapDocumentToDtos(documents);
    }

    @Override
    public List<DocumentDto> mapDocumentToDtos(List<Document> documents) {
        List<DocumentDto> documentDtos = new ArrayList<>();
        for (Document document : documents) {
            DocumentDto documentDto = DocumentDto.builder()
                    .documentId(document.getDocumentId())
                    .documentImageString(document.getDocumentImage())
                    .documentName(document.getDocumentName())
                    .studentId(document.getDocumentStudent().getId())
                    .build();

            documentDtos.add(documentDto);
        }
        return documentDtos;
    }

    @Override
    public String updateDocument(DocumentDto documentDto) {
        Document existingDocument = documentRepository.getDocumentByDocumentId(documentDto.getDocumentId());
        Student student = new Student();

        String fileName = UUID.randomUUID().toString()+"_"+ documentDto.getDocumentImage().getOriginalFilename();
        Path filePath = Paths.get(uploadPath,fileName);
        try {
            Files.copy(documentDto.getDocumentImage().getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        existingDocument.setDocumentId(documentDto.getDocumentId());
        existingDocument.setDocumentImage(fileName);
        student.setId(documentDto.getStudentId());
        existingDocument.setDocumentName(documentDto.getDocumentName());
        existingDocument.setDocumentStudent(student);
        documentRepository.save(existingDocument);
        return "updated";
    }

    public List<DocumentDto> getAllDocuments() {
        List<Document> documents = documentRepository.findAll();
        return mapDocumentsToDtosTwo(documents);
    }

    public List<DocumentDto> mapDocumentsToDtosTwo(List<Document> documents) {
        List<DocumentDto> documentDtos = new ArrayList<>();

        for (Document document : documents) {
            DocumentDto documentDto = DocumentDto.builder()
                    .documentId(document.getDocumentId())
                    .documentName(document.getDocumentName())
                    .studentId(document.getDocumentStudent().getId())
                    .studentName(document.getDocumentStudent().getFullName())
                    .documentImageString(document.getDocumentImage())
                    .build();
            documentDtos.add(documentDto);
        }
        return documentDtos;
    }
}
