package com.GyanSarathi.Margadarshan.service.impl;

import com.GyanSarathi.Margadarshan.Repository.EducationRepository;
import com.GyanSarathi.Margadarshan.dto.EducationDto;
import com.GyanSarathi.Margadarshan.dto.RoadmapDto;
import com.GyanSarathi.Margadarshan.entity.Education;
import com.GyanSarathi.Margadarshan.entity.Student;
import com.GyanSarathi.Margadarshan.service.EducationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EducationServiceImpl implements EducationService {

    private EducationRepository educationRepository;

    @Autowired
    public EducationServiceImpl(EducationRepository educationRepository){
        this.educationRepository = educationRepository;
    }


   /* @Override
    public List<?> listOfEducation(EducationDto educationDto) {
        return educationRepository.listOfEducation(educationDto.getStudentId());
    }
*/
    @Override
    public List<Object[]> listOfEducationWithStudentName() {
        return educationRepository.listOfEducationWithStudentName();
    }

    @Override
    public String save(EducationDto educationDto) {
        Education education = new Education();
        Student student = new Student();
        if(educationDto.getEducationId()!=null){
            education = educationRepository.findById(educationDto.getEducationId())
                    .orElseThrow(()-> new NullPointerException("data not found"));
        }
        student.setId(educationDto.getStudentId());
        education.setEducationQualification(educationDto.getEducationQualification());
        education.setEducationInstitute(educationDto.getEducationInstitute());
        education.setStudent(student);
        educationRepository.save(education);
        return "Education saved";
    }

//    @Override
//    public void addOnEducation(EducationDto educationDto) {
//        educationRepository.educationAddOn(educationDto.getEducationInstitute(),educationDto.getEducationQualification(),educationDto.getStudentId());
//    }
//
//    @Override
//    public List<Education> listOfEducationTwo(EducationDto educationDto) {
//
//
//        return null;
//    }
}
