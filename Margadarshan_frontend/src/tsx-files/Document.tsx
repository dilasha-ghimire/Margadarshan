import React, {useState} from 'react';
import { Link } from "react-router-dom"
import '../css-files/documentstyle.css';
import Header from "./Header.tsx";

const Document: React.FC = () => {
    const [sideNavWidth, setSideNavWidth] = useState<string>('0');

    const openSideNav = () => {
        setSideNavWidth('250px');
    };

    const closeSideNav = () => {
        setSideNavWidth('0');
    };
    return (
        <div>
            <Header/>

            <div className="content">
                <div className="clickbtn" onClick={openSideNav}>
                    <button className="click-btn">→</button>
                </div>

                <div id="navigation" className="sidenavbar" style={{ width: sideNavWidth }}>
                    <a href="javascript:void(0)" className="close-btn" onClick={closeSideNav}>&leftarrow;</a>
                    <div id="mySidenav" className="sidenav-content">
                        <p>Portfolio</p>
                        <h1></h1>
                        <Link to="/ ">
                            <span>Education</span>
                        </Link>
                        <h1></h1>
                        <Link to="/document ">
                            <span>Documents</span>
                        </Link>
                        <h1></h1>
                        <Link to="/sop ">
                            <span>SoP and Essays</span>
                        </Link>
                    </div>
                </div>

                <div className="document-upload">
                    <h1>Documents</h1>

                    <p>
                        Upload your documents here to be reviewed by our team. Please ensure that you have the necessary permissions to upload these files.
                    </p>

                    <div className="add-button-container">
                        <button document-type="resume">
                            <img className="add" src="src\assets\Document\Add button.png" alt="add" />
                            <p>Resume</p>
                        </button>
                        <button document-type="university-certificate">
                            <img className="add" src="src\assets\Document\Add button.png" alt="add" />
                            <p>University Certificate</p>
                        </button>
                        <button document-type="university-transcript">
                            <img className="add" src="src\assets\Document\Add button.png" alt="add" />
                            <p>University Transcript</p>
                        </button>
                        <button document-type="sop">
                            <img className="add" src="src\assets\Document\Add button.png" alt="add" />
                            <p>Statement of Purpose</p>
                        </button>
                        <button document-type="english-proficiency">
                            <img className="add" src="src\assets\Document\Add button.png" alt="add" />
                            <p>IELTS/TOEFL</p>
                        </button>
                        <button document-type="sat-gre-gmat">
                            <img className="add" src="src\assets\Document\Add button.png" alt="add" />
                            <p>SAT/GRE/GMAT</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Document;