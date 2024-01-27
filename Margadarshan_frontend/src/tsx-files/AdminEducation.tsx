import { useState, useEffect } from 'react';
import '../css-files/admineducationstyle.css';
import AdminHeader from './AdminHeader';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from "react-router-dom";

function AdminEducation() {

    const navigate = useNavigate();

    useEffect(() => {
        const storedOTP = localStorage.getItem('adminOTP');

        if (storedOTP == null){
            navigate('/login');
        }
    }, []);

    useEffect(() => {
        document.title = "Admin Education | Margadarshan"
    }, [])

    const [educationData, setEducationData] = useState([]);
    const [filteredEducationData, setFilteredEducationData] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        fetchEducationData();
    }, []);

    const fetchEducationData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/education');
            setEducationData(response.data);
            setFilteredEducationData(response.data);
        } catch (error) {
            console.error('Error fetching education data:', error);
        }
    };

    const onSubmitSearch = (e) => {
        e.preventDefault();

        const filteredData = educationData.filter(([education, studentName]) =>
            studentName.toLowerCase().includes(searchInput.toLowerCase())
        );

        setFilteredEducationData(filteredData);
    };

    return (
        <>
            <AdminHeader />

            <div className="adedu-content">
                <div className="adedu-mainbar">
                    <form onSubmit={onSubmitSearch}>
                        <div className="adedu-searchbar-container">
                            <p id="adedu-p1">Search student: </p>
                            <input
                                className="adedu-searchbar"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                            />
                            <div className="adedu-searchbtn-container">
                                <button className="adedu-searchbtn" type="submit">
                                    <img className="adedu-search-img" src="src\assets\AdminUniversity\search.png"></img>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="adedu-edheader">
                    <h2>List of Educational Background of students</h2>
                </div>

                <div className="adedu-main-section">
                    <div className="adedu-studetails-container">
                        <div className="adedu-data-container">
                            {filteredEducationData.map(([education, studentName]) => (
                                <div key={education.educationId} className="studetail-data-container">
                                    <div className = "adedu-in">
                                        <FontAwesomeIcon id="adedu-user-icon" icon={faUser} />
                                        <p id="adedu-student-name">Student Name: {studentName}</p>
                                    </div>
                                    <p id="adedu-institute-name">Institute: {education.educationInstitute}</p>
                                    <p id="adedu-student-qualification">Qualification: {education.educationQualification}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminEducation;



