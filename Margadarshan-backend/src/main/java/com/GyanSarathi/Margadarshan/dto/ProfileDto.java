package com.GyanSarathi.Margadarshan.dto;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ProfileDto {


    @NotNull
    private int profileId;

    @NotNull
    private MultipartFile citizenship;

    @NotNull
    private int studentId;

}
