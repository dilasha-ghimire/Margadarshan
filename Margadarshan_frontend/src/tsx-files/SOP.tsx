import React, {useEffect, useState} from 'react';
import '../css-files/SOPUpload.css'
import '../css-files/SopDialogBox.css'
import Header from './Header';
import BeforeLoginHeader from "./BeforeLoginHeader.tsx";
import {Link} from "react-router-dom";

function SOP() {

    useEffect(() => {
        document.title = "SOP and Essays | Margadarshan"
    }, [])

    // handleUpload(e){
    //     console.log(this.state,)
    // }
    const [documentTitle, setDocumentTitle] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // const previewImage = (e) => {
    //     const input = e.target;
    const previewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.files,"$$$$");
        console.log(e.target.files[0],"$$$");
        const input = e.target ?? null;

        if (input.files && input.files[0]) {
            const reader = new FileReader();

            // reader.onload = (e) => {
            //     setImagePreview(e.target.result);
            // };
            reader.onload = (e) => {
                const result = e.target?.result as string;
                if (result) {
                    setImagePreview(result);
                }
            };

            reader.readAsDataURL(input.files[0]);
        }
    };

    useEffect(() => {
        const storedID = localStorage.getItem('loggedInUserId');

        if (storedID == null){
            setIsLoggedIn(false);
        }
        else {
            setIsLoggedIn(true);
        }
    }, []);


    const[isAddUniVisible,setAddUniVisible]=useState(false);
    const [bodyOpacity, setBodyOpacity] = useState(1);
    const handleButtonClick = () => {
        setAddUniVisible(!isAddUniVisible);
        setBodyOpacity(isAddUniVisible ? 1 : 0.3);

    };
   
    return(
    <>
        {localStorage.getItem("loggedInUserId")? <Header/>:<BeforeLoginHeader/>}

        {isLoggedIn ? (
        <div className="user-sop">
        <div className="rasmi" style={{ opacity: bodyOpacity }}>
        
        <div className="t">
          <span className="sop_info" >SOP and essays</span>
          <br /><br />
          <span className="sop_intro">Upload your SOP and essays for review</span>
          <br /><br />
          <button id="sopUploadButton" onClick={handleButtonClick}>
            <b>Click me</b>
          </button>
        </div>
      </div>
      {isAddUniVisible &&(
        <div className="sop_first-div">
            <form className="form">
        <div className="title">
            <label htmlFor="input-doc" id="document-name">Title of document</label>
            <br />
            <input
                type="text" value={documentTitle}
                onChange={(e) => setDocumentTitle(e.target.value)}
            />
        </div>
        
            <div id="image-preview">
                {imagePreview && <img src={imagePreview} alt="Preview" />}
            </div>
            <div className="select">
                <input
                    type="file"
                    id="input-doc"
                    name="file"
                    accept="image/*"
                    onChange={(e)=>previewImage(e)}
                />
                <input type="submit" value="Upload" />
            </div>
        </form>
    </div>
      )}
        </div>
        ) : (
            <div className="sop-login-popup">
                <h2>Login to Access</h2>
                <Link to="/login"><button>Login</button></Link>
            </div>
        )}
    </>
    )
}
export default SOP;
