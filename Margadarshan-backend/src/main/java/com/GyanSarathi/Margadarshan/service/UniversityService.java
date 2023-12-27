package com.GyanSarathi.Margadarshan.service;

import com.GyanSarathi.Margadarshan.dto.UniversityDto;
import com.GyanSarathi.Margadarshan.entity.University;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface UniversityService {

    String save(UniversityDto universityDto);

    List<University> getAll();

    Optional<University> getById(int universityId);

    void deleteById(int universityId);


}
