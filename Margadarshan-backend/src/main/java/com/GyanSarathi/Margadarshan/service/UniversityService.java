package com.GyanSarathi.Margadarshan.service;

import com.GyanSarathi.Margadarshan.dto.RoadmapDto;
import com.GyanSarathi.Margadarshan.dto.UniversityDto;
import com.GyanSarathi.Margadarshan.entity.University;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
public interface UniversityService {

    String saveWithImage(UniversityDto universityDto);

    List<University> getAll();

    Optional<University> getById(int universityId);

    void deleteById(int universityId);

    List<University> findByMajorOrStateOrFees(UniversityDto universityDto);

    List<University> findByUniversityName(String universityName);

    List<?> listAllMajors();

    String updateUniversity(UniversityDto universityDto);

    String updateUniversityWithoutImage(UniversityDto universityDto);

    List<University> filterForRoadmap(RoadmapDto roadmapDto);

}
