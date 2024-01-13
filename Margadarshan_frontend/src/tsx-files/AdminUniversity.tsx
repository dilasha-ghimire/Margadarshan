import "../css-files/adminUniHeader.css";
import "../css-files/adminUniCentre.css";
import "../css-files/addUniversity.css";
import "../css-files/editUniversityAdmin.css";
import { useQuery } from "react-query";
import axios from "axios";
import { useState } from "react";
import { useMutation } from "react-query";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

function AdminUniversity() {
    const [isAddUniVisible, setAddUniVisible] = useState(false);
    const [isEditUniVisible, setEditUniVisible] = useState(false);
    const [filteredUni, setFilteredUni] = useState([]);
    const [universityDetails, setUniversityDetails] = useState({});
    const { register, handleSubmit, setValue } = useForm();

    useEffect(()=>{
        if(isEditUniVisible && universityDetails){
            setValue("universityName",universityDetails?.name),
            setValue("universityCity",universityDetails?.city),
            setValue("universityState",universityDetails?.state),
            setValue("universityMajor",universityDetails?.major),
            setValue("universityFees",universityDetails?.fees),
            setValue("universityLength",universityDetails?.length)
        }
        else {
            setValue("universityName", "");
            setValue("universityCity", "");
            setValue("universityState", "");
            setValue("universityMajor", "");
            setValue("universityFees", "");
            setValue("universityLength", "");
        }
    },[isEditUniVisible, universityDetails, setValue]);

    const { data, refetch } = useQuery({
        queryKey: "GETDATA",
        queryFn() {
            return axios.get("http://localhost:8080/api/universities")
        },
    })

    const saveUniversity = useMutation({
        mutationKey: "SAVEDATA",
        mutationFn: (requestData: any) => {
            console.log(requestData)
            return axios.post("http://localhost:8080/api/save-university", requestData);
        },
        onSuccess: () => {
            setAddUniVisible(false);
            alert("The university has been registered!");
            refetch();
        },
    });

    const saveUniName = useMutation({
        mutationKey: "SAVE DATA",
        mutationFn: (requestData: any) => {
            console.log(requestData)
            return axios.post("http://localhost:8080/api/university-by-name", requestData);
        },
        onSuccess: (response) => {
            setFilteredUni(response.data);
        }
    });

    const editUniversity = useMutation({
        mutationKey: "SAVEDATA",
        mutationFn: async (requestData: any) => {
            try {
                const formData = new FormData();
                if (requestData.universityImage && requestData.universityImage.length > 0) {
                    formData.append("universityImage", requestData.universityImage[0]);
                }
                formData.append("universityName", requestData.universityName);
                formData.append("universityState", requestData.universityState);
                formData.append("universityCity", requestData.universityCity);
                formData.append("universityMajor", requestData.universityMajor);
                formData.append("universityFees", requestData.universityFees);
                formData.append("universityLength", requestData.universityLength);

                const response = await axios.post("http://localhost:8080/api/update-university", formData, {
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
            setEditUniVisible(false);
            alert("Updated!");
            refetch();
        },
    });


    const onSubmitAddUni = (value: any): void => {
        saveUniversity.mutate(value);
    }

    const onSubmitSearch = async (value: any) => {
        try {
            await saveUniName.mutateAsync(value);
        }
        catch (error) {
            console.error("Error filtering universities", error);
            setFilteredUni([]);
        }
    }

    const universities = data?.data || [];
    const displayUniversities = filteredUni.length > 0 ? filteredUni : universities;

    const handleEditClick = async (universityId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/university-by-id/${universityId}`);
            const universityDetails = response.data;
            console.log("University details:", universityDetails);

            setValue("universityId", universityDetails.id)
            setUniversityDetails(universityDetails);
        } 
        catch (error) {
            console.error("Error fetching university details", error);
        }

        setEditUniVisible(!isEditUniVisible);
    };

    const deleteUniversity = useMutation({
        mutationKey: ["DELETE DATA"],
        mutationFn: (id: number) => {
            return axios.delete(`http://localhost:8080/api/delete-university/${id}`);
        },
        onSuccess: () => {
            setEditUniVisible(false);
            refetch();
            alert("The university has been removed");
        },
    });

    const onSubmitEditUni = async (formData: any): void => {
        if (formData.universityImage) {
            formData.universityId = formData.universityId || universityDetails.id;
            console.log(formData);
            editUniversity.mutate(formData);
        } 
        else {
            const response = await axios.post("http://localhost:8080/api/update-university-without-image", formData);
            console.log(response);
            refetch(); 
            setEditUniVisible(false);
            alert("Updated!");
        }
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

                        <form onSubmit={handleSubmit(onSubmitSearch)}>
                            <div className="student-searchbar-container-adminUni">
                                <input className="student-searchbar-adminUni" {...register("universityName")}></input>
                                <div className="student-searchbtn-container-adminUni">
                                    <button className="student-searchbtn-adminUni" type="submit">
                                        <img className="student-search-img-adminUni" src="src\assets\AdminUniversity\search.png"></img>
                                    </button>


                                </div>
                            </div>
                        </form>

                    </div>

                    <button className="add-uni-btn-adminUni" onClick={() => setAddUniVisible(!isAddUniVisible)}>Add university</button>
                </div>

                {isAddUniVisible && (
                    <div className="add-uni-mainContainer-adminUni">
                        <form onSubmit={handleSubmit(onSubmitAddUni)}>
                            <div className="add-uni-sub1-adminUni">
                                <div className="add-uni-left-sec">

                                    <label className="file-upload-label" htmlFor="universityImageId">
                                        <div className="file-img-container">
                                            <img className="file-img-adminUni" src="src\assets\AdminUniversity\file upload1.png"></img>
                                        </div>
                                        <button className="browse-button" type="submit">Browse files</button>
                                    </label>

                                    <input id="universityImageId" type="file" className="file-input" {...register("universityImage")}></input>
                                </div>

                                <div className="add-uni-right-sec">
                                    <div className="addUni-textfield">
                                        <label className="uniName-addUni">Name of university</label>
                                        <input className="uniName-field-addUni" {...register("universityName")}></input>

                                        <div className="uniCity-uniState-container-addUni">
                                            <div className="uniCity-container-addUni">
                                                <label className="uniCity-addUni">City</label>
                                                <input className="uniCity-field-addUni" {...register("universityCity")}></input>
                                            </div>
                                            <div className="uniState-addUni">
                                                <label className="uniState-addUni">State</label>
                                                <input className="uniState-field-addUni" {...register("universityState")}></input>
                                            </div>
                                        </div>

                                        <label className="uniMajor-addUni">Major</label>
                                        <input className="uniMajor-field-addUni" {...register("universityMajor")}></input>
                                        <label className="uniFees-addUni">Annual fees</label>
                                        <input className="uniFees-field-addUni" {...register("universityFees")}></input>
                                        <label className="uniLength-addUni">Length of study</label>
                                        <input className="uniLength-field-addUni" {...register("universityLength")}></input>
                                    </div>

                                    <button className="upload-btn-addUni" type="submit">Upload</button>
                                </div>
                            </div>
                        </form>
                    </div>
                )}

                {isEditUniVisible && (
                    <div className="edit-uni-container-adminUni">
                        <form onSubmit={handleSubmit(onSubmitEditUni)}>
                            <div className="edit-uni-form-container-adminUni">
                                <div className="edit-uni-left-section">
                                    <label className="file-upload-label-editUni" htmlFor="universityImageId">
                                        <div className="file-img-container-editUni">
                                            <img className="file-img-editUni-adminUni" src="src\assets\University\U-M_Logo-Hex.png"></img>
                                        </div>
                                        <button className="browse-button-editUni" type="submit">Browse files</button>
                                    </label>

                                    <input id="universityImageId" type="file" className="file-input" {...register("universityImage")}></input>
                                </div>

                                <div className="edit-uni-right-sec">
                                    <div className="editUni-textfield">
                                        <input type="hidden" {...register("universityId")}></input>
                                        <label className="uniName-editUni">Name of university</label>
                                        <input className="uniName-field-editUni" {...register("universityName")}></input>

                                        <div className="uniCity-uniState-container-editUni">
                                            <div className="uniCity-container-editUni">
                                                <label className="uniCity-editUni">City</label>
                                                <input className="uniCity-field-editUni" {...register("universityCity")}></input>
                                            </div>
                                            <div className="uniState-editUni">
                                                <label className="uniState-editUni">State</label>
                                                <input className="uniState-field-editUni" {...register("universityState")}></input>
                                            </div>
                                        </div>

                                        <label className="uniMajor-editUni">Major</label>
                                        <input className="uniMajor-field-editUni" {...register("universityMajor")}></input>
                                        <label className="uniFees-editUni">Annual fees</label>
                                        <input className="uniFees-field-editUni" {...register("universityFees")}></input>
                                        <label className="uniLength-editUni">Length of study</label>
                                        <input className="uniLength-field-editUni" {...register("universityLength")}></input>
                                    </div>

                                    <div className="edit-uni-buttons">
                                        <button className="editUni-delete-btn" onClick={() => {
                                            deleteUniversity.mutate(universityDetails.id);
                                        }}>Delete</button>

                                        <button className="editUni-update-btn" type="submit">Update</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                )}

                <div className="adminUni-list">
                    {displayUniversities.map((uni, index) => (
                        <div className="adminUni-main-container" key={index}>
                            <p className="edit-uni-btn" onClick={() => handleEditClick(uni.id)}>Edit</p>
                            <div className="adminUni-container">
                                <div className="adminUni-description-container">
                                    <img className="adminUni-image" src={`/${uni.universityImage}`} />
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
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
export default AdminUniversity;
