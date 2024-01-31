package com.GyanSarathi.Margadarshan.service;

import com.GyanSarathi.Margadarshan.dto.EducationDto;
import com.GyanSarathi.Margadarshan.dto.ProfileDto;
import com.GyanSarathi.Margadarshan.entity.Education;
import com.GyanSarathi.Margadarshan.entity.Profile;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ProfileService {

    void saveCitizenshipImage(ProfileDto profileDto);

//    List<Profile> findCitizenshipByStudentId(ProfileDto profileDto);

    List<ProfileDto> getProfileByStudentId(int studentId);

    List<ProfileDto> mapProfileToDtos(List<Profile> profiles);

    String updateProfile(ProfileDto profileDto);


}
