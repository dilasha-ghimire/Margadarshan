package com.GyanSarathi.Margadarshan.service.impl;

import com.GyanSarathi.Margadarshan.Repository.UniversityRepository;
import com.GyanSarathi.Margadarshan.dto.UniversityDto;
import com.GyanSarathi.Margadarshan.entity.University;
import com.GyanSarathi.Margadarshan.service.UniversityService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UniversityServiceImpl implements UniversityService{

    @Autowired
    private final UniversityRepository universityRepository;

    @Value("${upload.path}")
    private String uploadPath;

    @Override
    public String saveWithImage(UniversityDto universityDto) {
        University university = new University();
        if(universityDto.getUniversityId()!=null){
            university = universityRepository.findById(universityDto.getUniversityId())
                    .orElseThrow(()-> new NullPointerException("data not found"));
        }
        university.setName(universityDto.getUniversityName());
        university.setState(universityDto.getUniversityState());
        university.setCity(universityDto.getUniversityCity());
        university.setMajor(universityDto.getUniversityMajor());
        university.setFees(universityDto.getUniversityFees());
        university.setName(universityDto.getUniversityName());
        university.setLength(universityDto.getUniversityLength());

        String fileName = UUID.randomUUID().toString()+"_"+ universityDto.getUniversityImage().getOriginalFilename();
        Path filePath = Paths.get(uploadPath,fileName);
        try {
            Files.copy(universityDto.getUniversityImage().getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        university.setUniversityImage(fileName);
        universityRepository.save(university);
        return "Data saved";
    }

    @Override
    public List<University> getAll() {
        return universityRepository.findAll();
    }
    @Override
    public Optional<University> getById(int universityId) {
        return universityRepository.findById(universityId);
    }
    @Override
    public void deleteById(int universityId) {
        universityRepository.deleteById(universityId);
    }

    @Override
    public List<University> findByMajorOrStateOrFees(UniversityDto universityDto) {
        return universityRepository.findByMajorOrFeesOrState
                (universityDto.getUniversityFeesUpperBound(),universityDto.getUniversityFeesLowerBound(),
                        universityDto.getUniversityMajor(),universityDto.getUniversityState());
    }

    @Override
    public List<University> findByUniversityName(String universityName) {
        return universityRepository.findUniversitiesByName(universityName);
    }

    @Override
    public List<?> listAllMajors() {
        return universityRepository.listAllMajors();
    }

    @Override
    public String  updateUniversity(UniversityDto universityDto) {
        University existingUniversity = universityRepository.findById(universityDto.getUniversityId())
                .orElseThrow(() -> new EntityNotFoundException("University not found"));
        existingUniversity.setName(universityDto.getUniversityName());
        existingUniversity.setState(universityDto.getUniversityState());
        existingUniversity.setCity(universityDto.getUniversityCity());
        existingUniversity.setMajor(universityDto.getUniversityMajor());
        existingUniversity.setFees(universityDto.getUniversityFees());
        existingUniversity.setLength(universityDto.getUniversityLength());
        String fileName = UUID.randomUUID().toString()+"_"+ universityDto.getUniversityImage().getOriginalFilename();
        Path filePath = Paths.get(uploadPath,fileName);
        try {
            Files.copy(universityDto.getUniversityImage().getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        existingUniversity.setUniversityImage(fileName);
        universityRepository.save(existingUniversity);
        return "University saved";
    }

    @Override
    public String updateUniversityWithoutImage(UniversityDto universityDto) {
        University existingUniversity = universityRepository.findById(universityDto.getUniversityId())
                .orElseThrow(() -> new EntityNotFoundException("University not found"));
        existingUniversity.setName(universityDto.getUniversityName());
        existingUniversity.setState(universityDto.getUniversityState());
        existingUniversity.setCity(universityDto.getUniversityCity());
        existingUniversity.setMajor(universityDto.getUniversityMajor());
        existingUniversity.setFees(universityDto.getUniversityFees());
        existingUniversity.setLength(universityDto.getUniversityLength());
        universityRepository.save(existingUniversity);
        return "University updated";
    }


}
