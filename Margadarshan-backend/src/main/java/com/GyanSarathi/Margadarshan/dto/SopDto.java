package com.GyanSarathi.Margadarshan.dto;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class SopDto {


    @NotNull
    private int sopId;

    @NotNull
    private String sopName;

    @NotNull
    private MultipartFile sopPdf;

    @NotNull
    private String sopPdfString;

    @NotNull
    private int studentId;

    private String studentName;


}
