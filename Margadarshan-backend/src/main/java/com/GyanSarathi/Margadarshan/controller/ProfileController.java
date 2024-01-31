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
    public void saveCitizenshipImage(@ModelAttribute ProfileDto profileDto){
        profileService.saveCitizenshipImage(profileDto);
    }

    @PostMapping("/show-citizenship")
    public List<Profile> showCitizenship(@RequestBody ProfileDto profileDto){
        return profileService.findCitizenshipByStudentId(profileDto);
    }
}
