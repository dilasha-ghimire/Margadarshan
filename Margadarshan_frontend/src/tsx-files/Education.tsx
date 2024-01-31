import React, {useEffect, useState} from 'react';
import Header from './Header';
import '../css-files/educationstyle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGraduate } from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import BeforeLoginHeader from "./BeforeLoginHeader.tsx";
import axios from "axios";


const Education: React.FC = () => {

    useEffect(() => {
        document.title = "Education | Margadarshan"
    }, [])

    const [isEduFormVisible, setEduFormVisible] = useState(false);
    const { register, handleSubmit, setValue } = useForm();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [educationData, setEducationData] = useState([]);
    const [editEducationId, setEditEducationId] = useState(null);

    const handleEduButtonClick = () => {
        setEditEducationId(null);
        setEduFormVisible(!isEduFormVisible);
    };

    const handleEditEduClick = (event) => {
        const educationId = event.target.dataset.id;
        const educationToEdit = educationData.find((edu: any) => edu.educationId === parseInt(educationId));
        if (educationToEdit) {
            setValue("eduName", educationToEdit.educationInstitute);
            setValue("eduLevel", educationToEdit.educationQualification);
            setEditEducationId(educationToEdit.educationId);
            setEduFormVisible(true);
        }
    };

    const onSubmitSaveEdu = async (formData: any): Promise<void> => {
        try {
            let response;
            if (editEducationId) {
                response = await axios.post('http://localhost:8080/api/update-education', {
                    educationId: editEducationId,
                    educationInstitute: formData.eduName,
                    educationQualification: formData.eduLevel,
                    studentId: localStorage.getItem('loggedInUserId')
                });
            }
            else {
                response = await axios.post('http://localhost:8080/api/save-education', {
                    educationInstitute: formData.eduName,
                    educationQualification: formData.eduLevel,
                    studentId: localStorage.getItem('loggedInUserId')
                });
            }

            console.log('Response:', response);

            if (response && response.data === "Exceeds education limit for the given student") {
                window.alert("Selections for educational alma mater are limited to three institutions.");

                setEduFormVisible(false);
                setValue("eduName", "");
                setValue("eduLevel", "");
            }
            else if (response && response.status === 200) {
                console.log('Education data saved successfully!');
                window.alert("Data saved successfully.");
                setEduFormVisible(false);
                fetchEducationData();

                setValue("eduName", "");
                setValue("eduLevel", "");
            }
            else {
                console.error('Failed to save education data:', response.statusText);
                window.alert("Failed to save education data: " + response.data);
            }
        }
        catch (error) {
            console.error('An error occurred while saving education data:', error);
            window.alert("An error occurred while saving education data: " + error.message);
        }
    };


    const fetchEducationData = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/education-by-id', {
                studentId: localStorage.getItem('loggedInUserId')
            });
            setEducationData(response.data);
        }
        catch (error) {
            console.error('Error fetching education data:', error);
        }
    };

    useEffect(() => {
        const storedID = localStorage.getItem('loggedInUserId');
        if (storedID == null) {
            setIsLoggedIn(false);
        } else {
            setIsLoggedIn(true);
            (async () => {
                try {
                    await fetchEducationData();
                } catch (error) {
                    console.error('Error fetching education data:', error);
                }
            })();
        }
    }, []);


    return (
        <div>
            {localStorage.getItem("loggedInUserId")? <Header/>:<BeforeLoginHeader/>}

            {isLoggedIn ? (
            <div className="edu-content">
                <div id="edu-navigation" className="edu-sidenavbar">
                    <div id="mySidenav" className="edu-sidenav-content">
                        <p>Portfolio</p>
                        <Link to="/education " className="doc-link">
                            <span>Education</span>
                        </Link>
                        <Link to="/document ">
                            <span>Documents</span>
                        </Link>
                        <Link to="/sop ">
                            <span>SoP and Essays</span>
                        </Link>
                    </div>
                </div>

                <div className="edu-main">
                    <div className="edu-title">
                        <h1>Education</h1>
                        <p>Share more details about your alma mater. Provide additional information about the institution where you pursued your education.</p>
                    </div>
                    <div className="edu-timeline">
                        {educationData.map((education: any, index: number) => (
                            <div key={index} className="edu-student-data-container">
                                <FontAwesomeIcon id="edu-icon" icon={faUserGraduate} />
                                <div className= "edtext">
                                    <div className="ed-division">
                                        <h2>{education.educationQualification}</h2>
                                        <button className="edu-edit-btn" data-id={education.educationId} onClick={handleEditEduClick}> ✎ </button>
                                    </div>
                                    <h3>{education.educationInstitute}</h3>
                                </div>
                            </div>
                        ))}

                        <button className="edu-addButton" onClick={handleEduButtonClick}>
                            +
                        </button>

                        {isEduFormVisible && (
                            <div className="edu-form">
                                <h3>Update your Educational Journey</h3>
                                <form onSubmit={handleSubmit(onSubmitSaveEdu)}>
                                    <div className="edu-institute">
                                        <label htmlFor="eduName" id="edu-name">Name of educational institute</label>
                                        <input type="text" id="eduName" {...register("eduName", { required: true })} />
                                    </div>

                                    <div className="edu-lvl">
                                        <label htmlFor="eduLevel" id="edu-level">Educational level</label>
                                        <input type="text" id="eduLevel" {...register("eduLevel", { required: true })} />
                                    </div>

                                    <button type="submit" id="edu-submit">Submit</button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            ) : (
                <div className="edu-login-popup">
                    <h2>Login to Access</h2>
                    <Link to="/login"><button>Login</button></Link>
                </div>
            )}
        </div>
    );
};

export default Education;
