import React, { useState, useEffect } from 'react';
import '../css-files/admindocumentstyle.css';
import AdminHeader from './AdminHeader';
import {useNavigate} from "react-router-dom";
import axios from "axios";

function AdminDocument() {

    const navigate = useNavigate();
    const [documents, setDocuments] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [filteredDocuments, setFilteredDocuments] = useState([]);


    useEffect(() => {
        const storedOTP = localStorage.getItem('adminOTP');

        if (storedOTP == null){
            navigate('/login');
        }
        else {
            fetchDocuments();
        }
    }, []);

    useEffect(() => {
        document.title = "Admin Document | Margadarshan"
    }, [])

    const fetchDocuments = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/get-all-documents');
            setDocuments(response.data);
            setFilteredDocuments(response.data);
        }
        catch (error) {
            console.error('Error fetching documents:', error);
        }
    };

    const openImageInNewTab = (imageUrl) => {
        window.open(imageUrl, '_blank');
    };

    const onSubmitDocSearch = (e) => {
        e.preventDefault();

        const filteredData = documents.filter(document =>
            document.studentName.toLowerCase().includes(searchInput.toLowerCase())
        );

        setFilteredDocuments(filteredData);
    };


    return (
        <>
            <AdminHeader />

            <div className="addoc-content">
                <div className="adprofile-mainbar">
                    <form onSubmit={onSubmitDocSearch}>
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
                <div className="addoc-dheader">
                    <h2>List of Documents of students</h2>
                </div>

                <div className="addoc-main-section">
                    <div className="addoc-studocuments-container">
                        <div className="addoc-data-container">
                            {filteredDocuments.map(document => (
                                <div key={document.documentId} className="admin-document-view">
                                    <p><strong>Student ID:</strong> {document.studentId}</p>
                                    <p><strong>Student Name:</strong> {document.studentName}</p>
                                    <p><strong>Document Name:</strong> {document.documentName}</p>
                                    <img
                                        className="adminDoc-image"
                                        src={`/document/${document.documentImageString}`}
                                        alt="Document"
                                        onClick={() => openImageInNewTab(`/document/${document.documentImageString}`)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </>
);
}

export default AdminDocument;

