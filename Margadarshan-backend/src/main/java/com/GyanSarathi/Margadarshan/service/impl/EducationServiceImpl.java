package com.GyanSarathi.Margadarshan.service.impl;

import com.GyanSarathi.Margadarshan.Repository.EducationRepository;
import com.GyanSarathi.Margadarshan.dto.EducationDto;
import com.GyanSarathi.Margadarshan.entity.Education;
import com.GyanSarathi.Margadarshan.service.EducationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EducationServiceImpl implements EducationService {

    private EducationRepository educationRepository;

    @Autowired
    public EducationServiceImpl(EducationRepository educationRepository){
        this.educationRepository = educationRepository;
    }


    @Override
    public List<?> listOfEducation(EducationDto educationDto) {
        return educationRepository.listOfEducation(educationDto.getStudentId());
    }

    @Override
    public void addOnEducation(EducationDto educationDto) {
        educationRepository.educationAddOn(educationDto.getEducationInstitute(),educationDto.getEducationQualification(),educationDto.getStudentId());
    }
}
