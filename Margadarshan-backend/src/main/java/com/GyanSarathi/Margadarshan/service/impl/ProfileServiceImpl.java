package com.GyanSarathi.Margadarshan.service.impl;

import com.GyanSarathi.Margadarshan.Repository.ProfileRepository;
import com.GyanSarathi.Margadarshan.dto.EducationDto;
import com.GyanSarathi.Margadarshan.dto.ProfileDto;
import com.GyanSarathi.Margadarshan.entity.Education;
import com.GyanSarathi.Margadarshan.entity.Profile;
import com.GyanSarathi.Margadarshan.entity.Student;
import com.GyanSarathi.Margadarshan.service.ProfileService;
import jakarta.persistence.EntityNotFoundException;
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
        long maxRowCount = 1;
        long rowCount = profileRepository.countAllByProfileStudentId(profileDto.getStudentId());
        if(rowCount>=maxRowCount) {
            throw new RuntimeException("Citizenship was already saved");
        }
        Profile profile = new Profile();
        Student student = new Student();
        student.setId(profileDto.getStudentId());
        String fileName = UUID.randomUUID().toString()+"_"+ profileDto.getCitizenshipFront().getOriginalFilename();
        Path filePath = Paths.get(uploadPath,fileName);
        try {
            Files.copy(profileDto.getCitizenshipFront().getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        String fileName2 = UUID.randomUUID().toString()+"_"+ profileDto.getCitizenshipBack().getOriginalFilename();
        Path filePath2 = Paths.get(uploadPath,fileName2);
        try {
            Files.copy(profileDto.getCitizenshipBack().getInputStream(), filePath2, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        profile.setCitizenshipFront(fileName);
        profile.setCitizenshipBack(fileName2);
        profile.setProfileStudent(student);
        profileRepository.save(profile);
    }

    @Override
    public List<ProfileDto> getProfileByStudentId(int studentId) {
        List<Profile> profiles = profileRepository.listByStudentId(studentId);
        return mapProfileToDtos(profiles);
    }

    @Override
    public List<ProfileDto> mapProfileToDtos(List<Profile> profiles) {
        List<ProfileDto> profileDtos = new ArrayList<>();
        for (Profile profile : profiles) {
            ProfileDto profileDto = ProfileDto.builder()
                    .profileId(profile.getProfileId())
                    .citizenshipBackString(profile.getCitizenshipBack())
                    .citizenshipFrontString(profile.getCitizenshipFront())
                    .studentId(profile.getProfileStudent().getId())
                    .build();

            profileDtos.add(profileDto);
        }
        return profileDtos;
    }

    @Override
    public String updateProfile(ProfileDto profileDto) {
        Profile existingProfile = profileRepository.findProfileByProfileStudentId(profileDto.getStudentId());

        String fileName = UUID.randomUUID().toString()+"_"+ profileDto.getCitizenshipFront().getOriginalFilename();
        Path filePath = Paths.get(uploadPath,fileName);
        try {
            Files.copy(profileDto.getCitizenshipFront().getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        String fileName2 = UUID.randomUUID().toString()+"_"+ profileDto.getCitizenshipBack().getOriginalFilename();
        Path filePath2 = Paths.get(uploadPath,fileName2);
        try {
            Files.copy(profileDto.getCitizenshipBack().getInputStream(), filePath2, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        existingProfile.setCitizenshipFront(fileName);
        existingProfile.setCitizenshipBack(fileName2);

        return "Citizenship updated";
    }

   /* @Override
    public List<Profile> findCitizenshipByStudentId(ProfileDto profileDto) {
        return profileRepository.listByStudentId(profileDto.getStudentId());
    }*/

}
