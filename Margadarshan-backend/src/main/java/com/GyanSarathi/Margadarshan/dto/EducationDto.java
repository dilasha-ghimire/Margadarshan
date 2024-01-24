package com.GyanSarathi.Margadarshan.dto;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString

public class EducationDto {

    @NotNull
    private Integer educationId;

    @NotNull
    private String educationInstitute;

    @NotNull
    private String educationQualification;

    @NotNull
    private int studentId;

}
