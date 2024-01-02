import React from 'react';
import Header from './Header';
import '../css-files/educationstyle.css';
import {Link} from "react-router-dom";

const Education: React.FC = () => {
    return (
        <div>
            <Header/>

            <div className="edu-content">
                <div id="edu-navigation" className="edu-sidenavbar">
                    <div id="mySidenav" className="edu-sidenav-content">
                        <p>Portfolio</p>
                        <h1></h1>
                        <Link to="/education " className="doc-link">
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
            </div>
        </div>
    );
};

export default Education;