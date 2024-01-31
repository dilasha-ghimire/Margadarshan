package com.GyanSarathi.Margadarshan.controller;

import com.GyanSarathi.Margadarshan.dto.ProfileDto;
import com.GyanSarathi.Margadarshan.entity.Profile;
import com.GyanSarathi.Margadarshan.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class ProfileController {
    private final ProfileService profileService;

    @Autowired
    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }


    @PostMapping("/save-citizenship")
    public String saveCitizenshipImage(@ModelAttribute ProfileDto profileDto){
        try {
            profileService.saveCitizenshipImage(profileDto);
            return "Data saved";
        } catch (RuntimeException e){
            return e.getMessage();
        }
    }

    //send studentId here
    @PostMapping("/update-citizenship")
    public String updateCitizenshipImage(@ModelAttribute ProfileDto profileDto){
        try {
            profileService.updateProfile(profileDto);
            return "Data updated";
        } catch (RuntimeException e){
            return e.getMessage();
        }
    }

    @PostMapping("/show-citizenship")
    public List<ProfileDto> showCitizenship(@RequestBody ProfileDto profileDto){
        return profileService.getProfileByStudentId(profileDto.getStudentId());
    }
}
