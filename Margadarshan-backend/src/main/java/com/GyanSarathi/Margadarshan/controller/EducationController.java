package com.GyanSarathi.Margadarshan.controller;

import com.GyanSarathi.Margadarshan.dto.EducationDto;
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
    public List<?> listOfEducation(@RequestBody EducationDto educationDto){
        return educationService.listOfEducation(educationDto);
    }

    @PostMapping("/add-education")
    public void addOnEducation(@RequestBody EducationDto educationDto){
        educationService.addOnEducation(educationDto);
    }

}
