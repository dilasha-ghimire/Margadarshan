import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import '../css-files/bflheaderstyle.css';

const BFLHeader: React.FC = () => {
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
            <div className="bfl-content">
                <div className="bfl-website-title">
                    <button className="bfl-logo-button" id="bfl-logo-button">
                        <div className="bfl-logo-container">
                            <Link to="/ "><img className="bfl-logo" src="src\assets\Document\Margadarshan logo.png" alt="bfl-logo" /></Link>
                        </div>
                    </button>
                    <Link to="/ "><div className="bfl-website-title-button"> MARGADARSHAN </div></Link>
                </div>

                <div className="bfl-header-button-container">
                    <Link to="/about-us "><button className="bfl-header-button">About</button></Link>

                    <div className="bfl-header-button-uni">
                        <button className="bfl-header-button">Academia</button>

                        <div className="bfl-drop-down-uni">
                            <Link to="/university"><button className="bfl-drop-down-button">Universities</button></Link>
                            <Link to="/scholarship"><button className="bfl-drop-down-button">Scholarship</button></Link>
                            <Link to="/sat"><button className="bfl-drop-down-button">Exams</button></Link>
                        </div>
                    </div>

                    <Link to="/register"><button className="bfl-header-button-lr">Login/Register</button></Link>
                </div>

                <div id="mhp-mySidenav" className="bfl-sidenav" style={{ width: sidenavWidth }}>
                    <a href="javascript:void(0)" className="bfl-closebtn" onClick={closeNav}>→</a>
                    <Link to="/about-us ">About</Link>
                    <Link to="/university ">Universities</Link>
                    <Link to="/scholarship ">Scholarships</Link>
                    <Link to="/sat ">Exams</Link>
                    <Link to="/register ">Login/Register</Link>
                </div>

                <div className="bfl-click" onClick={openNav}>
                    <button className="bfl-click-button">☰</button>
                </div>
            </div>

        </div>
    );
};

export default BFLHeader;
