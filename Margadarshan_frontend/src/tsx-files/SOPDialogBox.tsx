import React, { useState } from 'react';
import '../css-files/SopDialogBox.css'; // Make sure to import your CSS file

const SOPDialogBox= () => {
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

    return (
        <div className="first-div">
            <div className="title">
                <label htmlFor="input-doc" id="document-name">
                    Title of document
                </label>
                <br />
                <input
                    type="text"
                    id="input-doc"
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
                        id="photo-input"
                        accept="image/*"
                        onChange={previewImage}
                    />
                    <input type="submit" value="Upload" />
                </div>
            </form>
        </div>
    );
};

export default SOPDialogBox;
