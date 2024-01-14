package com.GyanSarathi.Margadarshan.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Null;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ScholarshipDto {

    @NotNull
    private Integer scholarshipId;

    @NotNull
    private String scholarshipName;

    @NotNull
    private String scholarshipOrganization;

    @NotNull
    private String scholarshipType;

    @NotNull
    private String grant;

    @NotNull
    private String scholarshipDeadline;

    @NotNull
    private String scholarshipGpa;

    @NotNull
    private Long grantUpperBound;

    @NotNull
    private Long grantLowerBound;

    @NotNull
    private MultipartFile scholarshipImage;
}
