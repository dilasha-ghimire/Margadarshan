import { Link } from "react-router-dom"
import "../css-files/scholarshipHeader.css";
import "../css-files/scholarshipCentre.css";
import { useQuery } from "react-query";
import axios from "axios";

function Scholarship() {
    const {data} = useQuery({
        queryKey: "GET_DATA",
        queryFn() {
            return axios.get("http://localhost:8080/api/scholarships")
        }
    })
    return (
        <>
            <div className="header">
                <div className="website-title-sch">
                    <img className="logo" src="src\assets\AboutPage\Margadarshan logo.png"></img>
                    <p className="margadarshan-sch">MARGADARSHAN</p>
                </div>

                <div className="header-button-container">
                    <div className="about-univerisity-portfolio-roadmap">

                    </div>
                    <a href="about.html"><button className="header-button">About</button></a>

                    <div className="header-button-uni">
                        <button className="header-button">Universities</button>

                        <div className="drop-down-uni-container2">
                            <Link to="/university"><button className="drop-down-button-sch">Universities</button></Link>
                            <Link to="/scholarship"><button className="drop-down-button-sch">Scholarship</button></Link>
                            <button className="drop-down-button-sch">Exams</button>
                        </div>
                    </div>

                    <div className="header-button-portfolio">
                        <button className="header-button">Portfolio</button>
                        <div className="drop-down-portfolio-container2">
                            <button className="drop-down-button-sch">Education</button>
                            <button className="drop-down-button-sch">Documents</button>
                            <button className="drop-down-button-sch">SOP and Essays</button>
                        </div>
                    </div>

                    <button className="header-button">Roadmap</button>

                    <div className="profile-container">
                        <button className="profile-button">
                            <img className="profile-sch" src="src\assets\AboutPage\profile.png" />
                        </button>
                        <button className="logout-btn-sch">Logout</button>
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
                        <img className="scholarship-image" src="src\assets\Scholarship\scholarship.png" />
                    </div>
                </div>

                <div className="user-input-sch">
                    <div className="text-field-container">
                        <div className="major-choice">
                            <p className="question">What do you want to study?</p>
                            <input className="text-field" type="text" />
                        </div>
                        <div className="location-choice">
                            <p className="question">Which state do you want to study in?</p>
                            <input className="text-field" type="text" />
                        </div>
                    </div>
                    <div className="search-button-container-sch">
                        <button className="search">Search</button>
                    </div>
                </div>

                <div className="scholarship-list">
                    <div className="sch-container">
                        <div className="sch-description">
                            <div className="sch-image-container">
                                <img className="sch-image" src="src\assets\Scholarship\peo.png" />
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
                                <img className="sch-image" src="src\assets\Scholarship\uni of memphis.png" />
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

                <div className="scholarship-choice">
                    {data?.data?.map(sch=>{
                    return  (<>
                        <p className="sch-choice">{sch.scholarshipName}</p>
                        <p className="sch-choice">{sch.scholarshipOrganization}</p>
                        <p className="sch-choice">{sch.scholarshipType}</p>
                        <p className="sch-choice">{sch.grant}</p>
                        <p className="sch-choice">{sch.scholarshipDeadline}</p>
                    </>)
                })}</div>
            </div>
        </>
    )
}

export default Scholarship