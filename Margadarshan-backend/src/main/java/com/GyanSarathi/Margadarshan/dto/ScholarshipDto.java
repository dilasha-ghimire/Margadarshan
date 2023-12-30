package com.GyanSarathi.Margadarshan.dto;

import jakarta.validation.constraints.NotNull;
import lombok.*;

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
    private long grant;

    @NotNull
    private String scholarshipDeadline;
}
