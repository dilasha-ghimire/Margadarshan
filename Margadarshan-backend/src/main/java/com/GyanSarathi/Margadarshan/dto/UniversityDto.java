package com.GyanSarathi.Margadarshan.dto;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Null;
import lombok.*;
import org.springframework.stereotype.Component;


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
    private int universityLength;

    @NotNull
    private byte[] universityImage;

}
