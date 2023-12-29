import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import '../css-files/documentheaderstyle.css';
import '../css-files/documentstyle.css';

const Document: React.FC = () => {
    const [sidenavWidth, setSidenavWidth] = useState<string>('0');
    const [sideNavWidth, setSideNavWidth] = useState<string>('0');

    const openNav = () => {
        setSidenavWidth('220px');
    };

    const closeNav = () => {
        setSidenavWidth('0');
    };

    const openSideNav = () => {
        setSideNavWidth('250px');
    };

    const closeSideNav = () => {
        setSideNavWidth('0');
    };

    const handleResize = () => {
        if (window.innerWidth > 1040) {
            setSidenavWidth('0');
        }
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div>
            <div className="header">
                <div className="website-title">
                    <button className="logo-button" id="logo-button">
                        <div className="logo-container">
                            <Link to="/ "><img className="logo" src="src\assets\Document\Margadarshan logo.png" alt="logo" /></Link>
                        </div>
                    </button>
                    <Link to="/ "><button className="website-title-button" id="website-title-button" onClick={closeNav}>
                        MARGADARSHAN
                    </button></Link>
                </div>

                <div className="header-button-container">
                    <Link to="/ "><button className="header-button">About</button></Link>

                    <div className="header-button-uni">
                        <button className="header-button">Universities</button>

                        <div className="drop-down-uni">
                            <Link to="/university"><button className="drop-down-button">Universities</button></Link>
                            <Link to="/scholarship"><button className="drop-down-button">Scholarship</button></Link>
                            <button className="drop-down-button">Exams</button>
                        </div>
                    </div>

                    <div className="header-button-portfolio">
                        <button className="header-button">Portfolio</button>
                        <div className="drop-down-portfolio">
                            <Link to="/ "><button className="drop-down-button">Education</button></Link>
                            <Link to="/document"><button className="drop-down-button">Documents</button></Link>
                            <Link to="/sop"><button className="drop-down-button">SOP and Essays</button></Link>
                        </div>
                    </div>

                    <button className="header-button">Roadmap</button>
                </div>

                <div id="mySidenav" className="sidenav" style={{ width: sidenavWidth }}>
                    <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>&rightarrow;</a>
                    <Link to="/ ">About</Link>
                    <Link to="/university ">Universities</Link>
                    <Link to="/scholarship ">Scholarships</Link>
                    <Link to="/ ">Exams</Link>
                    <Link to="/ ">Education</Link>
                    <Link to="/document ">Documents</Link>
                    <Link to="/sop ">SOP and Essays</Link>
                    <Link to="/ ">Roadmap</Link>
                </div>

                <div className="profile-container">
                    <button className="profile-button">
                        <img className="profile" src="src\assets\Document\profile.png" alt="profile" />
                    </button>
                    <button className="logout-button">Logout</button>
                </div>

                <div className="click" onClick={openNav}>
                    <button className="click-button">☰</button>
                </div>
            </div>

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