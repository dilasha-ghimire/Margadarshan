import AdminHeader from "./AdminHeader";
import "../css-files/adminUniCentre.css";
import "../css-files/addUniversity.css";
import "../css-files/editUniversityAdmin.css";
import { useQuery } from "react-query";
import axios from "axios";
import { useRef, useState } from "react";
import { useMutation } from "react-query";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

function AdminUniversity() {

    const navigate = useNavigate();

    useEffect(() => {
        const storedOTP = localStorage.getItem('adminOTP');

        if (storedOTP == null) {
            navigate('/login');
        }
    }, []);

    useEffect(() => {
        document.title = "Admin Universities | Margadarshan"
    }, [])

    const [isAddUniVisible, setAddUniVisible] = useState(false);
    const [isEditUniVisible, setEditUniVisible] = useState(false);
    const [filteredUni, setFilteredUni] = useState([]);
    const [universityDetails, setUniversityDetails] = useState({});
    const { register, handleSubmit, setValue } = useForm();
    const [searchInput, setSearchInput] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedOption, setSelectedOption] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        if (isEditUniVisible && universityDetails) {
            setValue("universityName", universityDetails?.name);
            setValue("universityCity", universityDetails?.city);
            setValue("universityState", universityDetails?.state);
            setValue("universityMajor", universityDetails?.major);
            setValue("universityFees", universityDetails?.fees);
            setValue("universityLength", universityDetails?.length);
            setValue("averageBachelorsGpa", universityDetails?.averageBachelorsGpa);
            setValue("averageMastersGpa", universityDetails?.averageMastersGpa);
            setValue("averageSatScore", universityDetails?.averageSatScore);
            setValue("averageGreScore", universityDetails?.averageGreScore);
            setValue("averageIeltsScore", universityDetails?.averageIeltsScore);
            setValue("averageToeflScore", universityDetails?.averageToeflScore);
            console.log("requiredEssays from payload:", universityDetails?.requiredEssays);
            setValue("requiredEssays", universityDetails?.requiredEssays ? "Yes" : "No");
        }
        else {
            setValue("universityName", "");
            setValue("universityCity", "");
            setValue("universityState", "");
            setValue("universityMajor", "");
            setValue("universityFees", "");
            setValue("universityLength", "");
            setValue("averageBachelorsGpa", "");
            setValue("averageMastersGpa", "");
            setValue("averageSatScore", "");
            setValue("averageGreScore", "");
            setValue("averageIeltsScore", "");
            setValue("averageToeflScore", "");
            setValue("requiredEssays", false);
        }
    }, [isEditUniVisible, universityDetails, setValue, setSelectedOption]);

    const { data, refetch } = useQuery({
        queryKey: "GETDATA",
        queryFn() {
            return axios.get("http://localhost:8080/api/universities")
        },
    })

    const clearAddUniForm = () => {
        setValue("universityName", "");
        setValue("universityCity", "");
        setValue("universityState", "");
        setValue("universityMajor", "");
        setValue("universityFees", "");
        setValue("universityLength", "");
        setValue("averageBachelorsGpa", "");
        setValue("averageMastersGpa", "");
        setValue("averageSatScore", "");
        setValue("averageGreScore", "");
        setValue("averageIeltsScore", "");
        setValue("averageToeflScore", "");
        setValue("requiredEssays", "Select");
    };

    const saveUniversity = useMutation({
        mutationKey: "SAVEDATA",
        mutationFn: async (requestData: any) => {
            try {
                const formData = new FormData();
                formData.append("universityImage", requestData.universityImage[0]);
                formData.append("universityName", requestData.universityName);
                formData.append("universityState", requestData.universityState);
                formData.append("universityCity", requestData.universityCity);
                formData.append("universityMajor", requestData.universityMajor);
                formData.append("universityFees", requestData.universityFees);
                formData.append("universityLength", requestData.universityLength);
                formData.append("averageBachelorsGpa", requestData.averageBachelorsGpa);
                formData.append("averageMastersGpa", requestData.averageMastersGpa);
                formData.append("averageSatScore", requestData.averageSatScore);
                formData.append("averageGreScore", requestData.averageGreScore);
                formData.append("averageIeltsScore", requestData.averageIeltsScore);
                formData.append("averageToeflScore", requestData.averageToeflScore);
                formData.append("requiredEssays", requestData.requiredEssays);

                const response = await axios.post("http://localhost:8080/api/save-university", formData, {
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
                formData.append("averageBachelorsGpa", requestData.averageBachelorsGpa);
                formData.append("averageMastersGpa", requestData.averageMastersGpa);
                formData.append("averageSatScore", requestData.averageSatScore);
                formData.append("averageGreScore", requestData.averageGreScore);
                formData.append("averageIeltsScore", requestData.averageIeltsScore);
                formData.append("averageToeflScore", requestData.averageToeflScore);
                formData.append("requiredEssays", requestData.requiredEssays);
                formData.append("universityId", requestData.universityId);

                const response = await axios.post("http://localhost:8080/api/update-university", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                });
                setSelectedImage(null)
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


    const onSubmitAddUni = (formData: any): void => {
        formData.requiredEssays = selectedOption;
        saveUniversity.mutate(formData);
        clearAddUniForm();
        setSelectedImage("src/assets/AdminUniversity/insert image.png");
    }

    const onSubmitSearch = async (value: any) => {
        try {
            if (value.universityName.trim() !== "") {
                await saveUniName.mutateAsync(value);
            }
            else {
                setFilteredUni([]);
            }
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

            setValue("universityId", universityDetails.id);
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
        formData.requiredEssays = formData.requiredEssays === "Yes";
        
        if (formData.universityImage?.length !== 0) {
            editUniversity.mutate(formData);
        }
        else {
            delete formData?.universityImage;
            const response = await axios.post("http://localhost:8080/api/update-university-without-image", formData);
            console.log(response);
            refetch();
            setEditUniVisible(false);
            alert("Updated!");
        }
    }

    useEffect(() => {
        if (!searchInput) {
            setFilteredUni([]);
        }
    }, [searchInput]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            const editForm = document.querySelector(".edit-uni-container-adminUni");
            const isNextButton = event.target.classList.contains("next-btn-editUni");
            const isBackButton = event.target.classList.contains("back-btn-editUni");

            if (editForm && !editForm.contains(event.target) && !isNextButton && !isBackButton) {
                setEditUniVisible(false);
            }
        };

        document.body.addEventListener("click", handleClickOutside);

        return () => {
            document.body.removeEventListener("click", handleClickOutside);
        };
    }, [setEditUniVisible]);

    return (
        <>
            <AdminHeader />

            <div className="centre-adminUni">
                <div className="top-section-adminUni">
                    <div className="search-container-adminUni">
                        <label className="search-uni-adminUni">Search university:</label>

                        <form onSubmit={handleSubmit(onSubmitSearch)}>
                            <div className="student-searchbar-container-adminUni">
                                <input className="student-searchbar-adminUni" {...register("universityName")}
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}></input>
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
                    <div className="add-uni-mainContainer-addUni">
                        <form onSubmit={handleSubmit(onSubmitAddUni)}>
                            <div className="add-uni-sub1-addUni">
                                <div className="add-uni-left-sec">

                                    <label className="file-upload-label-addUni" htmlFor="universityImageId">
                                        <div className="file-img-container-addUni">
                                            {selectedImage ? (
                                                <img
                                                    className={"addUni-image"}
                                                    src={selectedImage}
                                                    alt="Selected Image"
                                                />
                                            ) : (
                                                <img className="file-img-addUni" src="src/assets/AdminUniversity/insert image.png"></img>
                                            )}
                                        </div>
                                    </label>

                                    <input id="universityImageId" 
                                    type="file" 
                                    className="file-input-addUni" 
                                    {...register("universityImage", {
                                        onChange: (e) => {
                                            const file = e.target.files[0];
                                            if(file) {
                                                const imageUrl = URL.createObjectURL(file);
                                                setSelectedImage(imageUrl);
                                            }
                                        }
                                    })}></input>
                                </div>

                                <div className="add-uni-right-sec">
                                    {currentPage === 1 && (
                                        <>
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

                                            <button className="next-btn-addUni" type="button" onClick={() => setCurrentPage(currentPage + 1)}>
                                                Next <FontAwesomeIcon icon={faArrowRight} />
                                            </button>
                                        </>
                                    )}

                                    {currentPage === 2 && (
                                        <>
                                            <div className="addUni-textfield-2">
                                                <div className="uniAvGpa-container-addUni">
                                                    <div className="uniBachelorsGpa-container-addUni">
                                                        <label className="uniBachelorsGpa-addUni">Average Bachelors GPA</label>
                                                        <input className="uniBachelorsGpa-field-addUni" {...register("averageBachelorsGpa")}></input>
                                                    </div>
                                                    <div className="uniMastersGpa-container-addUni">
                                                        <label className="uniMastersGpa-addUni">Average Masters GPA</label>
                                                        <input className="uniMastersGpa-field-addUni" {...register("averageMastersGpa")}></input>
                                                    </div>
                                                </div>

                                                <div className="uniAvSats-uniAvGre-container-addUni">
                                                    <div className="uniAvSats-container-addUni">
                                                        <label className="uniAvSats-addUni">Average SATs</label>
                                                        <input className="uniAvSats-field-addUni" {...register("averageSatScore")}></input>
                                                    </div>
                                                    <div className="uniAvGre-container-addUni">
                                                        <label className="uniAvGre-addUni">Average GRE</label>
                                                        <input className="uniAvGre-field-addUni" {...register("averageGreScore")}></input>
                                                    </div>
                                                </div>

                                                <div className="uniAvIelts-uniAvToefl-container-addUni">
                                                    <div className="uniAvIelts-container-addUni">
                                                        <label className="uniAvIelts-addUni">Average IELTS</label>
                                                        <input className="uniAvIelts-field-addUni" {...register("averageIeltsScore")}></input>
                                                    </div>
                                                    <div className="uniAvToefl-container-addUni">
                                                        <label className="uniAvToefl-addUni">Average TOEFL</label>
                                                        <input className="uniAvToefl-field-addUni" {...register("averageToeflScore")}></input>
                                                    </div>
                                                </div>

                                                <div className="uniSupEssay-container-addUni">
                                                    <label className="uniSupEssay-addUni">Suupplementary essays</label>
                                                    <select className="uniSupEssay-dropdown-addUni" value={selectedOption}
                                                        onChange={(e) => setSelectedOption(e.target.value)}>
                                                        {selectedOption === "" && <option value="" disabled>Select</option>}
                                                        <option value="Yes">Yes</option>
                                                        <option value="No">No</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="add-uni-buttons">
                                                <button className="back-btn-addUni" type="button" onClick={() => setCurrentPage(currentPage - 1)}>
                                                    <FontAwesomeIcon icon={faArrowLeft} /> Back
                                                </button>
                                                <button className="upload-btn-addUni" type="submit">Upload</button>
                                            </div>
                                        </>
                                    )}
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
                                            {selectedImage ? (
                                                <img
                                                className={"addEdit-image"}
                                                src={selectedImage}
                                                alt="Selected Image"
                                            />
                                            ) : (
                                                <img className="file-img-editUni-adminUni" src={universityDetails?.universityImage || "src/assets/AdminUniversity/file upload1.png"}></img>
                                            )}
                                        </div>
                                
                                    </label>

                                    <input id="universityImageId" 
                                    type="file" 
                                    className="file-input" 
                                    {...register("universityImage", {
                                        onChange: (e) => {
                                            const file = e.target.files[0];
                                            if(file) {
                                                const imageUrl = URL.createObjectURL(file);
                                                setSelectedImage(imageUrl);
                                            }
                                        }
                                    })}></input>
                                </div>

                                <div className="edit-uni-right-sec">
                                    {currentPage === 1 && (
                                        <>
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

                                            <button className="next-btn-editUni" type="button" onClick={() => setCurrentPage(currentPage + 1)}>
                                                Next <FontAwesomeIcon icon={faArrowRight} />
                                            </button>
                                        </>
                                    )}

                                    {currentPage === 2 && (
                                        <>
                                            <div className="editUni-textfield-2">
                                                <div className="uniAvGpa-container-editUni">
                                                    <input type="hidden" {...register("universityId")}></input>
                                                    <div className="uniBachelorsGpa-container-editUni">
                                                        <label className="uniBachelorsGpa-editUni">Average Bachelors GPA</label>
                                                        <input className="uniBachelorsGpa-field-editUni" {...register("averageBachelorsGpa")}></input>
                                                    </div>
                                                    <div className="uniMastersGpa-container-editUni">
                                                        <label className="uniMastersGpa-editUni">Average Masters GPA</label>
                                                        <input className="uniMastersGpa-field-editUni" {...register("averageMastersGpa")}></input>
                                                    </div>
                                                </div>

                                                <div className="uniAvSats-uniAvGre-container-editUni">
                                                    <div className="uniAvSats-container-editUni">
                                                        <label className="uniAvSats-editUni">Average SATs</label>
                                                        <input className="uniAvSats-field-editUni" {...register("averageSatScore")}></input>
                                                    </div>
                                                    <div className="uniAvGre-container-editUni">
                                                        <label className="uniAvGre-editUni">Average GRE</label>
                                                        <input className="uniAvGre-field-editUni" {...register("averageGreScore")}></input>
                                                    </div>
                                                </div>

                                                <div className="uniAvIelts-uniAvToefl-container-editUni">
                                                    <div className="uniAvIelts-container-editUni">
                                                        <label className="uniAvIelts-editUni">Average IELTS</label>
                                                        <input className="uniAvIelts-field-editUni" {...register("averageIeltsScore")}></input>
                                                    </div>
                                                    <div className="uniAvToefl-container-editUni">
                                                        <label className="uniAvToefl-editUni">Average TOEFL</label>
                                                        <input className="uniAvToefl-field-editUni" {...register("averageToeflScore")}></input>
                                                    </div>
                                                </div>

                                                <div className="uniSupEssay-container-editUni">
                                                    <label className="uniSupEssay-editUni">Supplementary essays</label>
                                                    <select
                                                        className="uniSupEssay-dropdown-editUni"
                                                        value={selectedOption}
                                                        onChange={(e) => setSelectedOption(e.target.value)}
                                                    >
                                                        <option value="Select" disabled>Select</option>
                                                        <option value="Yes">Yes</option>
                                                        <option value="No">No</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="edit-uni-buttons">
                                                <button className="editUni-delete-btn" type="button" onClick={() => {
                                                    deleteUniversity.mutate(universityDetails.id);
                                                }}>Delete</button>

                                                <div className="update-back-btn-container-editUni">
                                                    <button className="back-btn-editUni" type="button" onClick={() => setCurrentPage(currentPage - 1)}>
                                                        <FontAwesomeIcon icon={faArrowLeft} /> Back
                                                    </button>
                                                    <button className="editUni-update-btn" type="submit">Update</button>
                                                </div>
                                            </div>
                                        </>
                                    )}
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