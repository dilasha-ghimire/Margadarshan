import "../css-files/ExamSection.css"
import "../css-files/AdminExam.css"
// import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import AdminHeader from "./AdminHeader.tsx";


function AdminExam(){

    // const navigate = useNavigate();

    // useEffect(() => {
    //     const storedOTP = localStorage.getItem('adminOTP');
    //
    //     if (storedOTP == null){
    //         navigate('/login');
    //     }
    // }, []);
    //
    // useEffect(() => {
    //     document.title = "Admin Exams | Margadarshan"
    // }, [])

    return(
        <>
        <AdminHeader/>
        <div className="tarara">
        <div className="left_div" style={{ marginLeft: '100px' }}>
            <div id="exam_text" className="left_content1">Exams</div>
            <div className="left_content"><img className="exam_image" src="src\assets\Exam\section-calendar.png" alt="image" /></div>

        </div>
        <div className="right_div">
            
                <Link to={"/AdminExam_SAT"}><button id="button1" className="exam_types">SAT</button></Link> 
              
                <Link to={"/AdminExam_GRE"}><button id="button2" className="exam_types">GRE</button></Link> 
              
                
                <Link to={"/AdminExam_IELTS"}><button id="button3" className="exam_types">IELTS</button></Link> 
                
                
                <Link to={"/AdminExam_TOEFL"}><button id="button4" className="exam_types">TOEFL</button> </Link>       
        </div>
    </div>
    <div className="dates">
        <h1 style={{ marginLeft: '110px', fontSize: '40px' }}>Fall 2023 Test Dates</h1>
    </div>
            </>
    )

}
export default AdminExam;
