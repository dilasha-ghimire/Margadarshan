import AdminHeader from "./AdminHeader";
import "../css-files/adminScholarship.css";
import "../css-files/addScholarship.css";
import { useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";

function AdminScholarship() {
    const [isAddSchVisible, setAddSchVisible] = useState(false);
    const { register, handleSubmit } = useForm();
    const [filteredSch, setFilteredSch] = useState([]);

    const { data, refetch } = useQuery({
        queryKey: "GETDATA",
        queryFn() {
            return axios.get("http://localhost:8080/api/scholarships")
        },
        
    })

    const scholarship = data?.data || [];
    const displayScholarship = filteredSch.length > 0 ? filteredSch : scholarship;

    const saveScholarship = useMutation({
        mutationKey: "SAVE_DATA",
        mutationFn: async (requestData: any) => {
            try {
                const formData = new FormData();
                formData.append("scholarshipImage", requestData.scholarshipImage[0]);
                formData.append("scholarshipName", requestData.scholarshipName);
                formData.append("scholarshipOrganization", requestData.scholarshipOrganization);
                formData.append("scholarshipType", requestData.scholarshipType);
                formData.append("grant", requestData.grant);
                formData.append("scholarshipGpa", requestData.scholarshipGpa);
                formData.append("scholarshipDeadline", requestData.scholarshipDeadline);

                const response = await axios.post("http://localhost:8080/api/save-scholarship", formData, {
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
            setAddSchVisible(false);
            alert("The scholarship has been registered!");
            refetch();
        },
    });

    const onSubmitAddSch = (formData: any): void => {
        saveScholarship.mutate(formData);
    };

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

                {isAddSchVisible && (
                    <div className="add-sch-mainContainer-addSch">
                        <form onSubmit={handleSubmit(onSubmitAddSch)}>
                            <div className="add-sch-sub1-addSch">
                                <div className="add-sch-left-sec">

                                    <label className="file-upload-label-addSch" htmlFor="scholarshipImageId">
                                        <div className="file-img-container-addSch">
                                            <img className="file-img-addSch" src={"src/assets/AdminUniversity/file upload1.png"}></img>
                                        </div>
                                        <button className="browse-button-addSch" type="submit">Browse files</button>
                                    </label>

                                    <input id="scholarshipImageId" type="file" className="file-input-addSch" {...register("scholarshipImage")}></input>
                                </div>

                                <div className="add-sch-right-sec">
                                    <div className="addSch-textfield">
                                        <label className="schName-addSch">Name of scholarship</label>
                                        <input className="schName-field-addSch" {...register("scholarshipName")}></input>

                                        <label className="schSponsor-addSch">Institution/Scholarship sponsor</label>
                                        <input className="schSponsor-field-addSch" {...register("scholarshipOrganization")}></input>

                                        <label className="schType-addSch">Type of scholarship</label>
                                        <input className="schType-field-addSch" {...register("scholarshipType")}></input>

                                        <div className="schGrant-schGPA-container-addSch">
                                            <div className="schGrant-container-addSch">
                                                <label className="schGrant-addSch">Grant</label>
                                                <input className="schGrant-field-addSch" {...register("grant")}></input>
                                            </div>
                                            <div className="schGPA-addSch">
                                                <label className="schGPA-addSch">Minimum GPA required</label>
                                                <input className="schGPA-field-addSch" {...register("scholarshipGpa")}></input>
                                            </div>
                                        </div>

                                        <label className="schDeadline-addSch">Deadline</label>
                                        <input className="schDeadline-field-addSch" {...register("scholarshipDeadline")}></input>
                                    </div>

                                    <button className="upload-btn-addSch" type="submit">Upload</button>
                                </div>
                            </div>
                        </form>
                    </div>
                )}

                <div className="adminSch-list">
                    {displayScholarship.map((sch, index) => (
                        <div className="adminSch-main-container" key={index}>
                            <p className="edit-sch-btn">Edit</p>
                            <div className="adminSch-container">
                                <div className="adminSch-description-container">
                                    <img className="adminSch-image" src={`/${sch.scholarshipImage}`}/>
                                    <div className="adminSch-desc">
                                        <p className="adminSch-name">{sch.scholarshipName}</p>
                                        <p className="adminSch-org">{sch.scholarshipOrganization}</p>
                                        <p className="adminSch-type">{sch.scholarshipType}</p>
                                        <p className="adminSch-grant">Grant: {sch.grant}</p>
                                    </div>
                                </div>
                                <div className="adminSch-deadline-container">
                                    <p className="adminSch-deadline-text">Deadline</p>
                                    <p className="adminSch-deadline">{sch.scholarshipDeadline}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default AdminScholarship;