import {useEffect, useState} from 'react';
import '../css-files/SOPUpload.css'
import '../css-files/SopDialogBox.css'
import Header from './Header';

function SOP() {

    useEffect(() => {
        document.title = "SOP and Essays | Margadarshan"
    }, [])

    const [documentTitle, setDocumentTitle] = useState('');
    const [imagePreview, setImagePreview] = useState('');

    // const previewImage = (e) => {
    //     const input = e.target;
    const previewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    const[isAddUniVisible,setAddUniVisible]=useState(false);
    const [bodyOpacity, setBodyOpacity] = useState(1);
    const handleButtonClick = () => {
        setAddUniVisible(!isAddUniVisible);
        setBodyOpacity(isAddUniVisible ? 1 : 0.3);
    };
   
    return(
    <>
    <Header/>
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
        <div className="title">
            <label htmlFor="input-doc" id="document-name">
                Title of document
            </label>
            <br />
            <input
                type="Inputtitle"
                value={documentTitle}
                onChange={(e) => setDocumentTitle(e.target.value)}
            />
        </div>
        <form action="" className="form">
            <div id="image-preview">
                {imagePreview && <img src={imagePreview} alt="Preview" />}
            </div>
            <div className="select">
                <input
                    type="file"
                    accept="image/*"
                    onChange={previewImage}
                />
                <input type="submit" value="Upload" />
            </div>
        </form>
    </div>

      )}
      

    </>
    )
}
export default SOP;
