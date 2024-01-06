import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import '../css-files/headerstyle.css';

const Header: React.FC = () => {
    const [sidenavWidth, setSidenavWidth] = useState<string>('0');

    const openNav = () => {
        setSidenavWidth('220px');
    };

    const closeNav = () => {
        setSidenavWidth('0');
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
            <div className="header-content">
                <div className="website-title">
                    <button className="logo-button" id="logo-button">
                        <div className="logo-container">
                            <Link to="/ "><img className="logo" src="src\assets\Document\Margadarshan logo.png" alt="logo" /></Link>
                        </div>
                    </button>
                    <Link to="/ "><div className="website-title-button"> MARGADARSHAN </div></Link>
                </div>

                <div className="header-button-container">
                    <Link to="/about-us "><button className="header-button">About</button></Link>

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
                            <Link to="/education "><button className="drop-down-button">Education</button></Link>
                            <Link to="/document"><button className="drop-down-button">Documents</button></Link>
                            <Link to="/sop"><button className="drop-down-button">SOP and Essays</button></Link>
                        </div>
                    </div>

                    <button className="header-button">Roadmap</button>
                </div>

                <div id="mySidenav" className="sidenav" style={{ width: sidenavWidth }}>
                    <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>→</a>
                    <Link to="/about-us ">About</Link>
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

        </div>
    );
};

export default Header;
