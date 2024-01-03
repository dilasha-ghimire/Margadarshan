package com.GyanSarathi.Margadarshan.service.impl;

import com.GyanSarathi.Margadarshan.Repository.UniversityRepository;
import com.GyanSarathi.Margadarshan.dto.UniversityDto;
import com.GyanSarathi.Margadarshan.entity.University;
import com.GyanSarathi.Margadarshan.service.UniversityService;
import jakarta.validation.constraints.Null;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UniversityServiceImpl implements UniversityService{

    private final UniversityRepository universityRepository;

    @Override
    public String save(UniversityDto universityDto) {
        University university = new University();
        if(universityDto.getUniversityId()!=null){
            university = universityRepository.findById(universityDto.getUniversityId())
                    .orElseThrow(()-> new NullPointerException("data not found"));
        }
        university.setName(universityDto.getUniversityName());
        university.setState(universityDto.getUniversityState());
        university.setCity(universityDto.getUniversityCity());
        university.setMajor(universityDto.getUniversityMajor());
        university.setFees(universityDto.getUniversityFees());
        university.setName(universityDto.getUniversityName());
        university.setLength(universityDto.getUniversityLength());
        university.setImage(universityDto.getUniversityImage());
        universityRepository.save(university);
        return "Data saved";
    }

    @Override
    public List<University> getAll() {
        return universityRepository.findAll();
    }
    @Override
    public Optional<University> getById(int universityId) {
        return universityRepository.findById(universityId);
    }
    @Override
    public void deleteById(int universityId) {
        universityRepository.deleteById(universityId);
    }

    @Override
    public List<University> findByMajorOrStateOrFees(UniversityDto universityDto) {
        return universityRepository.findByMajorOrFeesOrState(universityDto.getUniversityMajor(),universityDto.getUniversityState(),universityDto.getUniversityFees());
    }
}
