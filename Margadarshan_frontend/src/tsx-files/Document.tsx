import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom"
import '../css-files/documentstyle.css';
import Header from "./Header.tsx";

const Document: React.FC = () => {

    useEffect(() => {
        document.title = "Document | Margadarshan"
    }, [])


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

            <div className="doc-content">
                <div className="doc-clickbtn" onClick={openSideNav}>
                    <button className="doc-click-btn">→</button>
                </div>

                <div id="doc-navigation" className="doc-sidenavbar" style={{ width: sideNavWidth }}>
                    <a href="javascript:void(0)" className="doc-close-btn" onClick={closeSideNav}>←</a>
                    <div id="mySidenav" className="doc-sidenav-content">
                        <p>Portfolio</p>
                        <h1></h1>
                        <Link to="/education ">
                            <span>Education</span>
                        </Link>
                        <h1></h1>
                        <Link to="/document " className="doc-link">
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

                    <div className="doc-add-button-container">
                        <button className="resume">
                            <img className="doc-add" src="src\assets\Document\Add button.png" alt="add" />
                            <p>Resume</p>
                        </button>
                        <button className="university-certificate">
                            <img className="doc-add" src="src\assets\Document\Add button.png" alt="add" />
                            <p>University Certificate</p>
                        </button>
                        <button className="university-transcript">
                            <img className="doc-add" src="src\assets\Document\Add button.png" alt="add" />
                            <p>University Transcript</p>
                        </button>
                        <button className="sop">
                            <img className="doc-add" src="src\assets\Document\Add button.png" alt="add" />
                            <p>Statement of Purpose</p>
                        </button>
                        <button className="english-proficiency">
                            <img className="doc-add" src="src\assets\Document\Add button.png" alt="add" />
                            <p>IELTS/TOEFL</p>
                        </button>
                        <button className="sat-gre-gmat">
                            <img className="doc-add" src="src\assets\Document\Add button.png" alt="add" />
                            <p>SAT/GRE/GMAT</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Document;