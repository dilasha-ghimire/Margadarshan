import React, {useEffect, useState} from 'react';
import '../css-files/SOPUpload.css'
import '../css-files/SopDialogBox.css'
import Header from './Header';
import BeforeLoginHeader from "./BeforeLoginHeader.tsx";
import {Link} from "react-router-dom";
import "../css-files/documentstyle.css"
import axios from "axios";
function SOP() {

    useEffect(() => {
        document.title = "SOP and Essays | Margadarshan"
    }, [])


    const [documents, setDocuments] = useState([]);

    const fetchDocuments = async (studentId) => {
        try {
            const response = await axios.post('http://localhost:8080/api/retrieve-sop', {
                studentId
            });
            setDocuments(response.data);
            console.log(response.data);
        }
        catch (error) {
            console.error("Error fetching documents:", error);
        }
    };

   // upload
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // const [studentId, setStudentId] = useState(null);
    const [studentId, setStudentId] = useState<string | null>(null);

    useEffect(() => {
        const storedID = localStorage.getItem('loggedInUserId');

        if (storedID) {
            setIsLoggedIn(true);
            setStudentId(storedID);
            fetchDocuments(storedID);
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
            if (file.type !== "application/pdf") {
                window.alert("Please select a PDF file.");
                return;
            }
            setDocFile(file);
        }
    };
    const[isAddUniVisible,setAddUniVisible]=useState(false);
    const [bodyOpacity, setBodyOpacity] = useState(1);
    const handleButtonClick = () => {
        setAddUniVisible(!isAddUniVisible);
        setBodyOpacity(isAddUniVisible ? 1 : 0.3);

    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!docFile) {
            window.alert("Please select a PDF file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append('sopName', docName);
        formData.append('sopPdf', docFile);
        // formData.append('studentId', studentId);
        if (studentId !== null) {
            formData.append('studentId', studentId);
            window.alert("pdf saved successfully");
        } else {
            console.error("studentId is null. Unable to append to FormData.");
            // Handle the error or display a message to the user
            return;
        }


        try {
            const response = await axios.post('http://localhost:8080/api/save-sop', formData);
            console.log("Server response:", response);

            if (response.data === "sop saved") {
                console.log("pdf saved successfully");
                window.alert("pdf saved successfully");
            }
            else {
                console.error("Error saving pdf");
                // window.alert("Error saving pdf");
            }
        }
        catch (error) {
            console.error("Error saving file:", error);
            window.alert("Error saving file");
        }
    };


    return(
        <>
        <div>
            {localStorage.getItem("loggedInUserId")? <Header/>:<BeforeLoginHeader/>}

            {isLoggedIn ? (
            <div className="doc-content">
                <div id="edu-navigation" className="edu-sidenavbar">
                    <div id="mySidenav" className="edu-sidenav-content">
                        <p>Portfolio</p>
                        <Link to="/education " >
                            <span>Education</span>
                        </Link>
                        <Link to="/document ">
                            <span>Documents</span>
                        </Link>
                        <Link to="/sop" className="doc-link">
                            <span>SoP and Essays</span>
                        </Link>
                    </div>
                </div>

                <div className='document-upload'>
            <div className="edu-main" style={{ opacity: bodyOpacity }}>
                <div className="edu-title">
                    <span className="sop_info" >SOP and essays</span>
                    <br />
                    <span className="sop_intro">Upload your SOP and essays for review</span>
                    <p></p>
                    <p></p>
                    <br />
                </div>
                <button className="doc-addButton" onClick={handleButtonClick}>
                        +
                    </button>
            </div>

            <div className='doc-timeline'>
            <div className="doc-data-display">
                            {documents.map(document => (
                                <div key={document.sopId} className="document-view">
                                    <h3>{document.sopName}</h3>
                                    {/* <p>t{document.sopPdfString}</p> */}
                                    <object data={`data:application/pdf;base64, `+document.sopPdfString} type="application/pdf" width="100%" height="500px"></object>
                                </div>
                            ))}
                        </div>

            {isAddUniVisible &&(
                <div className='doc-form'>
                {/* <div className="sop_first-div"> */}
                    <form className="form" onSubmit={handleFormSubmit}>
                        <div className="title">
                            <label id="document-name">Title of document</label>
                            <br />
                            <input
                                // type="text"
                                id="input-doc"
                                value={docName}
                                onChange={(e) => setDocName(e.target.value)}
                            />
                        </div>
                        <div className="select">
                            <input
                                type="file"
                                id="docFile"
                                name="file"
                                accept=".pdf"
                                onChange={(e) => handleFileSelect(e.target.files)}
                            />
                            {/*<input type="submit" value="Upload" />*/}
                            <button className='sop_uploadbtn' type="submit">upload</button>
                        </div>
                    </form>
                {/* </div> */}
                </div>
            )}
            </div>
            </div>
            </div>

            ) : (
    <div className="edu-login-popup">
        <h2>Login to Access</h2>
        <Link to="/login">
            <button>Login</button>
        </Link>
    </div>
)}
            </div>
        </>
    )
}
export default SOP;


