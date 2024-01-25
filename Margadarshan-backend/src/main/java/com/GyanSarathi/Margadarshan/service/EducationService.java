package com.GyanSarathi.Margadarshan.service;

import com.GyanSarathi.Margadarshan.dto.EducationDto;
import com.GyanSarathi.Margadarshan.dto.ExamDto;
import com.GyanSarathi.Margadarshan.dto.RoadmapDto;
import com.GyanSarathi.Margadarshan.entity.Education;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface EducationService {

    List<Object[]> listOfEducationWithStudentName();

    List<Education> listOfEducation(int studentId);

    List<Education> findById(int studentId);

    List<EducationDto> getEducationsByStudentId(int studentId);

    List<EducationDto> mapEducationsToDTOs(List<Education> educations);

    String saveEducation(EducationDto educationDto);

    String updateEducation(EducationDto educationDto);

}
