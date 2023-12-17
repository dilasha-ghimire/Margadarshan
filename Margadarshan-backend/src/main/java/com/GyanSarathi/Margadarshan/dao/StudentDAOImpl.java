package com.GyanSarathi.Margadarshan.dao;

import com.GyanSarathi.Margadarshan.entity.Student;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public class StudentDAOImpl implements StudentDAO{
    //define field for entity manager
    private EntityManager entityManager;

    //set up constructor injection
    @Autowired
    public StudentDAOImpl(EntityManager theEntityManager) {
        entityManager = theEntityManager;
    }

    @Override
    public List<Student> findAll() {
        //create a query
        TypedQuery<Student> theQuery = entityManager.createQuery("FROM Student ", Student.class);

        //execute query and retrieve result
        List<Student> students = theQuery.getResultList();

        //return the result
        return students;
    }

    @Override
    public Student findById(int theId) {
        //get student
        Student theStudent = entityManager.find(Student.class, theId);

        //return student
        return theStudent;
    }
    //we wont add @Transactional layer here but rather in service layer
    @Override
    public Student save(Student theStudent) {
        //save student
        //if id == 0 then insert/save else update
        Student  dbStudent = entityManager.merge(theStudent);
        //return the dbStudent
        return dbStudent;
    }

    @Override
    public void deleteById(int theId) {
        //find student by id
        Student theEmployee = entityManager.find(Student.class,theId);

        //remove employee
        entityManager.remove(theEmployee);
    }
}
