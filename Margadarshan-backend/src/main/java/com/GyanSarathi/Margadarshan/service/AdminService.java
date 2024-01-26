package com.GyanSarathi.Margadarshan.service;

import com.GyanSarathi.Margadarshan.response.OtpResponse;
import org.springframework.stereotype.Service;

@Service
public interface AdminService {

    OtpResponse generateOtpToEmail(String email);

    OtpResponse validateOtp(String email, String Otp);

}
