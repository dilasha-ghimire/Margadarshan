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
    const [documents, setDocuments] = useState([]);
    const [editingDocumentId, setEditingDocumentId] = useState(null);
    const [docName, setDocName] = useState("");
    const [docFile, setDocFile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isNewFileSelected, setIsNewFileSelected] = useState(false);
    const [docImagePreview, setDocImagePreview] = useState(null);

    const handleDocButtonClick = () => {
        setDocFormVisible(!isDocFormVisible);
        setIsEditing(false);
        setEditingDocumentId(null);
    };

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

    const handleDocFileSelect = (files) => {
        const file = files[0];
        if (file) {
            setDocFile(file);
            setIsNewFileSelected(true);
        }
    };

    useEffect(() => {
        if (isEditing && editingDocumentId && isNewFileSelected && docFile) {
            const reader = new FileReader();
            reader.onload = () => {
                const imageUrl = reader.result;
                setDocImagePreview(imageUrl);
            };
            reader.readAsDataURL(docFile);
        }
        else {
            setDocImagePreview(null);
        }
    },
        [isEditing, editingDocumentId, isNewFileSelected, docFile]);

    const openImageInNewTab = (imageUrl) => {
        window.open(imageUrl, '_blank');
    };

    const handleEditDocClick = (event) => {
        const documentId = parseInt(event.currentTarget.dataset.id);
        console.log(documentId);
        const documentToEdit = documents.find(doc => doc.documentId === documentId);
        if (documentToEdit) {
            setIsEditing(true);
            setEditingDocumentId(documentToEdit);
            setDocName(documentToEdit.documentName);
            setDocFormVisible(true);
        }
    }

    const handleDocFormSubmit = async (e) => {
        e.preventDefault();

        if (!docFile) {
            window.alert("Please select a document to upload.");
            setDocFormVisible(false);
            return;
        }

        if (!docFile.type.startsWith('image/')) {
            window.alert("Please select an image file.");
            setDocFormVisible(false);
            return;
        }

        const formData = new FormData();
        formData.append('documentName', docName);
        formData.append('documentImage', docFile);
        formData.append('studentId', studentId);

        try {
            let response;
            if (isEditing) {
                formData.append('documentId', editingDocumentId.documentId);
                response = await axios.post('http://localhost:8080/api/update-documents', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }
            else {
                response = await axios.post('http://localhost:8080/api/save-document', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }

            if (response.data === "Documents fulfilled") {
                window.alert("Selections of documents are limited to five.");
                setDocFormVisible(false);
                setDocName("");
                setDocFile(null);

            }
            else if (response.data === "document saved" || response.data === "Data updated") {
                const successMessage = isEditing ? "Document updated successfully" : "Document saved successfully";
                console.log(successMessage);
                window.alert(successMessage);
                setDocFormVisible(false);
                fetchDocuments(studentId);
                setDocName("");
                setDocFile(null);
            }
            else {
                console.error("Error saving document");
                window.alert("Error saving document");
                setDocFormVisible(false);
                setDocName("");
                setDocFile(null);
            }
        }
        catch (error) {
            console.error("Error saving document:", error);
            window.alert("Error saving document");
        }
    };

    const fetchDocuments = async (studentId) => {
        try {
            const response = await axios.post('http://localhost:8080/api/view-documents', {
                studentId
            });
            setDocuments(response.data);
            console.log(response.data);
        }
        catch (error) {
            console.error("Error fetching documents:", error);
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

                    <button className="doc-addButton" onClick={handleDocButtonClick}>
                        +
                    </button>

                    <div className="doc-timeline">
                        <div className="doc-data-display">
                            {documents.map(document => (
                                <div key={document.documentId} className="document-view">
                                    <h3>{document.documentName}</h3>
                                    <img
                                        className="adminDoc-image"
                                        src={`/document/${document.documentImageString}`}
                                        alt="Document"
                                        onClick={() => openImageInNewTab(`/document/${document.documentImageString}`)}
                                    />
                                    <p className="edit-doc-btn" data-id={document.documentId} onClick={handleEditDocClick}>Edit</p>
                                </div>
                            ))}
                        </div>


                        {isDocFormVisible && (
                            <div className="doc-form">
                                <h3>{isEditing ? 'Edit Document' : 'Upload Document'}</h3>
                                <form onSubmit={handleDocFormSubmit}>
                                    <div className="edu-institute">
                                        <label id="edu-name">Name of Document</label>
                                        <select
                                            id="eduName"
                                            value={docName}
                                            onChange={(e) => setDocName(e.target.value)}
                                            required
                                            type="text"
                                        >
                                            <option value="">Document name</option>
                                            <option value="Resume/CV">Resume/CV</option>
                                            <option value="High School Diploma">High School Diploma</option>
                                            <option value="High School Transcript">High School Transcript</option>
                                            <option value="Bachelors' Degree">Bachelors' Degree</option>
                                            <option value="Bachelors' Transcript">Bachelors' Transcript</option>
                                            <option value="SAT/GRE">SAT/GRE</option>
                                            <option value="IELTS/TOEFL">IELTS/TOEFL</option>
                                        </select>
                                    </div>

                                    <div className="edu-lvl">
                                        <label id="edu-level">Browse files</label>
                                        <div className="doc-img-input">
                                            <div id="doc-form-img" style={{ width: "200px", height: "200px" }}>
                                                <div className="doc-preview" style={{ width: "100%", height: "100%", overflow: "hidden" }}>
                                                    {isEditing && editingDocumentId && docImagePreview ? (
                                                        <img
                                                            src={docImagePreview}
                                                            alt="Newly Selected Image Preview"
                                                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                                        />
                                                    ) : isEditing && editingDocumentId && !docImagePreview ? (
                                                        <img
                                                            src={`/document/${editingDocumentId.documentImageString}`}
                                                            alt="Existing Document"
                                                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                                        />
                                                    ) : isNewFileSelected && docFile ? (
                                                        <img
                                                            src={URL.createObjectURL(docFile)}
                                                            alt="Preview"
                                                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                                        />
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div id="doc-form-submit-btn">
                                                    <label htmlFor="docFile" className="doc-browse-button">Select</label>
                                                    <input
                                                        type="file"
                                                        id="docFile"
                                                        accept="image/*"
                                                        style={{ display: "none" }}
                                                        onChange={(e) => handleDocFileSelect(e.target.files)}
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