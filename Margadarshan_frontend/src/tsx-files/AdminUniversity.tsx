import "../css-files/adminUniHeader.css";
import "../css-files/adminUniCentre.css";
import "../css-files/addUniversity.css";
import { useQuery } from "react-query";
import axios from "axios";
import { useState } from "react";
import { useMutation } from "react-query";
import { useForm } from "react-hook-form";

function AdminUniversity() {
    const { data } = useQuery({
        queryKey: "GETDATA",
        queryFn() {
            return axios.get("http://localhost:8080/api/universities")
        }
    })

    const [isAddUniVisible, setAddUniVisible] = useState(false);

    const saveUniversity = useMutation({
        mutationKey: "SAVEDATA",
        mutationFn: (formData) => {
            console.log(formData)
            return axios.post("http://localhost:8080/api/save-university", formData);
        },
    });

    const { register,
        handleSubmit,
        setValue } = useForm();

    const onSubmit = async (formData) => {
        const imageFormData = new FormData();
        imageFormData.append("file", formData.universityImage[0]);

        try {
            const imageResponse = await axios.post("http://localhost:8080/api/save-university", imageFormData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setValue("universityImage", imageResponse.data.imageUrl);

            saveUniversity.mutate(formData);
        }
        catch(error) {
            console.error("Error uploading image", error);
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
                    <div className="add-uni-mainContainer-adminUni">
                        <form onSubmit={handleSubmit(onSubmit)}>
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

                <div className="adminUni-list">
                    {data?.data?.map((uni, index) => (
                        <div className="adminUni-main-container" key={index}>
                            <p className="edit-uni-btn">Edit</p>
                            <div className="adminUni-container">
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
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
export default AdminUniversity;
