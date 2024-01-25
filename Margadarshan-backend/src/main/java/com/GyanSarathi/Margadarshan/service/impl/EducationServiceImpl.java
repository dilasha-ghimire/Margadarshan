package com.GyanSarathi.Margadarshan.service.impl;

import com.GyanSarathi.Margadarshan.Repository.EducationRepository;
import com.GyanSarathi.Margadarshan.dto.EducationDto;
import com.GyanSarathi.Margadarshan.dto.RoadmapDto;
import com.GyanSarathi.Margadarshan.entity.Education;
import com.GyanSarathi.Margadarshan.entity.Student;
import com.GyanSarathi.Margadarshan.service.EducationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EducationServiceImpl implements EducationService {

    private EducationRepository educationRepository;

    @Autowired
    public EducationServiceImpl(EducationRepository educationRepository){
        this.educationRepository = educationRepository;
    }

    @Override
    public List<Object[]> listOfEducationWithStudentName() {
        return educationRepository.listOfEducationWithStudentName();
    }

    @Override
    public List<Education> listOfEducation(int studentId) {
        List<Education> educationList = educationRepository.findListOfEducation(studentId);
        return educationList;
    }

    @Override
    public List<Education> findById(int studentId) {
        return educationRepository.findByStudentId(studentId);
    }

    @Override
    public List<EducationDto> getEducationsByStudentId(int studentId) {
        List<Education> educations = educationRepository.findByStudentId(studentId);
        return mapEducationsToDTOs(educations);
    }

    @Override
    public List<EducationDto> mapEducationsToDTOs(List<Education> educations) {
        List<EducationDto> educationDtos = new ArrayList<>();
        for (Education education : educations) {
            EducationDto educationDto = EducationDto.builder()
                    .educationId(education.getEducationId())
                    .educationInstitute(education.getEducationInstitute())
                    .educationQualification(education.getEducationQualification())
                    .studentId(education.getStudent().getId())
                    .build();

            educationDtos.add(educationDto);
        }
        return educationDtos;
    }

    @Override
    public String saveEducation(EducationDto educationDto) {
        Education education = new Education();
        Student student = new Student();
        student.setId(educationDto.getStudentId());
        education.setEducationInstitute(educationDto.getEducationInstitute());
        education.setEducationQualification(educationDto.getEducationQualification());
        education.setStudent(student);
        educationRepository.save(education);
        return "Data saved";
    }

    @Override
    public String updateEducation(EducationDto educationDto) {
        Education existingEducation = educationRepository.findByEducationId(educationDto.getEducationId());
        existingEducation.setEducationInstitute(educationDto.getEducationInstitute());
        existingEducation.setEducationQualification(educationDto.getEducationQualification());
        educationRepository.save(existingEducation);
        return "updated";
    }

}
