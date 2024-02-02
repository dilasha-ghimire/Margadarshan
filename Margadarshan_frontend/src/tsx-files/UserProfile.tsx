import '../css-files/UserProfile.css'
import Header from './Header';
import { useEffect, useState } from 'react';
import axios from 'axios';
import BeforeLoginHeader from "./BeforeLoginHeader.tsx";
import { Link } from "react-router-dom";
import { useMutation } from 'react-query';
import { useForm } from 'react-hook-form';

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
    const { handleSubmit, register } = useForm();
    const loggedInUserId = localStorage.getItem("loggedInUserId");
    const [selectedCitizenshipFront, setSelectedCitizenshipFront] = useState(null);
    const [selectedCitizenshipBack, setSelectedCitizenshipBack] = useState(null);

    useEffect(() => {
        console.log("Logged in user: ", loggedInUserId);

        const fetchUserDetails = async () => {
            try {
                const loggedInUserId = localStorage.getItem("loggedInUserId");

                if (loggedInUserId) {
                    const response = await axios.post("http://localhost:8080/api/student-by-id", {
                        studentId: loggedInUserId,
                    });

                    setUserDetails(response.data);
                }
            } catch (error) {
                console.error("Error fetching logged-in user details: ", error.message);
            }
        };

        if (loggedInUserId) {
            fetchUserDetails();
        }
    }, []);

    const handleEditClick = async () => {
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

    const editProfile = useMutation({
        mutationKey: "SAVE CITIZENSHIP",
        mutationFn: async (requestData: any) => {
            console.log(requestData)
            try {
                const formData = new FormData();
                if (requestData.citizenshipFront && requestData.citizenshipFront.length > 0) {
                    formData.append("citizenshipFront", requestData.citizenshipFront[0]);
                }

                if (requestData.citizenshipBack && requestData.citizenshipBack.length > 0) {
                    formData.append("citizenshipBack", requestData.citizenshipBack[0]);
                }

                formData.append("studentId", loggedInUserId);
                formData.append("studentFullName", requestData.studentFullName);
                formData.append("studentAddress", requestData.studentAddress);
                formData.append("studentNumber", requestData.studentNumber);
                formData.append("studentEmail", requestData.studentEmail);

                const response = await axios.post("http://localhost:8080/api/update-student-profile", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                });

                console.log(response);
                return response.data;
            }
            catch (error) {
                console.error("Error uploading file:", error);
            }
        },
        onSuccess: () => {
            alert("Citizenship uploaded!");
            setEditProfileVisible(!isEditProfileVisible);
            window.location.reload();
        }
    })

    const onSubmitEditProfile = async (formData: any): void => {
        if(formData.citizenshipFront?.length !== 0 && formData.citizenshipBack?.length !== 0) {
            editProfile.mutate(formData);
        }
        else {
            delete formData?.citizenshipFront;
            delete formData?.citizenshipBack;
            formData.studentId=loggedInUserId;
            const response = await axios.post("http://localhost:8080/api/update-student-profile-without-citizenship", formData);
            console.log(response);
            alert("Profile updated!");
            setEditProfileVisible(!isEditProfileVisible);
            window.location.reload();
        }
    }

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
                                        <p className='detail-userP'>Name: {userDetails.studentFullName}</p>
                                        <p className='detail-userP'>Address: {userDetails.studentAddress}</p>
                                        <p className='detail-userP'>Mobile number: {userDetails.studentNumber}</p>
                                        <p className='detail-userP'>Email address: {userDetails.studentEmail}</p>
                                    </div>
                                ) : (
                                    <p>Loading user details...</p>
                                )}
                            </div>
                            <p className='edit-btn-userP' onClick={handleEditClick}>Edit</p>
                        </div>

                        <hr className='line-divider-userP'></hr>

                        {isEditProfileVisible && (
                            <form onSubmit={handleSubmit(onSubmitEditProfile)}>
                                <div className='edit-profile-form'>
                                    <div className='edit-profile-left-section'>
                                        <p className='edit-profile-text'>Name</p>
                                        <input {...register("studentFullName")} defaultValue={userDetails?.studentFullName} />
                                        <p className='edit-profile-text'>Address</p>
                                        <input {...register("studentAddress")} defaultValue={userDetails?.studentAddress} />
                                        <p className='edit-profile-text'>Mobile number</p>
                                        <input {...register("studentNumber")} defaultValue={userDetails?.studentNumber} />
                                        <button className='edit-profile-btn'>Update</button>
                                    </div>

                                    <div className='edit-profile-right-section'>
                                        <div className='citizenship-front-container-editProfile'>
                                            <p className='edit-profile-text'>Citizenship (front)</p>

                                            <label className='citizenship-front-label-editProfile' htmlFor='citizenshipFrontId'>

                                                {selectedCitizenshipFront ? (
                                                    <img src={selectedCitizenshipFront} className={'citizenship-img-editProfile'} alt="Selected Image"></img>
                                                ) : (
                                                    <img className='citizenship-img-editProfile'
                                                        src={userDetails?.citizenshipFrontString && userDetails.citizenshipFrontString.length > 0
                                                            ? userDetails.citizenshipFrontString
                                                            : 'src/assets/UserProfile/add citizenship.png'}></img>
                                                )}

                                            </label>

                                            <input id="citizenshipFrontId"
                                                type="file"
                                                className="citizenship-input-editProfile"
                                                {...register("citizenshipFront", {
                                                    onChange: (e) => {
                                                        const file = e.target.files[0];
                                                        if (file) {
                                                            const imageUrl = URL.createObjectURL(file);
                                                            setSelectedCitizenshipFront(imageUrl);
                                                        }
                                                    }
                                                })}
                                            ></input>
                                        </div>

                                        <div className='citizenship-back-container-editProfile'>
                                            <p className='edit-profile-text'>Citizenship (back)</p>

                                            <label className='citizenship-back-label-editProfile' htmlFor='citizenshipBackId'>

                                                {selectedCitizenshipBack ? (
                                                    <img src={selectedCitizenshipBack} className={'citizenship-img-editProfile'} alt="Selected Image"></img>
                                                ) : (
                                                    <img className='citizenship-img-editProfile'
                                                        src={userDetails?.citizenshipBackString && userDetails.citizenshipBackString.length > 0
                                                            ? userDetails.citizenshipBackString
                                                            : 'src/assets/UserProfile/add citizenship.png'}></img>
                                                )}

                                            </label>

                                            <input id="citizenshipBackId"
                                                type="file"
                                                className="citizenship-input-editProfile"
                                                {...register("citizenshipBack", {
                                                    onChange: (e) => {
                                                        const file = e.target.files[0];
                                                        if (file) {
                                                            const imageUrl = URL.createObjectURL(file);
                                                            setSelectedCitizenshipBack(imageUrl);
                                                        }
                                                    }
                                                })}
                                            ></input>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        )}

                        <p className='personal-details-userP'>User Identification</p>

                        <div className='citizenship-container'>
                            <div className='citizenship-front-container'>
                                <p className='citizenship-caption'>Citizenship (front)</p>
                                <img className='citizenship-img-userP'
                                    src={userDetails?.citizenshipFrontString && userDetails.citizenshipFrontString.length > 0
                                        ? userDetails.citizenshipFrontString
                                        : 'src/assets/UserProfile/add citizenship.png'}></img>
                            </div>

                            <div className='citizenship-back-container'>
                                <p className='citizenship-caption'>Citizenship (back)</p>
                                <img className='citizenship-img-userP'
                                    src={userDetails?.citizenshipBackString && userDetails.citizenshipBackString.length > 0
                                        ? userDetails.citizenshipBackString
                                        : 'src/assets/UserProfile/add citizenship.png'}></img>
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