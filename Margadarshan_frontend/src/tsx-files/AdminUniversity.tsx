import "../css-files/adminUniHeader.css";
import "../css-files/adminUniCentre.css";
import "../css-files/addUniversity.css";
import { useQuery } from "react-query";
import axios from "axios";
import { useState } from "react";

function AdminUniversity() {
    const { data } = useQuery({
        queryKey: "GETDATA",
        queryFn() {
            return axios.get("http://localhost:8080/api/universities")
        }
    })

    const [isAddUniVisible, setAddUniVisible] = useState(false);

    const toggleAddUniVisibility = () => {
        setAddUniVisible(!isAddUniVisible);
    }

    return (
        <>
            <div className="header-adminUni">
                <div className="header-left-adminUni">
                    <img className="logo-adminUni" src="src\assets\AboutPage\Margadarshan logo.png"></img>
                    <p className="margadarshan-adminUni">MARGADARSHAN</p>
                </div>
            </div>

            <div className="centre-adminUni">
                <div className="top-section-adminUni">
                    <div className="search-container-adminUni">
                        <label className="search-uni-adminUni">Search university:</label>

                        <div className="student-searchbar-container-adminUni">
                            <input className="student-searchbar-adminUni"></input>
                            <div className="student-searchbtn-container-adminUni">
                                <button className="student-searchbtn-adminUni">
                                    <img className="student-search-img-adminUni" src="src\assets\AdminUniversity\search.png"></img>
                                </button>
                            </div>
                        </div>
                    </div>

                    <button className="add-uni-btn-adminUni" onClick={() => setAddUniVisible(!isAddUniVisible)}>Add university</button>
                </div>

                {isAddUniVisible && (
                    <div className="add-uni-container-adminUni">
                        <div className="add-uni-left-sec">
                            <div className="file-img-container">
                                <img className="file-img-adminUni" src="src\assets\AdminUniversity\file icon.png"></img>
                            </div>
                            <button className="browse-button">Browse files</button>
                        </div>

                        <div className="add-uni-right-sec">
                            <div className="addUni-textfield">
                                <label className="uniName-addUni">Name of university</label>
                                <input className="uniName-field-addUni"></input>

                                <div className="uniCity-uniState-container-addUni">
                                    <div className="uniCity-container-addUni">
                                        <label className="uniCity-addUni">City</label>
                                        <input className="uniCity-field-addUni"></input>
                                    </div>
                                    <div className="uniState-addUni">
                                        <label className="uniState-addUni">State</label>
                                        <input className="uniState-field-addUni"></input>
                                    </div>
                                </div>

                                <label className="uniMajor-addUni">Major</label>
                                <input className="uniMajor-field-addUni"></input>
                                <label className="uniFees-addUni">Annual fees</label>
                                <input className="uniFees-field-addUni"></input>
                                <label className="uniLength-addUni">Length of study</label>
                                <input className="uniLength-field-addUni"></input>
                            </div>

                            <button className="upload-btn-addUni">Upload</button>
                        </div>
                    </div>
                )}

                <div className="adminUni-list">
                    {data?.data?.map((uni, index) => (
                        <div className="adminUni-container" key={index}>
                            <div className="adminUni-description-container">
                                <img className="adminUni-image" src="src\assets\University\Michigan_Technological_University_seal.svg.png" />
                                <div className="adminUni-desc">
                                    <p className="adminUni-name">{uni.name}</p>
                                    <p className="adminUni-state">{uni.city}, {uni.state}</p>
                                    <p className="adminUni-major">{uni.major}</p>
                                </div>
                            </div>
                            <div className="adminUni-fees-years">
                                <p className="adminUni-fees">${uni.fees}/year</p>
                                <p className="adminUni-length">{uni.length} years</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
export default AdminUniversity;
