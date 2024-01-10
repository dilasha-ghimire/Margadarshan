import AdminHeader from "./AdminHeader";
import "../css-files/adminScholarship.css";
import "../css-files/addScholarship.css";
import { useState } from "react";

function AdminScholarship() {
    const [isAddSchVisible, setAddSchVisible] = useState(false);
    return (
        <>
            <AdminHeader />

            <div className="centre-adminSch">
                <div className="top-section-adminSch">
                    <div className="search-container-adminSch">
                        <label className="search-sch-adminSch">Search scholarship:</label>

                        <form>
                            <div className="searchbar-container-adminSch">
                                <input className="searchbar-adminSch"></input>
                                <div className="searchbtn-container-adminSch">
                                    <button className="searchbtn-adminSch" type="submit">
                                        <img className="search-img-adminSch" src="src\assets\AdminUniversity\search.png"></img>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    <button className="add-sch-btn-adminSch" onClick={() => setAddSchVisible(!isAddSchVisible)}>Add scholarship</button>
                </div>
            </div>

            {isAddSchVisible && (
                    <div className="add-sch-mainContainer-addSch">
                        <form>
                            <div className="add-sch-sub1-addSch">
                                <div className="add-sch-left-sec">

                                    <label className="file-upload-label-addSch" htmlFor="scholarshipImageId">
                                        <div className="file-img-container-addSch">
                                            <img className="file-img-addSch" src="src\assets\AdminUniversity\file upload1.png"></img>
                                        </div>
                                        <button className="browse-button-addSch" type="submit">Browse files</button>
                                    </label>

                                    <input id="scholarshipImageId" type="file" className="file-input-addSch"></input>
                                </div>

                                <div className="add-sch-right-sec">
                                    <div className="addSch-textfield">
                                        <label className="schName-addSch">Name of scholarship</label>
                                        <input className="schName-field-addSch"></input>

                                        <label className="schSponsor-addSch">Institution/Scholarship sponsor</label>
                                        <input className="schSponsor-field-addSch"></input>

                                        <label className="schType-addSch">Type of scholarship</label>
                                        <input className="schType-field-addSch"></input>

                                        <div className="schGrant-schGPA-container-addSch">
                                            <div className="schGrant-container-addSch">
                                                <label className="schGrant-addSch">Grant</label>
                                                <input className="schGrant-field-addSch"></input>
                                            </div>
                                            <div className="schGPA-addSch">
                                                <label className="schGPA-addSch">Minimum GPA required</label>
                                                <input className="schGPA-field-addSch"></input>
                                            </div>
                                        </div>

                                        <label className="schDeadline-addSch">Deadline</label>
                                        <input className="schDeadline-field-addSch"></input>
                                    </div>

                                    <button className="upload-btn-addSch" type="submit">Upload</button>
                                </div>
                            </div>
                        </form>
                    </div>
                )}
        </>
    )
}

export default AdminScholarship;