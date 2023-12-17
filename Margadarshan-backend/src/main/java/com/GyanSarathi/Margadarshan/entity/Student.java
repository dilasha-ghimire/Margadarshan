package com.GyanSarathi.Margadarshan.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "students")
public class Student{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "student_id")
    private int id;
    @Column(name ="full_name")
    private String full_name;
    @Column(name = "address")
    private String address;

    @Column(name = "number")
    private long number;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    public Student() {
    }

    public Student(String full_name, String address, long number, String email, String password) {
        this.full_name = full_name;
        this.address = address;
        this.number = number;
        this.email = email;
        this.password = password;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFull_name() {
        return full_name;
    }

    public void setFull_name(String full_name) {
        this.full_name = full_name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public long getNumber() {
        return number;
    }

    public void setNumber(long number) {
        this.number = number;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
