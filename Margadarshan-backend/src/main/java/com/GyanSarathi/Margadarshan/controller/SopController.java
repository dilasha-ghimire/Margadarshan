package com.GyanSarathi.Margadarshan.controller;


import com.GyanSarathi.Margadarshan.dto.SopDto;
import com.GyanSarathi.Margadarshan.entity.Sop;
import com.GyanSarathi.Margadarshan.service.SopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class SopController {

    private final SopService sopService;

    @Autowired
    public SopController(SopService sopService) {
        this.sopService = sopService;
    }

    @PostMapping("/save-sop")
    public void saveSop(@ModelAttribute SopDto sopDto) throws IOException {
        sopService.saveSOP(sopDto);
    }

    @PostMapping("/retrieve-sop")
    public List<?> listOfSopByStudentId(@ModelAttribute SopDto sopDto){
        return sopService.findSopById(sopDto);
    }
}
