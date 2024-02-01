package com.GyanSarathi.Margadarshan.service;


import com.GyanSarathi.Margadarshan.dto.DocumentDto;
import com.GyanSarathi.Margadarshan.dto.SopDto;
import com.GyanSarathi.Margadarshan.dto.StudentDto;
import com.GyanSarathi.Margadarshan.entity.Document;
import com.GyanSarathi.Margadarshan.entity.Sop;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public interface SopService {
    Sop saveSOP(SopDto sopDto) throws IOException;

    List<SopDto> getSopByStudentId(SopDto sopDto);

    List<SopDto> mapSopToDtos(List<Sop> documents) ;

    String deleteBySopId(SopDto sopDto);

}
