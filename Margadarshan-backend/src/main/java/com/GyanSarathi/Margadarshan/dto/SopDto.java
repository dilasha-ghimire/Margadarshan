package com.GyanSarathi.Margadarshan.dto;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SopDto {


    private int sopId;

    private String sopName;

    private MultipartFile sopPdf;

    private int studentId;


}
