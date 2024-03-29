package com.GyanSarathi.Margadarshan.service.impl;

import com.GyanSarathi.Margadarshan.Repository.ScholarshipRepository;
import com.GyanSarathi.Margadarshan.dto.ScholarshipDto;
import com.GyanSarathi.Margadarshan.entity.Scholarship;
import com.GyanSarathi.Margadarshan.entity.University;
import com.GyanSarathi.Margadarshan.service.ScholarshipService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Service
public class ScholarshipServiceImpl implements ScholarshipService {
    private final ScholarshipRepository scholarshipRepository;

    @Value("${upload.path}")
    private String uploadPath;

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
        scholarship.setScholarshipGpa(scholarshipDto.getScholarshipGpa());
        String fileName = UUID.randomUUID().toString()+"_"+ scholarshipDto.getScholarshipImage().getOriginalFilename();
        Path filePath = Paths.get(uploadPath,fileName);
        try {
            Files.copy(scholarshipDto.getScholarshipImage().getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        scholarship.setScholarshipImage(fileName);
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

    @Override
    public List<Scholarship> filterByName(String scholarshipName) {
        return scholarshipRepository.findByName(scholarshipName);
    }

    @Override
    public String updateScholarship(ScholarshipDto scholarshipDto) {
        Scholarship existingScholarship = scholarshipRepository.findById(scholarshipDto.getScholarshipId())
                .orElseThrow(() -> new EntityNotFoundException("Scholarship not found"));
        existingScholarship.setScholarshipName(scholarshipDto.getScholarshipName());
        existingScholarship.setScholarshipType(scholarshipDto.getScholarshipType());
        existingScholarship.setScholarshipDeadline(scholarshipDto.getScholarshipDeadline());
        existingScholarship.setScholarshipGpa(scholarshipDto.getScholarshipGpa());
        existingScholarship.setGrant(scholarshipDto.getGrant());

        String fileName = UUID.randomUUID().toString()+"_"+ scholarshipDto.getScholarshipImage().getOriginalFilename();
        Path filePath = Paths.get(uploadPath,fileName);
        try {
            Files.copy(scholarshipDto.getScholarshipImage().getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        existingScholarship.setScholarshipImage(fileName);
        scholarshipRepository.save(existingScholarship);
        return "Scholarship updated";
    }

    @Override
    public String updateScholarshipWithoutImage(ScholarshipDto scholarshipDto) {
        Scholarship existingScholarship = scholarshipRepository.findById(scholarshipDto.getScholarshipId())
                .orElseThrow(() -> new EntityNotFoundException("Scholarship not found"));
        existingScholarship.setScholarshipName(scholarshipDto.getScholarshipName());
        existingScholarship.setScholarshipType(scholarshipDto.getScholarshipType());
        existingScholarship.setScholarshipDeadline(scholarshipDto.getScholarshipDeadline());
        existingScholarship.setScholarshipGpa(scholarshipDto.getScholarshipGpa());
        existingScholarship.setGrant(scholarshipDto.getGrant());
        scholarshipRepository.save(existingScholarship);
        return "Scholarship updated";
    }

    @Override
    public List<Scholarship> findByGrantAndTypeAndGpa(ScholarshipDto scholarshipDto) {
        //  uperbound lowerbound exixsts, scholarshipGpa empty, scholarshipType empty. ;- findByGrant
        if(scholarshipDto.getGrantLowerBound()!=null && Objects.equals(scholarshipDto.getScholarshipType(), "")) {
            List<Scholarship> scholarships = scholarshipRepository.findByGrant(scholarshipDto.getGrantUpperBound(), scholarshipDto.getGrantLowerBound());
            return scholarships;
        } else if (scholarshipDto.getGrantLowerBound()==null && Objects.equals(scholarshipDto.getScholarshipType(), "Merit-based scholarship")) {
            //find by type and gpa
            List<Scholarship> scholarships = scholarshipRepository.findByTypeAndGpa(scholarshipDto.getScholarshipType(),scholarshipDto.getScholarshipGpa());
            return scholarships;
        }
        //when its merit-based, lowerbound exixts and gpa too :- filter by type-gpa-grant
        else if (scholarshipDto.getGrantLowerBound()!=null && Objects.equals(scholarshipDto.getScholarshipType(),"Merit-based scholarship")) {
            List<Scholarship> scholarships = scholarshipRepository.findByGrantAndTypeAndGpa(scholarshipDto.getGrantUpperBound(),scholarshipDto.getGrantLowerBound(),scholarshipDto.getScholarshipType(),scholarshipDto.getScholarshipGpa());
            return scholarships;
        }
        //when type is given and grant is empty where type is other than merit based
        else if (!Objects.equals(scholarshipDto.getScholarshipType(),"Merit-based scholarship") && scholarshipDto.getGrantLowerBound()==null) {
            List<Scholarship> scholarships = scholarshipRepository.findByType(scholarshipDto.getScholarshipType());
            return scholarships;
        } else if (!Objects.equals(scholarshipDto.getScholarshipType(),"Merit-based scholarship") && scholarshipDto.getGrantLowerBound()!=null) {
            List<Scholarship> scholarships = scholarshipRepository.findByGrantAndType(scholarshipDto.getGrantUpperBound(),scholarshipDto.getGrantLowerBound(),scholarshipDto.getScholarshipType());
            return scholarships;
        }
        return null;

    }
}
