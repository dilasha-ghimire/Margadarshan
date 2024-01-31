package com.GyanSarathi.Margadarshan.controller;

import com.GyanSarathi.Margadarshan.dto.DocumentDto;
import com.GyanSarathi.Margadarshan.dto.EducationDto;
import com.GyanSarathi.Margadarshan.dto.ProfileDto;
import com.GyanSarathi.Margadarshan.entity.Document;
import com.GyanSarathi.Margadarshan.service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class DocumentController {

    private final DocumentService documentService;

    @Autowired
    public DocumentController(DocumentService documentService) {
        this.documentService = documentService;
    }

    @PostMapping("/save-document")
    public String saveDocument(@ModelAttribute DocumentDto documentDto){
        try {
            documentService.saveDocument(documentDto);
            return "document saved";
        }catch (RuntimeException e){
            return e.getMessage();
        }
    }

    @PostMapping("/view-documents")
    public List<DocumentDto> getDocumentByStudentId(@RequestBody DocumentDto documentDto){
        return documentService.getDocumentByStudentId(documentDto.getStudentId());
    }

    @PostMapping("/update-documents")
    public String updateDocument(@ModelAttribute DocumentDto documentDto){
        try {
            documentService.updateDocument(documentDto);
            return "Data updated";
        } catch (RuntimeException e){
            return e.getMessage();
        }
    }

    @GetMapping("/get-all-documents")
    public List<DocumentDto> getAllDocuments() {
        return documentService.getAllDocuments();
    }
}


