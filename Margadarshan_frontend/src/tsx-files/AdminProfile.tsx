import '../css-files/adminProfile.css';
import React, {useEffect, useState} from "react";
import AdminHeader from "./AdminHeader.tsx";
import axios from "axios";
import {useNavigate} from "react-router-dom";
//import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
//import {faUser} from "@fortawesome/free-solid-svg-icons";

const AdminProfile: React.FC = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const storedOTP = localStorage.getItem('adminOTP');

        if (storedOTP == null){
            navigate('/login');
        }
    }, []);

    useEffect(() => {
        document.title = "Admin Profile | Margadarshan"
    }, [])

    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [searchInput, setSearchInput] = useState('');


    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/students');
            setStudents(response.data);
            setFilteredStudents(response.data);
        } catch (error) {
            console.error('Error fetching students data:', error);
        }
    };

    const onSubmitSearch = (e) => {
        e.preventDefault();

        const filteredStudents = students.filter((student) =>
            student.fullName.toLowerCase().includes(searchInput.toLowerCase())
        );
        setFilteredStudents(filteredStudents);
    };



    return (
        <>
            <AdminHeader/>

            <div className="adprofile-content">
                <div className="adprofile-mainbar">
                    <form onSubmit={onSubmitSearch}>
                        <div className="adprofile-searchbar-container">
                            <p id="adprofile-p1">Search student: </p>
                            <input
                                className="adprofile-searchbar"
                                 value={searchInput}
                                 onChange={(e) => setSearchInput(e.target.value)}
                            />
                            <div className="adprofile-searchbtn-container">
                                <button className="adprofile-searchbtn" type="submit">
                                    <img className="adprofile-search-img" src="src\assets\AdminUniversity\search.png"></img>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="adprofile-proheader">
                    <h2>Students details</h2>
                </div>

                <div className="adedu-main-section">
                    <div className="adedu-studetails-container">
                        <div className="adedu-data-container">
                            {filteredStudents.map((student) => (
                                <div key={student.id} className="studetail-data-container">
                                    <p>Student ID: {student.id}</p>
                                    <p>Full Name: {student.fullName}</p>
                                    <p>Address: {student.address}</p>
                                    <p>Number: {student.number}</p>
                                    <p>Email: {student.email}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminProfile;
