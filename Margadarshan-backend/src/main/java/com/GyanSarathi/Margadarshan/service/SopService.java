package com.GyanSarathi.Margadarshan.service;


import com.GyanSarathi.Margadarshan.dto.SopDto;
import com.GyanSarathi.Margadarshan.entity.Sop;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public interface SopService {
    Sop saveSOP(SopDto sopDto) throws IOException;

    List<Sop> findSopById(SopDto sopDto);
}
