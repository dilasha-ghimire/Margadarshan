package com.GyanSarathi.Margadarshan.service;

import com.GyanSarathi.Margadarshan.dto.EducationDto;
import com.GyanSarathi.Margadarshan.dto.ExamDto;
import com.GyanSarathi.Margadarshan.dto.RoadmapDto;
import com.GyanSarathi.Margadarshan.entity.Education;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface EducationService {
    List<?> listOfEducation(EducationDto educationDto);

//    void addOnEducation(EducationDto educationDto);
//
//    List<Education> listOfEducationTwo(EducationDto educationDto);

    public String save(EducationDto educationDto);

}
