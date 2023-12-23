package com.GyanSarathi.Margadarshan.controller;

import com.GyanSarathi.Margadarshan.dto.UniversityDto;
import com.GyanSarathi.Margadarshan.entity.University;
import com.GyanSarathi.Margadarshan.service.UniversityService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/universities")
public class UniversityController {

    private UniversityService universityService;

    @GetMapping("/universities")
    public List<University> getAllUniversityData(){
        return universityService.getAll();
    }
    @PostMapping("/save-university")
    public void saveUniversity(@RequestBody UniversityDto universityDto){
        universityService.save(universityDto);
    }
    @GetMapping("/university-by-id/{universityId}")
    public Optional<University> getUniversityById(@PathVariable("universityId") Integer universityId){
        return universityService.getById(universityId);
    }
    @DeleteMapping("/delete-university/{universityId}")
    public void deleteUniversity(@PathVariable("universityId") Integer universityId){
        universityService.deleteById(universityId);
    }
}
