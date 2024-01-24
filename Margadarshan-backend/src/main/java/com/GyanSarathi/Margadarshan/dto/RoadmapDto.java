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
    private String universityName;

    @NotNull
    private String degreeSelection;

    @NotNull
    private String languageTestSelection;


    private String averageBachelorsGpa;


    private String averageMastersGpa;

    private String ieltsScore;

    private String toeflScore;

    private String greScore;

    private String satScore;

    private String essaysPrepared;


}
