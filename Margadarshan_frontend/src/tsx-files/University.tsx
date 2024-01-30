import "../css-files/universityCentre.css";
import React, {useEffect, useState} from "react";
import { useForm } from 'react-hook-form';
import { useMutation } from "react-query";
import { useQuery } from "react-query";
import axios from "axios";
import Header from './Header';
import BeforeLoginHeader from "./BeforeLoginHeader.tsx";

function University() {

    useEffect(() => {
        document.title = "Universities | Margadarshan"
    }, [])

    const { register, handleSubmit } = useForm();
    const [filteredUni, setFilteredUni] = useState([]);
    const [selectedMajorOption, setSelectedMajorOption] = useState("");
    const [selectedFeeOption, setSelectedFeeOption] = useState("");

    const { data } = useQuery({
        queryKey: "GETDATA",
        queryFn() {
            return axios.get("http://localhost:8080/api/universities")
        }
    })

    const { data: majorsData } = useQuery({
        queryKey: "GETMAJORS",
        queryFn() {
            return axios.get("http://localhost:8080/api/universities-major");
        }
    })

    const saveData = useMutation({
        mutationKey: "SAVE DATA",
        mutationFn: (requestData: any) => {
            console.log(requestData)
            return axios.post("http://localhost:8080/api/universities-filtered", requestData);
        },
        onSuccess: (response) => {
            setFilteredUni(response.data);
        }
    });

    const onSubmit = async (value: any) => {
        try {
            const [min, max] = selectedFeeOption.split('-');
            value.universityFeesLowerBound = parseInt(min);
            value.universityFeesUpperBound = parseInt(max);
            value.universityMajor = selectedMajorOption;

            await saveData.mutateAsync(value);
        }
        catch (error) {
            console.error("Error filtering universities", error);
            setFilteredUni([]);
        }
    }

    const generateFeeOptions = () => {
        const lowerBounds = [0, 30000, 40000, 50000, 60000];
        const upperBounds = [30000, 40000, 50000, 60000, 100000];
        return lowerBounds.map((lower, index) => {
            const upper = upperBounds[index];
            const label = upper === Infinity ? `>${lower}` : `$${lower} - $${upper}`;
            return { label, value: `${lower}-${upper}` };
        });
    }

    const options = generateFeeOptions();

    const universities = data?.data || [];
    const displayUniversities = filteredUni.length > 0 ? filteredUni : universities;
    const majors = majorsData?.data || [];

    return (
        <>
            {localStorage.getItem("loggedInUserId")? <Header/>:<BeforeLoginHeader/>}

            <div className="centre">
                <div className="page-heading">
                    <div className="university-title">
                        <p className="title-main-text">Universities</p>
                        <p className="title-subtext">
                            Effortlessly find the perfect university using personalized filters
                        </p>
                    </div>
                    <div className="title-image">
                        <img className="university-image" src="src\assets\University\university.png" />
                    </div>
                </div>

                <div className="user-input-uni">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="text-field-container">
                            <div className="major-choice">
                                <p className="question">What do you want to study?</p>
                                <select
                                    className="drop-down-major"
                                    {...register("universityMajor")}
                                    value={selectedMajorOption}
                                    onChange={(e) => setSelectedMajorOption(e.target.value)}>

                                    {selectedMajorOption === "" && <option value="" disabled>Select an option</option>}
                                    {majors.map((major, index) => (
                                        <option key={index} value={major}>
                                            {major}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="location-choice">
                                <p className="question">Which state do you want to study in?</p>
                                <input className="text-field1" type="text" {...register("universityState")} />
                            </div>
                        </div>

                        <div className="fee-button-container">
                            <div className="fees">
                                <p className="question">Tuition fees (USD)</p>
                                <select
                                    className="drop-down-fees"
                                    value={selectedFeeOption}
                                    defaultValue={""}
                                    onChange={(e) => setSelectedFeeOption(e.target.value)}>

                                    <option value="" disabled>Select an option</option>
                                    {options.map((option, index) => (
                                        <option key={index} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="search-button-container">
                                <button className="search" type="submit">Search</button>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="university-list">
                    {displayUniversities.map((uni, index) => (
                        <div className="uni-container" key={index}>
                            <div className="uni-description-container">
                                <img className="uni-image" src={`/${uni.universityImage}`} />
                                <div className="uni-desc">
                                    <p className="uni-name">{uni.name}</p>
                                    <p className="uni-location">{uni.city}, {uni.state}</p>
                                    <p className="major">{uni.major}</p>
                                </div>
                            </div>
                            <div className="uni-costs">
                                <p className="annual-fee">${uni.fees}/year</p>
                                <p className="years">{uni.length} years</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


        </>
    )
}
export default University;
