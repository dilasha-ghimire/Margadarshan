package com.GyanSarathi.Margadarshan.service;

import com.GyanSarathi.Margadarshan.dto.EducationDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface EducationService {
    List<?> listOfEducation(EducationDto educationDto);

    void addOnEducation(EducationDto educationDto);
}
