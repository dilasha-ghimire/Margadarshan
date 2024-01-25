package com.GyanSarathi.Margadarshan.service.impl;

import com.GyanSarathi.Margadarshan.Repository.UniversityRepository;
import com.GyanSarathi.Margadarshan.dto.RoadmapDto;
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
import java.util.Objects;
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
        university.setAverageBachelorsGpa(universityDto.getAverageBachelorsGpa());
        university.setAverageMastersGpa(universityDto.getAverageMastersGpa());
        university.setAverageIeltsScore(universityDto.getAverageIeltsScore());
        university.setAverageToeflScore(universityDto.getAverageToeflScore());
        university.setAverageGreScore(universityDto.getAverageGreScore());
        university.setAverageSatScore(universityDto.getAverageSatScore());
        university.setRequiredEssays(universityDto.isRequiredEssays());

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
        existingUniversity.setAverageBachelorsGpa(universityDto.getAverageBachelorsGpa());
        existingUniversity.setAverageMastersGpa(universityDto.getAverageMastersGpa());
        existingUniversity.setAverageIeltsScore(universityDto.getAverageIeltsScore());
        existingUniversity.setAverageToeflScore(universityDto.getAverageToeflScore());
        existingUniversity.setAverageGreScore(universityDto.getAverageGreScore());
        existingUniversity.setAverageSatScore(universityDto.getAverageSatScore());
        existingUniversity.setRequiredEssays(universityDto.isRequiredEssays());
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
        existingUniversity.setAverageBachelorsGpa(universityDto.getAverageBachelorsGpa());
        existingUniversity.setAverageMastersGpa(universityDto.getAverageMastersGpa());
        existingUniversity.setAverageIeltsScore(universityDto.getAverageIeltsScore());
        existingUniversity.setAverageToeflScore(universityDto.getAverageToeflScore());
        existingUniversity.setAverageGreScore(universityDto.getAverageGreScore());
        existingUniversity.setAverageSatScore(universityDto.getAverageSatScore());
        existingUniversity.setRequiredEssays(universityDto.isRequiredEssays());
        universityRepository.save(existingUniversity);
        return "University updated";
    }

    @Override
    public University filterForRoadmap(RoadmapDto roadmapDto) {
<<<<<<< HEAD
=======

>>>>>>> 8da0d4946d6116d95f14a8b90e23f9b629e4a45b
        if(Objects.equals(roadmapDto.getDegreeSelection(), "masters") && Objects.equals(roadmapDto.getLanguageTestSelection(),"TOEFL")){
            University MastersUniversityWithToefl =
                    universityRepository.filterForRoadmapTwo
                            (roadmapDto.getUniversityName(),Double.parseDouble(roadmapDto.getAverageMastersGpa()),0,Integer.parseInt(roadmapDto.getToeflScore()),
                                    Integer.parseInt(roadmapDto.getGreScore()),0);
            return MastersUniversityWithToefl;
        } else if (Objects.equals(roadmapDto.getDegreeSelection(), "masters") && Objects.equals(roadmapDto.getLanguageTestSelection(),"IELTS")) {
            University MastersUniversityWithIelts =
                    universityRepository.filterForRoadmapTwo
                            (roadmapDto.getUniversityName(),Double.parseDouble(roadmapDto.getAverageMastersGpa()),Integer.parseInt(roadmapDto.getIeltsScore()),0,
                                    Integer.parseInt(roadmapDto.getGreScore()),0);
            return MastersUniversityWithIelts;
        }
        else if (Objects.equals(roadmapDto.getDegreeSelection(), "bachelors") && Objects.equals(roadmapDto.getLanguageTestSelection(),"IELTS")) {
            University BachelorsUniversityWithIelts =
                    universityRepository.filterForRoadmap
                            (roadmapDto.getUniversityName(),Double.parseDouble(roadmapDto.getAverageBachelorsGpa()), Integer.parseInt(roadmapDto.getIeltsScore()), 0,
                                    0, Integer.parseInt(roadmapDto.getSatScore()));
            return BachelorsUniversityWithIelts;
        }
        else if (Objects.equals(roadmapDto.getDegreeSelection(), "bachelors") && Objects.equals(roadmapDto.getLanguageTestSelection(),"TOEFL")) {
            University BachelorsUniversityWithToefl =
                    universityRepository.filterForRoadmap
                            (roadmapDto.getUniversityName(),Double.parseDouble(roadmapDto.getAverageBachelorsGpa()), 0, Integer.parseInt(roadmapDto.getToeflScore()),

                                    0, Integer.parseInt(roadmapDto.getSatScore()));
            return BachelorsUniversityWithToefl;
        }

        return null;
    }

    @Override
    public List<?> listAllUniversities() {
        return universityRepository.listAllUniversities();
    }


}
