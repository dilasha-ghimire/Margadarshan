package com.GyanSarathi.Margadarshan.service.impl;

import com.GyanSarathi.Margadarshan.Repository.SopRepository;
import com.GyanSarathi.Margadarshan.dto.SopDto;
import com.GyanSarathi.Margadarshan.entity.Sop;
import com.GyanSarathi.Margadarshan.service.SopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class SopServiceImpl implements SopService {

    private final SopRepository sopRepository;

    @Autowired
    public SopServiceImpl(SopRepository sopRepository) {
        this.sopRepository = sopRepository;
    }

    @Override
    public Sop saveSOP(SopDto sopDto) throws IOException {
        Sop sop = new Sop();
        sop.setSopName(sopDto.getSopName());
        sop.setSopPdf(sopDto.getSopPdf().getBytes());
        sop.setStudentId(sopDto.getStudentId());
        return sopRepository.save(sop) ;
    }

    @Override
    public List<Sop> findSopById(SopDto sopDto) {
        return sopRepository.findAllByStudentId(sopDto.getStudentId());
    }
}
