import AdminHeader from "./AdminHeader";
import "../css-files/adminScholarship.css";
import "../css-files/addScholarship.css";
import "../css-files/editScholarship.css";
import { useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useEffect } from "react";

function AdminScholarship() {
    const [isAddSchVisible, setAddSchVisible] = useState(false);
    const { register, handleSubmit, setValue } = useForm();
    const [filteredSch, setFilteredSch] = useState([]);
    const [isEditSchVisible, setEditSchVisible] = useState(false);
    const [scholarshipDetails, setScholarshipDetails] = useState({});
    const [searchInput, setSearchInput] = useState("");

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

    useEffect(() => {
        if (isEditSchVisible && scholarship) {
            setValue("scholarshipImage", scholarshipDetails?.scholarshipImage);
            setValue("scholarshipName", scholarshipDetails?.scholarshipName);
            setValue("scholarshipOrganization", scholarshipDetails?.scholarshipOrganization);
            setValue("scholarshipType", scholarshipDetails?.scholarshipType);
            setValue("grant", scholarshipDetails?.grant);
            setValue("scholarshipGpa", scholarshipDetails?.scholarshipGpa);
            setValue("scholarshipDeadline", scholarshipDetails?.scholarshipDeadline);
            setValue("id", scholarshipDetails?.id);

        }
        else {
            setValue("scholarshipName", "");
            setValue("scholarshipOrganization", "");
            setValue("scholarshipType", "");
            setValue("grant", "");
            setValue("scholarshipGpa", "");
            setValue("scholarshipDeadline", "");
            setValue("id", "");

        }
    }, [isEditSchVisible, scholarshipDetails, setValue]);

    const handleEditClick = async (scholarshipId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/scholarship-by-id/${scholarshipId}`);
            const scholarshipDetails = response.data;
            console.log("Scholarship details:", scholarshipDetails);

            setScholarshipDetails(scholarshipDetails);
        }
        catch (error) {
            console.error("Error fetching scholarship details", error);
        }

        setEditSchVisible(!isEditSchVisible);
    };

    const editScholarship = useMutation({
        mutationKey: "SAVE_DATA",
        mutationFn: async (requestData: any) => {
            console.log(requestData)
            console.log("Image: ",requestData.scholarshipImage);
            try {
                const formData = new FormData();
                if (requestData.scholarshipImage && requestData.scholarshipImage.length > 0) {
                    formData.append("scholarshipImage", requestData.scholarshipImage[0]);
                }
                formData.append("scholarshipName", requestData.scholarshipName);
                formData.append("scholarshipOrganization", requestData.scholarshipOrganization);
                formData.append("scholarshipType", requestData.scholarshipType);
                formData.append("grant", requestData.grant);
                formData.append("scholarshipGpa", requestData.scholarshipGpa);
                formData.append("scholarshipDeadline", requestData.scholarshipDeadline);
                formData.append("scholarshipId", requestData.id);

                const response = await axios.post("http://localhost:8080/api/update-scholarship", formData, {
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
            setEditSchVisible(false);
            alert("Updated!");
            refetch();
        },
    });

    const onSubmitEditSch = async (formData: any): void => {
        debugger;
        console.log(typeof formData.scholarshipImage)
        if (typeof formData.scholarshipImage!=="string") {
            editScholarship.mutate(formData);
        } 
        else {
            
            delete formData?.scholarshipImage;
            formData.scholarshipId=formData.id;
            const response = await axios.post("http://localhost:8080/api/update-scholarship-without-image", formData);
            console.log(response);
            refetch();
            setEditSchVisible(false);
            alert("Updated!");
        }
    }

    const deleteScholarship = useMutation({
        mutationKey: ["DELETE DATA"],
        mutationFn: (id: number) => {
            return axios.delete(`http://localhost:8080/api/delete-scholarship/${id}`);
        },
        onSuccess: () => {
            setEditSchVisible(false);
            refetch();
            alert("The university has been removed");
        },
    });

    const getSchDetails = useMutation({
        mutationKey: "SAVE DATA",
        mutationFn: (requestData: any) => {
            console.log(requestData)
            return axios.post("http://localhost:8080/api/scholarships-by-name", requestData);
        },
        onSuccess: (response) => {
            setFilteredSch(response.data);
        }
    });

    const onSubmitSearch = async (value: any) => {
        try {
            if (value.scholarshipName.trim() !== "") {
                await getSchDetails.mutateAsync(value);
            } 
            else {
                setFilteredSch([]);
            }
        }
        catch (error) {
            console.error("Error filtering scholarship", error);
            setFilteredSch([]);
        }
    }

    useEffect(() => {
        if (!searchInput) {
            setFilteredSch([]);
        }
    }, [searchInput]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            const editForm = document.querySelector(".edit-sch-mainContainer-editSch");

            if (editForm && !editForm.contains(event.target)) {
                setEditSchVisible(false);
            }
        };

        document.body.addEventListener("click", handleClickOutside);

        return () => {
            document.body.removeEventListener("click", handleClickOutside);
        };
    }, [setEditSchVisible]);

    return (
        <>
            <AdminHeader />

            <div className="centre-adminSch">
                <div className="top-section-adminSch">
                    <div className="search-container-adminSch">
                        <label className="search-sch-adminSch">Search scholarship:</label>

                        <form onSubmit={handleSubmit(onSubmitSearch)}>
                            <div className="searchbar-container-adminSch">
                                <input className="searchbar-adminSch" {...register("scholarshipName")}
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}></input>
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

                {isEditSchVisible && (
                    <div className="edit-sch-mainContainer-editSch">
                        <form onSubmit={handleSubmit(onSubmitEditSch)}>
                            <div className="edit-sch-sub1-editSch">
                                <div className="edit-sch-left-sec">

                                    <label className="file-upload-label-editSch" htmlFor="scholarshipImageId">
                                        <div className="file-img-container-editSch">
                                            <img className="file-img-editSch" src={scholarshipDetails?.scholarshipImage || "src/assets/AdminUniversity/file upload1.png"}></img>
                                        </div>
                                        <button className="browse-button-editSch" type="submit">Browse files</button>
                                    </label>

                                    <input id="scholarshipImageId" type="file" className="file-input-editSch" {...register("scholarshipImage")}></input>
                                </div>

                                <div className="edit-sch-right-sec">
                                    <div className="editSch-textfield">
                                        <label className="schName-editSch">Name of scholarship</label>
                                        <input className="schName-field-editSch" {...register("scholarshipName")}></input>

                                        <label className="schSponsor-editSch">Institution/Scholarship sponsor</label>
                                        <input className="schSponsor-field-editSch" {...register("scholarshipOrganization")}></input>

                                        <label className="schType-editSch">Type of scholarship</label>
                                        <input className="schType-field-editSch" {...register("scholarshipType")}></input>

                                        <div className="schGrant-schGPA-container-editSch">
                                            <div className="schGrant-container-editSch">
                                                <label className="schGrant-editSch">Grant</label>
                                                <input className="schGrant-field-editSch" {...register("grant")}></input>
                                            </div>
                                            <div className="schGPA-editSch">
                                                <label className="schGPA-editSch">Minimum GPA required</label>
                                                <input className="schGPA-field-editSch" {...register("scholarshipGpa")}></input>
                                            </div>
                                        </div>

                                        <label className="schDeadline-editSch">Deadline</label>
                                        <input className="schDeadline-field-editSch" {...register("scholarshipDeadline")}></input>
                                    </div>

                                    <div className="edit-sch-buttons">
                                        <button className="editSch-delete-btn" type="button" onClick={() => {
                                            deleteScholarship.mutate(scholarshipDetails.id);
                                        }}>Delete</button>

                                        <button className="editSch-update-btn" type="submit">Update</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                )}

                <div className="adminSch-list">
                    {displayScholarship.map((sch, index) => (
                        <div className="adminSch-main-container" key={index}>
                            <p className="edit-sch-btn" onClick={() => handleEditClick(sch.id)}>Edit</p>
                            <div className="adminSch-container">
                                <div className="adminSch-description-container">
                                    <img className="adminSch-image" src={`/${sch.scholarshipImage}`} />
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