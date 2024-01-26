import '../css-files/adminProfile.css';
import React, {useEffect, useState} from "react";
import AdminHeader from "./AdminHeader.tsx";
import axios from "axios";
//import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
//import {faUser} from "@fortawesome/free-solid-svg-icons";

const AdminProfile: React.FC = () => {

    useEffect(() => {
        document.title = "Admin Profile | Margadarshan"
    }, [])

    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/students');
            setStudents(response.data);
        } catch (error) {
            console.error('Error fetching students data:', error);
        }
    };

    return (
        <>
            <AdminHeader/>

            <div className="adprofile-content">
                <div className="adprofile-mainbar">
                    <form /*onSubmit={onSubmitSearch}*/>
                        <div className="adprofile-searchbar-container">
                            <p id="adprofile-p1">Search student: </p>
                            <input
                                className="adprofile-searchbar"
                            //     value={searchInput}
                            //     onChange={(e) => setSearchInput(e.target.value)}
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
                        <ul>
                            {students.map((student) => (
                                <li key={student.id}>
                                    <p>Student ID: {student.id}</p>
                                    <p>Full Name: {student.fullName}</p>
                                    <p>Address: {student.address}</p>
                                    <p>Number: {student.number}</p>
                                    <p>Email: {student.email}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminProfile;
