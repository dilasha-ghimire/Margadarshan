package com.GyanSarathi.Margadarshan.response;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class LoginResponse {
    String message;
    boolean status;
}
