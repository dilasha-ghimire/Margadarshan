package com.GyanSarathi.Margadarshan.service.impl;

import com.GyanSarathi.Margadarshan.Repository.ProfileRepository;
import com.GyanSarathi.Margadarshan.dto.ProfileDto;
import com.GyanSarathi.Margadarshan.entity.Profile;
import com.GyanSarathi.Margadarshan.entity.Student;
import com.GyanSarathi.Margadarshan.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class ProfileServiceImpl implements ProfileService {

    private final ProfileRepository profileRepository;


    @Value("${upload.path}")
    private String uploadPath;

    @Autowired
    public ProfileServiceImpl(ProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }


    @Override
    public void saveCitizenshipImage(ProfileDto profileDto) {
        Profile profile = new Profile();
        Student student = new Student();
        student.setId(profileDto.getStudentId());
        String fileName = UUID.randomUUID().toString()+"_"+ profileDto.getCitizenship().getOriginalFilename();
        Path filePath = Paths.get(uploadPath,fileName);
        try {
            Files.copy(profileDto.getCitizenship().getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        profile.setCitizenship(fileName);
        profile.setProfileStudent(student);
        profileRepository.save(profile);
    }

    @Override
    public List<Profile> findCitizenshipByStudentId(ProfileDto profileDto) {
        return profileRepository.listByStudentId(profileDto.getStudentId());
    }

}
