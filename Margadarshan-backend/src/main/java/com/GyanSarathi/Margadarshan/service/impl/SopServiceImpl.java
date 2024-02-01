package com.GyanSarathi.Margadarshan.service.impl;

import com.GyanSarathi.Margadarshan.Repository.SopRepository;
import com.GyanSarathi.Margadarshan.dto.DocumentDto;
import com.GyanSarathi.Margadarshan.dto.SopDto;
import com.GyanSarathi.Margadarshan.dto.StudentDto;
import com.GyanSarathi.Margadarshan.entity.Document;
import com.GyanSarathi.Margadarshan.entity.Sop;
import com.GyanSarathi.Margadarshan.entity.Student;
import com.GyanSarathi.Margadarshan.service.SopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Service
public class SopServiceImpl implements SopService {

    private final SopRepository sopRepository;

    @Value("${upload.path}")
    private String uploadPath;

    @Autowired
    public SopServiceImpl(SopRepository sopRepository) {
        this.sopRepository = sopRepository;
    }

    @Override
    public Sop saveSOP(SopDto sopDto) throws IOException {
        Sop sop = new Sop();
        Student student = new Student();
        sop.setSopName(sopDto.getSopName());
        student.setId(sopDto.getStudentId());

        String fileName = UUID.randomUUID().toString()+"_"+ sopDto.getSopPdf().getOriginalFilename();
        Path filePath = Paths.get(uploadPath,fileName);
        try {
            Files.copy(sopDto.getSopPdf().getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        sop.setSopPdf(fileName);
        sop.setStudent(student);
        return sopRepository.save(sop) ;
    }

    @Override
    public List<SopDto> getSopByStudentId(SopDto sopDto) {
        List<Sop> students = sopRepository.findAllByStudentId(sopDto.getStudentId());
        return mapSopToDtos(students);
    }

    @Override
    public List<SopDto> mapSopToDtos(List<Sop> sops) {
        List<SopDto> sopDtos = new ArrayList<>();
        for (Sop sop : sops) {
            SopDto sopDto = SopDto.builder()
                    .sopName(sop.getSopName())
                    .sopPdfString(sop.getSopPdf())
                    .build();
            sopDtos.add(sopDto);
        }
        return sopDtos;
    }

    @Override
    public String deleteBySopId(SopDto sopDto) {
        sopRepository.deleteAllBySopId(sopDto.getSopId());
        return "sop pdf deleted";
    }


}
