package com.GyanSarathi.Margadarshan.dto;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProfileDto {


    @NotNull
    private int profileId;

    private MultipartFile citizenshipFront;

    private MultipartFile citizenshipBack;

    @NotNull
    private int studentId;

    private String citizenshipFrontString;

    private String citizenshipBackString;

}
