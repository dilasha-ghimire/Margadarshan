// import "../css-files/Exam.css";
import "../css-files/Exam.css"
function University1(){
    return(
    <>
    <div className="header">
        <div className="website-title">
            <button className="logo-button" id="logo-button">
                <div className="logo-container">
                    <a href="homepage1.html"><img className="logo" src="src\assets\AboutPage\Margadarshan logo.png"/></a>
                </div>
            </button>
            <a href="homepage1.html"><button className="website-title-button" id="website-title-button">
                MARGADARSHAN
            </button></a>
        </div>

        <div className="header-button-container">
            <div className="about-univerisity-portfolio-roadmap">

            </div>
            <a href = "about.html"><button className="header-button">About</button></a>

            <div className="header-button-uni">
                <button className="header-button">Universities</button>

                <div className="drop-down-uni">
                    <a href = "university.html"><button className="drop-down-button">Universities</button></a>
                    <a href="scholarship.html"><button className="drop-down-button">Scholarship</button></a>
                    <button className="drop-down-button">Exams</button>
                </div>
            </div>

            <div className="header-button-portfolio">
                <button className="header-button">Portfolio</button>
                <div className="drop-down-portfolio">
                    <button className="drop-down-button">Education</button>
                    <button className="drop-down-button">Documents</button>
                    <button className="drop-down-button">SOP and Essays</button>
                </div>
            </div>

            <button className="header-button">Roadmap</button>

            <div className="profile-container">
                <button className="profile-button">
                    <img className="profile" src="src\assets\AboutPage\profile.png"/>
                </button>   
                <button className="logout-button">Logout</button>
            </div>
        </div>
    </div>
    <div className="tarara">
        <div className="left_div">
            <div className="exam_text">Exam</div>
            <div><img src="src\assets\Exam\section-calendar.png" alt="image" /></div>
        </div>
        <div className="right_div">
            <div className="exam_types">SATS</div>
            <div className="exam_types">IELTS</div>
            <div className="exam_types">GRE</div>
            <div className="exam_types">TOFEL</div>
        </div>
    </div>

    
    </>
    )
}
export default University1;
