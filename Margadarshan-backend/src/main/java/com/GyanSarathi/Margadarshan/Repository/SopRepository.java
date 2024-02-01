package com.GyanSarathi.Margadarshan.Repository;

import com.GyanSarathi.Margadarshan.entity.Document;
import com.GyanSarathi.Margadarshan.entity.Sop;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SopRepository extends JpaRepository<Sop,Integer> {
    List<Sop> findAllByStudentId(int studentId);


    @Transactional
    @Modifying
    void deleteAllBySopId(int sopId);

}
