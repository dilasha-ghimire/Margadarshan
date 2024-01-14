import { Link } from "react-router-dom"
import "../css-files/ExamSection.css"
import Header from "./Header"
function ExamSection(){
    return(
        <>
        <Header/>
        <div className="tarara">
        <div className="left_div">
            <div id="exam_text" className="left_content1">Exams</div>
            <div className="left_content"><img className="exam_image" src="src\assets\Exam\section-calendar.png" alt="image" /></div>

        </div>
        <div className="right_div">
            
                <a href="/SAT"><button id="button1" className="exam_types">SAT</button></a>
                
                
                <a href="/GRE"><button id="button2" className="exam_types">GRE</button></a>
              
                
                <a href="/IELTS"><button id="button3" className="exam_types">IELTS</button></a>
                
                
                {/* <a href="/TOEFL"><button>TOEFL</button></a> */}
                 <Link to="/TOEFL"><button id="button4" className="exam_types">TOEFL</button></Link>
                
        </div>
    </div>
    <div className="dates">
        <h1>Fall 2023 Test Dates</h1>
    </div>
        </>
    )
}
export default ExamSection