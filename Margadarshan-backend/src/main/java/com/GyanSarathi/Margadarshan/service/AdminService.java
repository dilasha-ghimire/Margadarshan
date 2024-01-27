package com.GyanSarathi.Margadarshan.service;

import com.GyanSarathi.Margadarshan.response.OtpResponse;
import com.GyanSarathi.Margadarshan.response.OtpResponseAdmin;
import org.springframework.stereotype.Service;

@Service
public interface AdminService {

    OtpResponse generateOtpToEmail(String email);

    OtpResponseAdmin validateOtp(String email, String Otp);

}
