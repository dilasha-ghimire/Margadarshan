import {Link} from "react-router-dom"
import "../css-files/universityHeader.css";
import "../css-files/scholarshipCentre.css";

function Scholarship() {
    return (
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
                    <Link to = "/university"><button className="drop-down-button">Universities</button></Link>
                    <Link to="/scholarship"><button className="drop-down-button">Scholarship</button></Link>
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

    <div className="centre">
        <div className="page-heading">
            <div className="scholarship-title">
                <p className="title-main-text">Scholarship</p>
                <p className="title-subtext">
                    Discover tailored scholarships that match your criteria
                </p>
            </div>
            <div className="title-image">
                <img className="scholarship-image" src="src\assets\Scholarship\scholarship.png"/>
            </div>
        </div>

        <div className="user-input">
            <div className="text-field-container">
                <div className="major-choice">
                    <p className="question">What do you want to study?</p>
                    <input className="text-field" type="text"/>
                </div>
                <div className="location-choice">
                    <p className="question">Which state do you want to study in?</p>
                    <input className="text-field" type="text"/>
                </div>
            </div>
            <div className="search-button-container">
                <button className="search">Search</button>
            </div>
        </div>

        <div className="scholarship-list">
            <div className="sch-container">
                <div className="sch-description">
                    <div className="sch-image-container">
                        <img className="sch-image" src="src\assets\Scholarship\peo.png"/>
                    </div>
                    <div className="sch-desc-container">
                        <p className="sch-name">P.E.O. International Peace Scholarship (IPS)</p>
                        <p className="sch-institute">The International Peace Scholarship Fund</p>
                        <p className="sch-type">Women's scholarship</p>
                        <p className="grant">Grant: $12,500</p>
                    </div>
                </div>
                <div className="sch-deadline">
                    <p className="deadline">Deadline:</p>
                    <p className="date">15 Dec 2023</p>
                </div>
            </div>

            <div className="sch-container">
                <div className="sch-description">
                    <div className="sch-image-container">
                        <img className="sch-image" src="src\assets\Scholarship\uni of memphis.png"/>
                    </div>
                    <div className="sch-desc-container">
                        <p className="sch-name">International Merit Scholarship</p>
                        <p className="sch-institute">University of Memphis</p>
                        <p className="sch-type">Merit-based scholarship</p>
                        <p className="grant">Grant: Various benefits</p>
                    </div>
                </div>
                <div className="sch-deadline">
                    <p className="deadline">Deadline:</p>
                    <p className="date">31 July 2024</p>
                </div>
            </div>
        </div>
    </div>
        </>
    )
}

export default Scholarship