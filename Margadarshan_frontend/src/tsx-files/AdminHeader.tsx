import '../css-files/adminHeader.css';
import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faBuildingColumns } from '@fortawesome/free-solid-svg-icons';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { faPenNib } from '@fortawesome/free-solid-svg-icons';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const AdminHeader: React.FC = () => {

    useEffect(() => {
        document.title = "Admin Header | Margadarshan"
    }, [])

    return (
        <>
            <div className="header-admin">
                <div className="header-left-admin">
                    <img className="logo-admin" src="src\assets\AboutPage\Margadarshan logo.png"></img>
                    <p className="margadarshan-admin">MARGADARSHAN</p>
                </div>
            </div>

            <div className="admin-header-nav" id="admin-header-navbar">
                <nav className="admin-header-nav-container">
                    <div>
                        <div className="admin-header-nav-list">
                            <div className="admin-header-nav-items">
                                <Link to="#" className="admin-header-nav-link">
                                    <FontAwesomeIcon className="admin-header-nav-icon" icon={faHouse} />
                                    <span className="admin-header-nav-name">Home</span>
                                </Link>

                                <Link to="/adminUniversity" className="admin-header-nav-link">
                                    <FontAwesomeIcon className="admin-header-nav-icon" icon={faBuildingColumns} />
                                    <span className="admin-header-nav-name">Universities</span>
                                </Link>

                                <Link to="/adminScholarship" className="admin-header-nav-link">
                                    <FontAwesomeIcon className="admin-header-nav-icon" icon={faBookOpen} />
                                    <span className="admin-header-nav-name">Scholarships</span>
                                </Link>

                                <div className="admin-header-nav-dropdown">
                                    <Link to="/adminExam_sat" className="admin-header-nav-link">
                                        <FontAwesomeIcon className="admin-header-nav-icon" icon={faPenNib} />
                                        <span className="admin-header-nav-name">Exams</span>
                                    </Link>

                                    <div className="admin-header-nav-dropdown-collapse">
                                        <div className="admin-header-nav-dropdown-content">
                                            <Link to="/adminExam_sat" className="admin-header-nav-dropdown-item">SAT</Link>
                                            <Link to="/adminExam_gre" className="admin-header-nav-dropdown-item">GRE</Link>
                                            <Link to="#" className="admin-header-nav-dropdown-item">IELTS</Link>
                                            <Link to="#" className="admin-header-nav-dropdown-item">TOEFL</Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="admin-header-nav-dropdown">
                                    <Link to="#" className="admin-header-nav-link">
                                        <FontAwesomeIcon className="admin-header-nav-icon" icon={faUser} />
                                        <span className="admin-header-nav-name">Students</span>
                                    </Link>

                                    <div className="admin-header-nav-dropdown-collapse">
                                        <div className="admin-header-nav-dropdown-content">
                                            <Link to="#" className="admin-header-nav-dropdown-item">KYC Profile</Link>
                                            <Link to="/admineducation" className="admin-header-nav-dropdown-item">Education</Link>
                                            <Link to="#" className="admin-header-nav-dropdown-item">Documents</Link>
                                            <Link to="#" className="admin-header-nav-dropdown-item">SOP and Essays</Link>
                                        </div>
                                    </div>
                                </div>

                                <Link to="#" className="admin-header-nav-link admin-header-nav-logout">
                                    <FontAwesomeIcon className="admin-header-nav-icon" icon={faArrowRightFromBracket} />
                                    <span className="admin-header-nav-name">Log Out</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default AdminHeader;