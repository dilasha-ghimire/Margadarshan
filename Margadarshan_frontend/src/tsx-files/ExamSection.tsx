import "../css-files/ExamSection.css"
import Header from "./Header"
function ExamSection(){
    return(
        <>
        <Header/>
        <div className="tarara">
        <div className="left_div">
            <div id="exam_text" className="left_content">Exams</div>
            <div className="left_content"><img className="exam-picture" src="src\assets\Exam\section-calendar.png" alt="image" /></div>
        </div>
        <div className="right_div">
            <div className="exam_types">
                <a href="/SAT"><button>SAT</button></a>
                </div>
                <div className="exam_types">
                <a href="/GRE"><button>GRE</button></a>
                </div>
                <div className="exam_types">
                <a href="/IELTS"><button>IELTS</button></a>
                </div>
                <div className="exam_types">
                <a href="/TOEFL"><button>TOEFL</button></a>
                </div>
        </div>
    </div>
        </>
    )
}
export default ExamSection