package com.GyanSarathi.Margadarshan.controller;

import com.GyanSarathi.Margadarshan.Repository.UniversityRepository;
import com.GyanSarathi.Margadarshan.dto.UniversityDto;
import com.GyanSarathi.Margadarshan.entity.University;
import com.GyanSarathi.Margadarshan.service.UniversityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class UniversityController {

    private final UniversityService universityService;

    @Autowired
    public UniversityController(UniversityService universityService){
        this.universityService = universityService;
    }

    @GetMapping("/universities")
    public List<University> getAllUniversityData(){
        return universityService.getAll();
    }
    @PostMapping("/save-university")
    public void saveUniversity(@RequestBody UniversityDto universityDto){
        universityService.save(universityDto);
    }
    @GetMapping("/university-by-id/{universityId}")
    public Optional<University> getUniversityById(@PathVariable("universityId") int universityId){
        return universityService.getById(universityId);
    }
    @DeleteMapping("/delete-university/{universityId}")
    public void deleteUniversity(@PathVariable("universityId") int universityId){
        universityService.deleteById(universityId);
    }
    @PostMapping("/universities-filtered")
    public ResponseEntity<List<University>> filteredUniversity(@RequestBody UniversityDto universityDto){
        List<University> universities = universityService.findByMajorOrStateOrFees(universityDto);
        return ResponseEntity.ok(universities);
    }

}
