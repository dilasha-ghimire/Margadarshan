import Header from "./Header";
import "../css-files/ExamSection.css"
import { Link } from "react-router-dom";
function AdminExam(){
    return(
        <>
        <Header/>
        <div className="tarara">
        <div className="left_div">
            <div id="exam_text" className="left_content1">Exams</div>
            <div className="left_content"><img className="exam_image" src="src\assets\Exam\section-calendar.png" alt="image" /></div>

        </div>
        <div className="right_div">
            
                <Link to={"/AdminExam_SAT"}><button id="button1" className="exam_types">SAT</button></Link> 
              
                <Link to={"/AdminExam_GRE"}><button id="button2" className="exam_types">GRE</button></Link> 
              
                
                <button id="button3" className="exam_types">IELTS</button>
                
                
                {/* <a href="/TOEFL"><button>TOEFL</button></a> */}
                <button id="button4" className="exam_types">TOEFL</button>
                
        </div>
    </div>
    <div className="dates">
        <h1>Fall 2023 Test Dates</h1>
    </div>

        </>
    )

}
export default AdminExam;