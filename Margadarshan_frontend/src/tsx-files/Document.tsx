import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom"
import '../css-files/documentstyle.css';
import Header from "./Header.tsx";
import BeforeLoginHeader from "./BeforeLoginHeader.tsx";
import axios from "axios";

const Document: React.FC = () => {

    useEffect(() => {
        document.title = "Documents | Margadarshan"
    }, [])

    const [isDocFormVisible, setDocFormVisible] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [studentId, setStudentId] = useState(null);

    const handleDocButtonClick = () => {
        setDocFormVisible(!isDocFormVisible);
    };

    useEffect(() => {
        const storedID = localStorage.getItem('loggedInUserId');

        if (storedID) {
            setIsLoggedIn(true);
            setStudentId(storedID);
        }
        else {
            setIsLoggedIn(false);
            setStudentId(null);
        }
    }, []);

    const [docName, setDocName] = useState("");
    const [docFile, setDocFile] = useState(null);

    const handleFileSelect = (files) => {
        const file = files[0];
        if (file) {
            setDocFile(file);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('documentName', docName);
        formData.append('documentImage', docFile);
        formData.append('studentId', studentId);

        try {
            const response = await axios.post('http://localhost:8080/api/save-document', formData);

            if (response.data === "document saved") {
                console.log("Document saved successfully");
                window.alert("Document saved successfully");
            }
            else {
                console.error("Error saving document");
                window.alert("Error saving document");
            }
        }
        catch (error) {
            console.error("Error saving document:", error);
            window.alert("Error saving document");
        }
    };




    return (
        <div>
            {localStorage.getItem("loggedInUserId")? <Header/>:<BeforeLoginHeader/>}

            {isLoggedIn ? (
            <div className="doc-content">
                <div id="edu-navigation" className="edu-sidenavbar">
                    <div id="mySidenav" className="edu-sidenav-content">
                        <p>Portfolio</p>
                        <Link to="/education ">
                            <span>Education</span>
                        </Link>
                        <Link to="/document " className="doc-link">
                            <span>Documents</span>
                        </Link>
                        <Link to="/sop ">
                            <span>SoP and Essays</span>
                        </Link>
                    </div>
                </div>

                <div className="document-upload">

                    <div className="edu-title">
                        <h1>Documents</h1>
                        <p>Upload your documents here to be reviewed by our team. Please ensure that you have the necessary permissions to upload these files.</p>
                    </div>

                    <div className="doc-timeline">
                        <button className="edu-addButton" onClick={handleDocButtonClick}>
                            +
                        </button>

                        {isDocFormVisible && (
                            <div className="edu-form">
                                <h3>Upload Document</h3>
                                <form onSubmit={handleFormSubmit}>
                                    <div className="edu-institute">
                                        <label id="edu-name">Name of Document</label>
                                        <input
                                            type="text"
                                            id="eduName"
                                            value={docName}
                                            onChange={(e) => setDocName(e.target.value)}
                                        />
                                    </div>

                                    <div className="edu-lvl">
                                        <label id="edu-level">Browse files</label>
                                        <div className="doc-img-input">
                                            <div id="doc-form-img" style={{ width: "200px", height: "200px" }}>
                                                <div className="doc-preview" style={{ width: "90%", height: "100%", overflow: "hidden" }}>
                                                    {docFile && <img src={URL.createObjectURL(docFile)} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                                                </div>
                                            </div>
                                            <div id="doc-form-submit-btn">
                                                    <label htmlFor="docFile" className="doc-browse-button">Select</label>
                                                    <input
                                                        type="file"
                                                        id="docFile"
                                                        accept="image/*"
                                                        style={{ display: "none" }}
                                                        onChange={(e) => handleFileSelect(e.target.files)}
                                                    />
                                                    <button type="submit" id="edu-submit">Submit</button>
                                                </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            ) : (
                <div className="doc-login-popup">
                    <h2>Login to Access</h2>
                    <Link to="/login"><button>Login</button></Link>
                </div>
            )}
        </div>
    );
};

export default Document;