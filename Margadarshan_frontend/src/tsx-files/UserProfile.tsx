import '../css-files/UserProfile.css'
import Header from './Header';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BeforeLoginHeader from "./BeforeLoginHeader.tsx";
import { Link } from "react-router-dom";

function UserProfile() {

    useEffect(() => {
        document.title = "Profile | Margadarshan"
    }, [])

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedID = localStorage.getItem('loggedInUserId');

        if (storedID == null) {
            setIsLoggedIn(false);
        }
        else {
            setIsLoggedIn(true);
        }
    }, []);


    const [userDetails, setUserDetails] = useState(null);
    const [isEditProfileVisible, setEditProfileVisible] = useState(false);

    useEffect(() => {
        const loggedInUserId = localStorage.getItem("loggedInUserId");
        console.log("Logged in user: ", loggedInUserId);

        const fetchUserDetails = async () => {
            try {
                const response = await axios.post(`http://localhost:8080/api/student-by-id/${loggedInUserId}`);
                setUserDetails(response.data);
            }
            catch (error) {
                console.error("Error fetching logged-in user details: ", error.message);
            }
        };

        console.log("user details: ", userDetails)

        if (loggedInUserId) {
            fetchUserDetails();
        }
    }, []);

    const handleEditClick =async () => {
        setEditProfileVisible(!isEditProfileVisible);
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            const editForm = document.querySelector(".edit-profile-form");
            const editButton = document.querySelector(".edit-btn-userP");
    
            if (editForm && editButton && !editForm.contains(event.target) && !editButton.contains(event.target)) {
                setEditProfileVisible(false);
            }
        };
    
        document.body.addEventListener("click", handleClickOutside);
    
        return () => {
            document.body.removeEventListener("click", handleClickOutside);
        };
    }, [setEditProfileVisible]);

    return (
        <>
            {localStorage.getItem("loggedInUserId") ? <Header /> : <BeforeLoginHeader />}

            {isLoggedIn ? (
                <>
                    <div className='left-section-userP'>
                        <p className='title-userP'>Profile</p>
                        <img className='main-img-userP' src='src\assets\Registration\margadarshan.png'></img>
                    </div>
                    <div className='right-section-userP'>
                        <div className='personal-details-edit-btn-container'>
                            <div className='userDetails-userP-container'>
                                <p className='personal-details-userP'>Personal details</p>
                                {userDetails ? (
                                    <div className='logged-in-user-container'>
                                        <p className='detail-userP'>Name: {userDetails.fullName}</p>
                                        <p className='detail-userP'>Address: {userDetails.address}</p>
                                        <p className='detail-userP'>Mobile number: {userDetails.number}</p>
                                        <p className='detail-userP'>Email address: {userDetails.email}</p>
                                    </div>
                                ) : (
                                    <p>Loading user details...</p>
                                )}
                            </div>
                            <p className='edit-btn-userP' onClick={handleEditClick}>Edit</p>
                        </div>

                        <hr className='line-divider-userP'></hr>

                        {isEditProfileVisible && (
                            <form>
                                <div className='edit-profile-form'>
                                    <p className='edit-profile-text'>Name</p>
                                    <input></input>
                                    <p className='edit-profile-text'>Address</p>
                                    <input></input>
                                    <p className='edit-profile-text'>Mobile number</p>
                                    <input></input>
                                    <button className='edit-profile-btn'>Update</button>
                                </div>
                            </form>
                        )}

                        <p className='personal-details-userP'>User Identification</p>

                        <div className='citizenship-container'>
                            <div className='citizenship-front-container'>
                                <p className='citizenship-caption'>Citizenship (front)</p>

                                <label className='citizenship-front-label' htmlFor='citizenshipFrontId'>
                                    <img className='citizenship-img-userP' src='src\assets\UserProfile\add citizenship.png'></img>
                                </label>

                                <input id="citizenshipFrontId"
                                    type="file"
                                    className="citizenship-input"
                                ></input>
                            </div>

                            <div className='citizenship-back-container'>
                                <p className='citizenship-caption'>Citizenship (back)</p>

                                <label className='citizenship-front-label' htmlFor='citizenshipFrontId'>
                                    <img className='citizenship-img-userP' src='src\assets\UserProfile\add citizenship.png'></img>
                                </label>

                                <input id="citizenshipFrontId"
                                    type="file"
                                    className="citizenship-input"
                                ></input>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="profile-login-popup">
                    <h2>Login to Access</h2>
                    <Link to="/login"><button>Login</button></Link>
                </div>
            )}
        </>
    )
}

export default UserProfile;