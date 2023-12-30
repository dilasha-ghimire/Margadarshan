package com.GyanSarathi.Margadarshan.controller;

import com.GyanSarathi.Margadarshan.dto.ScholarshipDto;
import com.GyanSarathi.Margadarshan.dto.StudentDto;
import com.GyanSarathi.Margadarshan.entity.Scholarship;
import com.GyanSarathi.Margadarshan.entity.Student;
import com.GyanSarathi.Margadarshan.service.ScholarshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@CrossOrigin
@RequestMapping("/api")
public class ScholarshipController{
    private final ScholarshipService scholarshipService;

    @Autowired
    public ScholarshipController(ScholarshipService scholarshipService) {
        this.scholarshipService = scholarshipService;
    }

    @GetMapping("/scholarships")
    public List<Scholarship> findAll(){
        return scholarshipService.getAll();
    }

    @GetMapping("/scholarship-by-id/{scholarshipId}")
    public Optional<Scholarship> getScholarship(@PathVariable int scholarshipId){
        Optional<Scholarship> scholarship = scholarshipService.getById(scholarshipId);
        if(scholarship.isEmpty()){
            throw new RuntimeException("Scholarship data not found - " + scholarshipId);
        }
        return scholarship;
    }
    @PostMapping("/save-scholarship")
    public void addScholarship(@RequestBody ScholarshipDto scholarshipDto){
        scholarshipService.save(scholarshipDto);
    }


    @DeleteMapping("/delete-scholarship/{scholarshipId}")
    public void deleteScholarship(@PathVariable("scholarshipId") int scholarshipId){
        scholarshipService.deleteById(scholarshipId);
    }

}
