import "../css-files/scholarshipCentre.css";
import { useQuery } from "react-query";
import axios from "axios";
import Header from './Header';
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import BeforeLoginHeader from "./BeforeLoginHeader.tsx";

function Scholarship() {
    const { register, handleSubmit } = useForm();
    const [selectedSchType, setSelectedSchType] = useState("");
    const [selectedSchGpa, setSelectedSchGpa] = useState("");
    const [isGpaDropDownVisible, setGpaDropDownVisible] = useState(false);
    const [ selectedGrantAmount, setSelectedGrantAmount ] = useState("");

    useEffect(() => {
        document.title = "Scholarships | Margadarshan"
    }, [])

    const [filteredSch, setFilteredSch] = useState([]);

    const { data } = useQuery({
        queryKey: "GET_DATA",
        queryFn() {
            return axios.get("http://localhost:8080/api/scholarships")
        }
    })

    const scholarship = data?.data || [];
    const displayScholarship = filteredSch.length > 0 ? filteredSch : scholarship

    const handleSchTypeChange = (value) => {
        setSelectedSchType(value);
        setGpaDropDownVisible(value === "Merit-based scholarship");
    };

    const saveData = useMutation({
        mutationKey: "FILTER SCHOLARSHIP",
        mutationFn: (requestData: any) => {
            console.log(requestData)
            return axios.post("http://localhost:8080/api/scholarship-filtered", requestData);
        },
        onSuccess: (response) => {
            setFilteredSch(response.data);
        }
    });

    const onSubmit = async (value: any) => {
        try {
            const [min, max] = selectedGrantAmount.split('-');
            value.grantLowerBound = parseInt(min);
            value.grantUpperBound = parseInt(max);
            value.scholarshipType = selectedSchType;
            value.scholarshipGpa = selectedSchGpa

            await saveData.mutateAsync(value);
        }
        catch (error) {
            console.error("Error filtering universities", error);
            setFilteredSch([]);
        }
    }

    const generateGrantAmountOptions = () => {
        const lowerBounds = [0, 1000, 5000, 10000, 25000];
        const upperBounds = [1000, 5000, 10000, 25000, Infinity];
        return lowerBounds.map((lower, index) => {
            const upper = upperBounds[index];
            const label = upper === Infinity ? `>${lower}` : `$${lower} - $${upper}`;
            return { label, value: `${lower}-${upper}` };
        });
    }

    const options = generateGrantAmountOptions();

    return (
        <>
            {localStorage.getItem("loggedInUserId")? <Header/>:<BeforeLoginHeader/>}

            <div className="centre">
                <div className="page-heading">
                    <div className="scholarship-title">
                        <p className="title-main-text">Scholarships</p>
                        <p className="title-subtext">
                            Discover tailored scholarships that match your criteria
                        </p>
                    </div>
                    <div className="title-image">
                        <img className="scholarship-image" src="src\assets\Scholarship\scholarship.png" />
                    </div>
                </div>

                <div className="user-input-sch">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="text-field-container">
                            <div className="type-choice">
                                <p className="question">Choose a type of scholarship</p>
                                <select
                                    className="sch-type-dropdown"
                                    {...register("scholarshipType")}
                                    value={selectedSchType}
                                    onChange={(e) => handleSchTypeChange(e.target.value)}>

                                    {selectedSchType === "" && <option value="" disabled>Select an option</option>}
                                    <option>Academic scholarship</option>
                                    <option>Athletic scholarship</option>
                                    <option>Government scholarship</option>
                                    <option>Ethnicity-based scholarship</option>
                                    <option>Needs-based scholarship</option>
                                    <option>Women’s scholarship</option>
                                    <option className="merit-based-option">Merit-based scholarship</option>
                                </select>

                                {isGpaDropDownVisible && (
                                    <div className="gpa-drop-container">
                                        <p className="gpa-text">Select minimum GPA</p>
                                        <select
                                            className="gpa-dropdown"
                                            {...register("scholarshipGpa")}
                                            value={selectedSchGpa}
                                            onChange={(e) => setSelectedSchGpa(e.target.value)}>

                                            {selectedSchGpa === "" && <option value="" disabled>Select</option>}
                                            <option>3.5</option>
                                            <option>3.6</option>
                                            <option>3.7</option>
                                            <option>3.8</option>
                                            <option>3.9</option>
                                            <option>4.0</option>
                                        </select>
                                    </div>
                                )}
                            </div>

                            <div className="grant-choice">
                                <p className="question">Choose the scholarship grant</p>
                                <select
                                    className="grant-dropdown"
                                    value={selectedGrantAmount}
                                    defaultValue={""}
                                    onChange={(e) => setSelectedGrantAmount(e.target.value)}>

                                    <option value="" disabled>Select an option</option>
                                    {options.map((option, index) => (
                                        <option key={index} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                        </div>

                        <div className="search-button-container-sch">
                            <button className="search" type="submit">Search</button>
                        </div>
                    </form>

                </div>

                <div className="scholarship-list">
                    {displayScholarship.map((sch, index) => (
                        <div className="sch-container">
                            <div className="sch-description">
                                <div className="sch-image-container">
                                    <img className="sch-image" src={`/${sch.scholarshipImage}`} />
                                </div>
                                <div className="sch-desc-container">
                                    <p className="sch-name">{sch.scholarshipName}</p>
                                    <p className="sch-institute">{sch.scholarshipOrganization}</p>
                                    <p className="sch-type">{sch.scholarshipType}</p>
                                    <p className="grant">Grant: ${sch.grant}</p>
                                </div>
                            </div>
                            <div className="sch-deadline">
                                <p className="deadline">Deadline:</p>
                                <p className="date">{sch.scholarshipDeadline}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Scholarship;