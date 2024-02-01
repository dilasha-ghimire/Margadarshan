package com.GyanSarathi.Margadarshan.dto;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DocumentDto {

    @NotNull
    private int documentId;

    @NotNull
    private MultipartFile documentImage;

    @NotNull
    private String documentName;

    @NotNull
    private int studentId;

    private String documentImageString;
}
