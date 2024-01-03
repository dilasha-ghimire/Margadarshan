// import "../css-files/Exam.css";
import "../css-files/Exam.css"
function Exam(){
    return(
    <>
    <div className="exam_header">
        <div className="exam_website-title">
            <button className="exam_logo-button" id="logo-button">
                <div className="exam_logo-container">
                    <a href="homepage1.html"><img className="exam_logo" src="src\assets\AboutPage\Margadarshan logo.png"/></a>
                </div>
            </button>
            <a href="homepage1.html"><button className="exam_website-title-button" id="website-title-button">
                MARGADARSHAN
            </button></a>
        </div>

        <div className="exam_header-button-container">
            <div className="exam_about-univerisity-portfolio-roadmap">

            </div>
            <a href = "about.html"><button className="exam_header-button">About</button></a>

            <div className="exam_header-button-uni">
                <button className="exam_header-button">Universities</button>

                <div className="exam_drop-down-uni">
                    <a href = "university.html"><button className="exam_drop-down-button">Universities</button></a>
                    <a href="scholarship.html"><button className="exam_drop-down-button">Scholarship</button></a>
                    <button className="exam_drop-down-button">Exams</button>
                </div>
            </div>

            <div className="exam_header-button-portfolio">
                <button className="exam_header-button">Portfolio</button>
                <div className="exam_drop-down-portfolio">
                    <button className="exam_drop-down-button">Education</button>
                    <button className="exam_drop-down-button">Documents</button>
                    <button className="exam_drop-down-button">SOP and Essays</button>
                </div>
            </div>

            <button className="exam_header-button">Roadmap</button>

            <div className="exam_profile-container">
                <button className="exam_profile-button">
                    <img className="exam_profile" src="src\assets\AboutPage\profile.png"/>
                </button>   
                <button className="exam_logout-button">Logout</button>
            </div>
        </div>
    </div>
    <div className="tarara">
        <div className="left_div">
            <div id="exam_text" className="left_content">Exams</div>
            <div className="left_content"><img src="src\assets\Exam\section-calendar.png" alt="image" /></div>
        </div>
        <div className="right_div">
            <div className="exam_types">SATS</div>
            <div className="exam_types">IELTS</div>
            <div className="exam_types">GRE</div>
            <div className="exam_types">TOEFL</div>
        </div>
    </div>
    <h1>Fall 2023 Test Dates</h1>
    <table>
        <thead>
            <tr>
                <th>SAT Test Dates</th>
                <th>Registration Deadline</th>
                <th>Late Registration Deadline</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>November 4, 2023</td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td>y</td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            
        </tbody>
    </table>
    
    </>
    )
}
export default Exam;
