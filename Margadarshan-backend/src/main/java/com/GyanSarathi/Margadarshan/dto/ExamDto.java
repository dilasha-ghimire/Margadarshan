package com.GyanSarathi.Margadarshan.dto;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExamDto {

    @NotNull
    private int examId;

    @NotNull
    private String examName;

    @NotNull
    private int examDateId;

    @NotNull
    private String examDate;

    @NotNull
    private String registrationDeadline;

    @NotNull
    private String lateRegistrationDeadline;

}
