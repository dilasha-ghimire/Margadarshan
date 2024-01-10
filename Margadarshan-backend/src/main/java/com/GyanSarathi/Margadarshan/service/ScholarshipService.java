package com.GyanSarathi.Margadarshan.service;

import com.GyanSarathi.Margadarshan.dto.ScholarshipDto;
import com.GyanSarathi.Margadarshan.dto.UniversityDto;
import com.GyanSarathi.Margadarshan.entity.Scholarship;
import com.GyanSarathi.Margadarshan.entity.University;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface ScholarshipService {
    String save(ScholarshipDto scholarshipDto);

    List<Scholarship> getAll();

    Optional<Scholarship> getById(int scholarshipId);

    void deleteById(int scholarshipId);

    List<Scholarship> findByGrantOrTypeOrGpa(ScholarshipDto scholarshipDto);

    List<Scholarship> filterByName(String scholarshipName);
}
