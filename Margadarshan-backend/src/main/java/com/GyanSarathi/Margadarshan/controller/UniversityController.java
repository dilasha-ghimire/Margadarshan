package com.GyanSarathi.Margadarshan.controller;

import com.GyanSarathi.Margadarshan.Repository.UniversityRepository;
import com.GyanSarathi.Margadarshan.dto.UniversityDto;
import com.GyanSarathi.Margadarshan.entity.University;
import com.GyanSarathi.Margadarshan.service.UniversityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class UniversityController{

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
    public void saveUniversity(@ModelAttribute UniversityDto universityDto){
        universityService.saveWithImage(universityDto);
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

    @PostMapping("/university-by-name")
    public ResponseEntity<List<University>> findUniversityByName(@RequestBody UniversityDto universityDto){
        List<University> universities = universityService.findByUniversityName(universityDto.getUniversityName());
        return ResponseEntity.ok(universities);
    }

    @GetMapping("/universities-major")
    public List<?> listAllMajors(){
        List<?> majors = universityService.listAllMajors();
        return majors;
    }

    @PostMapping("/update-university")
    public void updateUniversity(@ModelAttribute UniversityDto universityDto){
        universityService.updateUniversity(universityDto);
    }

    @PostMapping("/update-university-without-image")
    public void updateUniversityWithoutImage(@RequestBody UniversityDto universityDto){
        universityService.updateUniversityWithoutImage(universityDto);
    }




}
