package com.GyanSarathi.Margadarshan.controller;

import com.GyanSarathi.Margadarshan.dto.EducationDto;
import com.GyanSarathi.Margadarshan.entity.Education;
import com.GyanSarathi.Margadarshan.service.EducationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class EducationController {
    private final EducationService educationService;

    @Autowired
    public EducationController(EducationService educationService){
        this.educationService = educationService;
    }

    @GetMapping("/education")
    public List<Object[]> listOfEducationWithStudentName() {
        return educationService.listOfEducationWithStudentName();
    }
    @PostMapping("/education-by-id")
    public List<EducationDto> getEducationsByStudentId(@RequestBody EducationDto educationDto){
        return educationService.getEducationsByStudentId(educationDto.getStudentId());
    }
    @PostMapping("/save-education")
    public String saveEducation(@RequestBody EducationDto educationDto){
         return educationService.saveEducation(educationDto);
    }

    @PostMapping("/update-education")
    public String updateEducation(@RequestBody EducationDto educationDto){
        return educationService.updateEducation(educationDto);
    }


}
