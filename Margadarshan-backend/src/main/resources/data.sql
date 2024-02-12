INSERT INTO exams (exam_id, exam_name)
SELECT 1, 'SAT' WHERE NOT EXISTS (SELECT 1 FROM exams WHERE exam_id = 1);
INSERT INTO exams (exam_id, exam_name)
SELECT 2, 'GRE' WHERE NOT EXISTS (SELECT 1 FROM exams WHERE exam_id = 2);
INSERT INTO exams (exam_id, exam_name)
SELECT 3, 'IELTS' WHERE NOT EXISTS (SELECT 1 FROM exams WHERE exam_id = 3);
INSERT INTO exams (exam_id, exam_name)
SELECT 4, 'TOEFL' WHERE NOT EXISTS (SELECT 1 FROM exams WHERE exam_id = 4);


INSERT INTO exam_dates (exam_id, exam_date, registration_deadline, late_registration_deadline) VALUES
       (1, '2024-03-14', '2024-02-14', '2024-02-28'),
       (1, '2024-05-02', '2024-04-02', '2024-04-16'),
       (1, '2024-06-13', '2024-05-14', '2024-05-28'),
       (1, '2024-08-22', '2024-07-23', '2024-08-06'),
       (1, '2024-12-05', '2024-11-05', '2024-11-19'),
       (2, '2024-03-21', '2024-02-21', '2024-03-06'),
       (2, '2024-05-09', '2024-04-09', '2024-04-23'),
       (2, '2024-09-19', '2024-08-20', '2024-09-03'),
       (2, '2024-11-21', '2024-10-22', '2024-11-05'),
       (2, '2024-12-12', '2024-11-12', '2024-11-26'),
       (3, '2024-03-07', '2024-02-07', '2024-02-21'),
       (3, '2024-04-18', '2024-03-18', '2024-04-01'),
       (3, '2024-06-20', '2024-05-20', '2024-06-03'),
       (3, '2024-08-15', '2024-07-16', '2024-07-30'),
       (3, '2024-12-19', '2024-11-19', '2024-12-03'),
       (4, '2024-03-28', '2024-02-28', '2024-03-13'),
       (4, '2024-08-29', '2024-07-30', '2024-08-13'),
       (4, '2024-10-10', '2024-09-10', '2024-09-24'),
       (4, '2024-11-28', '2024-10-29', '2024-11-12'),
       (4, '2024-12-19', '2024-11-19', '2024-12-03');

insert into scholarship (scholarship_grant, scholarship_deadline, scholarship_gpa, scholarship_image, scholarship_name, scholarship_organization, scholarship_type) values
                                ('14000', '31 July 2024', '3.5', 'd57da991-0217-41ae-b6c6-cf51fa3751eb_usa.png', 'International Merit Based Scholarship', 'Department of states', 'Merit-based scholarship'),
                               ('28000', '29 July 2024','null','d57da991-0217-41ae-b6c6-cf51fa3751eb_usa.png', 'International Athlete Scholarship', 'Department of states', 'Athlete Scholarship'),
                               ('34000', '18 July 2024', 'null', 'd57da991-0217-41ae-b6c6-cf51fa3751eb_usa.png', 'International Women  Scholarship', 'Department of states', 'Women Scholarship'),
                               ('21000', '31 May 2024', '3.6', 'd57da991-0217-41ae-b6c6-cf51fa3751eb_usa.png', 'International Merit Based Scholarship', 'Department of states', 'Merit-based scholarship'),
                               ('10000', '31 June 2024', '3.7', 'd57da991-0217-41ae-b6c6-cf51fa3751eb_usa.png', 'International Merit Based Scholarship', 'Department of states', 'Merit-based scholarship')
;
INSERT INTO universities (
    average_bachelors_gpa,
    average_gre_score,
    average_ielts_score,
    average_masters_gpa,
    average_sat_score,
    average_toefl_score,
    university_city,
    university_fees,
    university_length,
    university_major,
    university_name,
    required_essays,
    university_state,
    university_image
) VALUES
      ('3.8', '310', '7.0', '3.8', '1350', '90', 'MA', 40000, 4, 'Computer Science', 'Stanford University', true, 'California', '08c364d9-f3d3-435c-85db-f4b1e60213b0_block-s-right.png'),
      ('3.2', '320', '7.5', '3.2', '1400', '95', 'Los Angeles', 45000, 5, 'Business Administration', 'San-Diego State Univeristy', false, 'California', '034af160-724a-479a-bd7c-ba60f70d5d7a_1800x600-primary-logo-hero-placeholder.png'),
      ('3.3', '330', '8.0', '3.3', '1450', '100', 'Michigan', 42000, 4, 'Engineering', 'University of Michigan', true, 'Michigan', '028de5d3-cbbc-4dbf-b8ad-7a4afedf502a_U-M_Logo-Hex.png'),
      ('3.7', '315', '7.2', '3.7', '1300', '88', 'New Jersey', 38000, 3, 'Health Sciences', 'Princeton University', false, 'New Jersey', '72065f16-f659-4b72-a597-e0d90144640f_Princeton_seal.png'),
      ('3.9', '340', '8.5', '4.0', '1500', '105', 'Boston', 48000, 6, 'Physics', 'University of Massacheussets', true, 'Massachusetts', '08c364d9-f3d3-435c-85db-f4b1e60213b0_block-s-right.png');
