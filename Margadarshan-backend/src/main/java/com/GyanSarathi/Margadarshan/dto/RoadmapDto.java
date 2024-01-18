package com.GyanSarathi.Margadarshan.dto;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class RoadmapDto {

    @NotNull
    private String degreeSelection;

    @NotNull
    private String languageTestSelection;

    @NotNull
    private String gpa;

    private String ieltsScore;

    private String toeflScore;

    private String greScore;

    private String satScore;



}
