package com.GyanSarathi.Margadarshan.service.impl;

import com.GyanSarathi.Margadarshan.Repository.ScholarshipRepository;
import com.GyanSarathi.Margadarshan.dto.ScholarshipDto;
import com.GyanSarathi.Margadarshan.entity.Scholarship;
import com.GyanSarathi.Margadarshan.entity.University;
import com.GyanSarathi.Margadarshan.service.ScholarshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ScholarshipServiceImpl implements ScholarshipService {
    private final ScholarshipRepository scholarshipRepository;

    @Autowired
    public ScholarshipServiceImpl(ScholarshipRepository scholarshipRepository) {
        this.scholarshipRepository = scholarshipRepository;
    }

    @Override
    public String save(ScholarshipDto scholarshipDto) {
        Scholarship scholarship = new Scholarship();
        if(scholarshipDto.getScholarshipId()!=null){
            scholarship = scholarshipRepository.findById(scholarshipDto.getScholarshipId())
                    .orElseThrow(()-> new NullPointerException("data not found"));
        }
        scholarship.setScholarshipName(scholarshipDto.getScholarshipName());
        scholarship.setScholarshipOrganization(scholarshipDto.getScholarshipOrganization());
        scholarship.setScholarshipType(scholarshipDto.getScholarshipType());
        scholarship.setGrant(scholarshipDto.getGrant());
        scholarship.setScholarshipDeadline(scholarshipDto.getScholarshipDeadline());

        scholarshipRepository.save(scholarship);
        return "Data saved";
    }

    @Override
    public List<Scholarship> getAll() {
        return scholarshipRepository.findAll();
    }
    @Override
    public Optional<Scholarship> getById(int scholarshipId) {
        return scholarshipRepository.findById(scholarshipId);
    }
    @Override
    public void deleteById(int scholarshipId) {
        scholarshipRepository.deleteById(scholarshipId);
    }
}
