package com.GyanSarathi.Margadarshan.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Admins")
public class Admin{

    @Id
    @Column(name = "admin_id",nullable = false)
    private int adminId;

    @Column(name = "admin_email", nullable = false)
    private String adminEmail;

    @Column(name = "otp")
    private String otp;

}
