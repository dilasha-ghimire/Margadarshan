import React, { useState, useEffect } from 'react';
import {Link, useNavigate} from "react-router-dom"
import '../css-files/headerstyle.css';

const Header: React.FC = () => {

    useEffect(() => {
        document.title = "Header | Margadarshan"
    }, [])

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

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('loggedInUserId');
        navigate('/login');
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div>
            <div className="header-content">
                <div className="header-website-title">
                    <button className="header-logo-button" id="header-logo-button">
                        <div className="header-logo-container">
                            <Link to="/mainhomepage "><img className="header-logo" src="src\assets\Document\Margadarshan logo.png" alt="header-logo" /></Link>
                        </div>
                    </button>
                    <Link to="/mainhomepage "><div className="header-website-title-button"> MARGADARSHAN </div></Link>
                </div>

                <div className="header-header-button-container">
                    <Link to="/about-us "><button className="header-header-button">About</button></Link>

                    <div className="header-header-button-uni">
                        <button className="header-header-button">Academia</button>

                        <div className="header-drop-down-uni">
                            <Link to="/university"><button className="header-drop-down-button">Universities</button></Link>
                            <Link to="/scholarship"><button className="header-drop-down-button">Scholarships</button></Link>
                            <Link to="/sat"><button className="header-drop-down-button">Exams</button></Link>
                        </div>
                    </div>

                    <div className="header-header-button-portfolio">
                        <button className="header-header-button">Portfolio</button>
                        <div className="header-drop-down-portfolio">
                            <Link to="/education "><button className="header-drop-down-button">Education</button></Link>
                            <Link to="/document"><button className="header-drop-down-button">Documents</button></Link>
                            <Link to="/sop"><button className="header-drop-down-button">SOP and Essays</button></Link>
                        </div>
                    </div>

                    <Link to="/roadmap"><button className="header-header-button">Roadmap</button></Link>
                </div>

                <div id="header-mySidenav" className="header-sidenav" style={{ width: sidenavWidth }}>
                    <a href="javascript:void(0)" className="header-closebtn" onClick={closeNav}>→</a>
                    <Link to="/about-us ">About</Link>
                    <Link to="/university ">Universities</Link>
                    <Link to="/scholarship ">Scholarships</Link>
                    <Link to="/sat ">Exams</Link>
                    <Link to="/education ">Education</Link>
                    <Link to="/document ">Documents</Link>
                    <Link to="/sop ">SOP and Essays</Link>
                    <Link to="/roadmap ">Roadmap</Link>
                </div>

                <div className="header-profile-container">
                    <button onClick={handleLogout}  className="header-logout-button">Logout</button>
                    <Link to={"/userProfile"}><button className="header-profile-button">
                        <img className="header-profile" src="src\assets\Document\profile.png" alt="header-profile" />
                    </button></Link>
                </div>

                <div className="header-click" onClick={openNav}>
                    <button className="header-click-button">☰</button>
                </div>
            </div>

        </div>
    );
};

export default Header;
