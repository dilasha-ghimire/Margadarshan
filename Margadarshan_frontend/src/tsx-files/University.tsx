import "../css-files/universityHeader.css";
import "../css-files/universityCentre.css";
import React, { useState } from 'react';
import { Link } from "react-router-dom"
import {useQuery} from "react-query";
import axios from "axios";

function University() {
    const {data} = useQuery({
        queryKey: "GET_DATA",
        queryFn() {
            return axios.get("http://localhost:8080/universities/universities")
        }
    })

    const [selectedOption, setSelectedOption] = useState(null);
    const options = ["<$30,000", "$30,000 - $40,000", "$40,000 - $50,000", "$50,000 - $60,000", "$60,000>"];

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    }

    return (
        <>
            <div className="header">
                <div className="website-title-uni">
                    <img className="logo" src="src\assets\AboutPage\Margadarshan logo.png"></img>
                    <p className="margadarshan-uni">MARGADARSHAN</p>
                </div>

                <div className="header-button-container">
                    <div className="about-univerisity-portfolio-roadmap">

                    </div>
                    <a href="about.html"><button className="header-button">About</button></a>

                    <div className="header-button-uni">
                        <button className="header-button">Universities</button>

                        <div className="drop-down-uni-container1">
                            <Link to="/university"><button className="drop-down-button-uni">Universities</button></Link>
                            <Link to="/scholarship"><button className="drop-down-button-uni">Scholarship</button></Link>
                            <button className="drop-down-button-uni">Exams</button>
                        </div>
                    </div>

                    <div className="header-button-portfolio">
                        <button className="header-button">Portfolio</button>
                        <div className="drop-down-portfolio-container1">
                            <button className="drop-down-button-uni">Education</button>
                            <button className="drop-down-button-uni">Documents</button>
                            <button className="drop-down-button-uni">SOP and Essays</button>
                        </div>
                    </div>

                    <button className="header-button">Roadmap</button>

                    <div className="profile-container">
                        <button className="profile-button">
                            <img className="profile-uni" src="src\assets\AboutPage\profile.png" />
                        </button>
                        <button className="logout-btn-uni">Logout</button>
                    </div>
                </div>
            </div>

            <div className="centre">
                <div className="page-heading">
                    <div className="university-title">
                        <p className="title-main-text">Universities</p>
                        <p className="title-subtext">
                            Effortlessly find the perfect university using personalized filters
                        </p>
                    </div>
                    <div className="title-image">
                        <img className="university-image" src="src\assets\University\university.png" />
                    </div>
                </div>
            </div>

            <div className="user-input-uni">
                <form>
                    <div className="text-field-container">
                        <div className="major-choice">
                            <p className="question">What do you want to study?</p>
                            <input className="text-field1" type="text" />
                        </div>
                        <div className="location-choice">
                            <p className="question">Which state do you want to study in?</p>
                            <input className="text-field1" type="text" />
                        </div>
                    </div>

                    <div className="fee-button-container">
                        <div className="fees">
                            <p className="question">Tuition fees (USD)</p>
                            <select className="drop-down-fees"
                                value={selectedOption}
                                onChange={(e) => handleOptionSelect(e.target.value)}>
                                <option value="" disabled>Select an option</option>
                                {options.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="search-button-container">
                            <button className="search">Search</button>
                        </div>
                    </div>
                </form>
            </div>

            <div className="university-list">
                <div className="uni-container">
                    <div className="uni-description-container">
                        <div className="uni-image-container">
                            <img className="uni-image" src="src\assets\University\Michigan_Technological_University_seal.svg.png" />
                        </div>
                        <div className="uni-desc">
                            <p className="uni-name">Michigan Technological University</p>
                            <p className="uni-location">Houghton, Michigan</p>
                            <p className="major">BS in Biochemistry and Molecular Biology</p>
                        </div>
                    </div>
                    <div className="uni-costs">
                        <p className="annual-fee">$41,022/year</p>
                        <p className="years">4 years</p>
                    </div>
                </div>

                <div className="uni-container">
                    <div className="uni-description-container">
                        <div className="uni-image-container">
                            <img className="uni-image" src="src\assets\University\U-M_Logo-Hex.png" />
                        </div>
                        <div className="uni-desc">
                            <p className="uni-name">University of Michigan</p>
                            <p className="uni-location">Ann Arbor, Michigan</p>
                            <p className="major">BS in Biochemistry</p>
                        </div>
                    </div>
                    <div className="uni-costs">
                        <p className="annual-fee">$49,530/year</p>
                        <p className="years">4 years</p>
                    </div>
                </div>
            </div>

            <div>
                {data?.data?.map(i=>{
                    return  (<>
                        <p>University Name: {i.universityName}</p>
                        <p>University State: {i.universityState}</p>
                        <p>University City: {i.universityCity}</p>
                        <p>University Major: {i.universityMajor}</p>
                        <p>Annual Tuition Fee: {i.universityFees}</p>
                        <p>Length of Study: {i.universityLength}</p>
                    </>)
                })}
            </div>
        </>
    )
}
export default University;
