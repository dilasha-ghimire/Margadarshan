package com.GyanSarathi.Margadarshan.controller;

import com.GyanSarathi.Margadarshan.dto.ScholarshipDto;
import com.GyanSarathi.Margadarshan.dto.StudentDto;
import com.GyanSarathi.Margadarshan.dto.UniversityDto;
import com.GyanSarathi.Margadarshan.entity.Scholarship;
import com.GyanSarathi.Margadarshan.entity.Student;
import com.GyanSarathi.Margadarshan.entity.University;
import com.GyanSarathi.Margadarshan.service.ScholarshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    public void addScholarship(@ModelAttribute ScholarshipDto scholarshipDto){
        scholarshipService.save(scholarshipDto);
    }

    @DeleteMapping("/delete-scholarship/{scholarshipId}")
    public void deleteScholarship(@PathVariable("scholarshipId") int scholarshipId){
        scholarshipService.deleteById(scholarshipId);
    }

    @PostMapping("/scholarship-filtered")
    public List<Scholarship> filteredScholarship(@RequestBody ScholarshipDto scholarshipDto){
        System.out.println(scholarshipDto.getGrantLowerBound());
        List<Scholarship> scholarships = scholarshipService.findByGrantOrTypeOrGpa(scholarshipDto);
        return scholarships;
    }

    @PostMapping("/scholarships-by-name")
    public List<Scholarship> filteredByName(@RequestBody ScholarshipDto scholarshipDto){
        List<Scholarship> scholarships = scholarshipService.filterByName(scholarshipDto.getScholarshipName());
        return scholarships;
    }

    @PostMapping("/update-scholarship")
    public void updateScholarship(@ModelAttribute ScholarshipDto scholarshipDto){
        scholarshipService.updateScholarship(scholarshipDto);
    }

    @PostMapping("/update-scholarship-without-image")
    public void updateScholarshipWithoutImage(@RequestBody ScholarshipDto scholarshipDto){
        scholarshipService.updateScholarshipWithoutImage(scholarshipDto);
    }

}
