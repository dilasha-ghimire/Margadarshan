import React, {useEffect, useState} from "react";
import '../css-files/adminDashboard.css';
import {Link, useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faBuildingColumns } from '@fortawesome/free-solid-svg-icons';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { faPenNib } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";

interface DataRecord {
    totalRecords: number;
}

const AdminDashboard: React.FC = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const storedOTP = localStorage.getItem('adminOTP');

        if (storedOTP == null){
            navigate('/login');
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('adminOTP');
        navigate('/login');
    }

    useEffect(() => {
        document.title = "Admin Dashboard | Margadarshan"
    }, [])

    const [scholarshipRecords, setScholarshipRecords] = useState<DataRecord | null>(null);
    const [studentRecords, setStudentRecords] = useState<DataRecord | null>(null);
    const [universityRecords, setUniversityRecords] = useState<DataRecord | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const scholarshipResponse = await axios.get('http://localhost:8080/api/scholarship-record');
                setScholarshipRecords(scholarshipResponse.data);

                const studentResponse = await axios.get('http://localhost:8080/api/students-record');
                setStudentRecords(studentResponse.data);

                const universityResponse = await axios.get('http://localhost:8080/api/universities-record');
                setUniversityRecords(universityResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div className="header-admin-dashboard">
                <div className="header-left-admin-dashboard">
                    <img className="logo-admin-dashboard" src="src\assets\AboutPage\Margadarshan logo.png"></img>
                    <p className="margadarshan-admin-dashboard">MARGADARSHAN</p>
                </div>
                <div className="header-right-admin-dashboard">
                        <button onClick={handleLogout} className="admin-dashboard-logout">
                            <FontAwesomeIcon icon={faArrowRightFromBracket} className="admin-dashboard-logout-icon"/>
                            Logout
                        </button>
                </div>
            </div>

            <div className="admin-dashboard-content">
                <div className="admin-dashboard-record-title">
                    <h2>Dashboard Overview: Total Students, University, and Scholarship Information</h2>
                </div>

                <div className="admin-dashboard-record">
                    <div className="admin-dashboard-students">
                        <h2 id="admin-dashboard-data">{studentRecords?.totalRecords}</h2>
                        <h3 id="admin-dashboard-datatext"> students are registered to the website</h3>
                    </div>
                    <div className="admin-dashboard-university">
                        <h2 id="admin-dashboard-data">{universityRecords?.totalRecords}</h2>
                        <h3 id="admin-dashboard-datatext"> data of universities present in the website</h3>
                    </div>
                    <div className="admin-dashboard-scholarship">
                        <h2 id="admin-dashboard-data">{scholarshipRecords?.totalRecords}</h2>
                        <h3 id="admin-dashboard-datatext">data of scholarships present in the website</h3>
                    </div>
                </div>

                <div className="admin-dashboard-record-title" style={{ paddingBottom: '20px' }}>
                    <h2>Access your pages</h2>
                </div>

                <div className="admin-dashboard-buttons">
                    <div className="admin-dashboard-unibtn">
                        <Link to="/adminUniversity">
                            <button id="admin-dashboard-button">
                                <FontAwesomeIcon className="admin-dashboard-button-icon" icon={faBuildingColumns} />
                                <h1 id="admin-dashboard-btn-title">Universities</h1>
                            </button>
                        </Link>
                    </div>
                    <div className="admin-dashboard-exambtn">
                        <Link to="/adminExam">
                            <button id="admin-dashboard-button">
                                <FontAwesomeIcon className="admin-dashboard-button-icon" icon={faPenNib} />
                                <h1 id="admin-dashboard-btn-title">Exams</h1>
                            </button>
                        </Link>
                    </div>
                    <div className="admin-dashboard-schbtn">
                        <Link to="/adminScholarship">
                            <button id="admin-dashboard-button">
                                <FontAwesomeIcon className="admin-dashboard-button-icon" icon={faBookOpen} />
                                <h1 id="admin-dashboard-btn-title">Scholarships</h1>
                            </button>
                        </Link>
                    </div>
                    <div className="admin-dashboard-studentbtn">
                        <Link to="/adminProfile ">
                            <button id="admin-dashboard-button">
                                <FontAwesomeIcon className="admin-dashboard-button-icon" icon={faUser} />
                                <h1 id="admin-dashboard-btn-title">Students</h1>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminDashboard;