import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom"
import '../css-files/documentstyle.css';
import Header from "./Header.tsx";
import BeforeLoginHeader from "./BeforeLoginHeader.tsx";

const Document: React.FC = () => {

    useEffect(() => {
        document.title = "Documents | Margadarshan"
    }, [])

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedID = localStorage.getItem('loggedInUserId');

        if (storedID == null){
            setIsLoggedIn(false);
        }
        else {
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <div>
            {localStorage.getItem("loggedInUserId")? <Header/>:<BeforeLoginHeader/>}

            {isLoggedIn ? (
            <div className="doc-content">
                <div id="edu-navigation" className="edu-sidenavbar">
                    <div id="mySidenav" className="edu-sidenav-content">
                        <p>Portfolio</p>
                        <Link to="/education ">
                            <span>Education</span>
                        </Link>
                        <Link to="/document " className="doc-link">
                            <span>Documents</span>
                        </Link>
                        <Link to="/sop ">
                            <span>SoP and Essays</span>
                        </Link>
                    </div>
                </div>

                <div className="document-upload">

                    <div className="edu-title">
                        <h1>Documents</h1>
                        <p>Upload your documents here to be reviewed by our team. Please ensure that you have the necessary permissions to upload these files.</p>
                    </div>


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
            ) : (
                <div className="doc-login-popup">
                    <h2>Login to Access</h2>
                    <Link to="/login"><button>Login</button></Link>
                </div>
            )}
        </div>
    );
};

export default Document;