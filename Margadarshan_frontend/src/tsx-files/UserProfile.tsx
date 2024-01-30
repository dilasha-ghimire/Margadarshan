import '../css-files/UserProfile.css'
import Header from './Header';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BeforeLoginHeader from "./BeforeLoginHeader.tsx";
import {Link} from "react-router-dom";

function UserProfile() {

    useEffect(() => {
        document.title = "Profile | Margadarshan"
    }, [])

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedID = localStorage.getItem('loggedInUserId');

        if (storedID == null){
            setIsLoggedIn(false);
        }
        else {
            setIsLoggedIn(true);
        }
    }, []);


    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        const loggedInUserId = localStorage.getItem("loggedInUserId");
        console.log("Logged in user: ",loggedInUserId);

        const fetchUserDetails = async () => {
            try {
                const response = await axios.post(`http://localhost:8080/api/student-by-id/${loggedInUserId}`);
                setUserDetails(response.data);
            }
            catch(error) {
                console.error("Error fetching logged-in user details: ", error.message);
            }
        };

        console.log("user details: ", userDetails)

        if(loggedInUserId) {
            fetchUserDetails();
        }
    }, []);

    return (
        <>
            {localStorage.getItem("loggedInUserId")? <Header/>:<BeforeLoginHeader/>}

            {isLoggedIn ? (
                <>
                    <div className='left-section-userP'>
                        <p className='title-userP'>Profile</p>
                        <img className='main-img-userP' src='src\assets\Registration\margadarshan.png'></img>
                    </div>
                    <div className='right-section-userP'>
                        <p className='personal-details-userP'>Personal details</p>

                        {userDetails ? (
                            <div className='logged-in-user-container'>
                                <p>Name: {userDetails.fullName}</p>
                                <p>Address: {userDetails.address}</p>
                                <p>Mobile number: {userDetails.number}</p>
                                <p>Email address: {userDetails.email}</p>
                            </div>
                        ) : (
                            <p>Loading user details...</p>
                        )}
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