package com.GyanSarathi.Margadarshan.Repository;

import com.GyanSarathi.Margadarshan.entity.Sop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SopRepository extends JpaRepository<Sop,Integer> {

    List<Sop> findAllByStudentId(int studentId);
}
