package com.GyanSarathi.Margadarshan.controller;


import com.GyanSarathi.Margadarshan.dto.SopDto;
import com.GyanSarathi.Margadarshan.entity.Sop;
import com.GyanSarathi.Margadarshan.service.SopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
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
    public Sop saveSop(@ModelAttribute SopDto sopDto){
        try {
            return sopService.saveSOP(sopDto);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @PostMapping("/retrieve-sop")
    public ResponseEntity<List<Sop>> listOfSopByStudentId(@ModelAttribute SopDto sopDto){
        return ResponseEntity.ok(sopService.findSopById(sopDto));
    }
}
