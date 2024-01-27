package com.GyanSarathi.Margadarshan.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SopDto {


    @NotNull
    private int sopId;

    @NotNull
    private String sopName;

    @NotNull
    private MultipartFile sopPdf;

    @NotNull
    private int studentId;


}
