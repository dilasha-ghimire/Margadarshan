package com.GyanSarathi.Margadarshan.dto;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.stereotype.Component;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Component
public class ExamDto {

    @NotNull
    private Integer examId;

    @NotNull
    private String examName;

    @NotNull
    private Integer examDateId;

    @NotNull
    private String examDate;

    @NotNull
    private String registrationDeadline;

    @NotNull
    private String lateRegistrationDeadline;

}
