package com.GyanSarathi.Margadarshan.dto;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class StudentDto {

    @NotNull
    private Integer studentId;

    @NotNull
    private String studentFullName;

    @NotNull
    private String studentAddress;

    @NotNull
    private long studentNumber;

    @NotNull
    private String studentEmail;

    @NotNull
    private String studentPassword;
}
