package com.GyanSarathi.Margadarshan.dto;
import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Null;
import lombok.*;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UniversityDto {

    @NotNull
    private Integer universityId;

    @NotNull
    private String universityName;

    @NotNull
    private String universityState;

    @NotNull
    private String universityCity;

    @NotNull
    private String universityMajor;

    @NotNull
    private long universityFees;

    @NotNull
    private long universityFeesUpperBound;

    @NotNull
    private long universityFeesLowerBound;

    @NotNull
    private int universityLength;

    @NotNull
    private MultipartFile universityImage;

   

}
