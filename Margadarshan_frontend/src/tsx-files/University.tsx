import "../css-files/universityCentre.css";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { useMutation } from "react-query";
import { useQuery } from "react-query";
import axios from "axios";
import Header from './Header';

function University() {
    const { data } = useQuery({
        queryKey: "GETDATA",
        queryFn() {
            return axios.get("http://localhost:8080/api/universities")
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

    const { register, handleSubmit } = useForm();
    const [filteredUni, setFilteredUni] = useState([]);

    const onSubmit = async (value: any) => {
        try {
            const [min, max] = selectedOption.split('-');
            value.minUniversityFees = parseInt(min);
            value.maxUniversityFees = parseInt(max);
            
            await saveData.mutateAsync(value);
        }
        catch (error) {
            console.error("Error filtering universities", error);
            setFilteredUni([]);
        }
    }

    const [selectedOption, setSelectedOption] = useState("");

    const generateFeeOptions = () => {
        const lowerBounds = [0, 30000, 40000, 50000, 60000];
        const upperBounds = [30000, 40000, 50000, 60000, Infinity];
        return lowerBounds.map((lower, index) => {
            const upper = upperBounds[index];
            const label = upper === Infinity ? `>${lower}` : `$${lower} - $${upper}`;
            return { label, value: `${lower}-${upper}` };
        });
    }

    const options = generateFeeOptions();

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    }

    const universities = data?.data || [];
    const displayUniversities = filteredUni.length > 0 ? filteredUni : universities;

    return (
        <>
            <Header/>

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
                                <input className="text-field1" type="text" {...register("universityMajor")} />
                            </div>
                            <div className="location-choice">
                                <p className="question">Which state do you want to study in?</p>
                                <input className="text-field1" type="text" {...register("universityState")} />
                            </div>
                        </div>

                        <div className="fee-button-container">
                            <div className="fees">
                                <p className="question">Tuition fees (USD)</p>
                                <select className="drop-down-fees"
                                    value={selectedOption}
                                    defaultValue={""}
                                    onChange={(e) => handleOptionSelect(e.target.value)}>
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
                                <img className="uni-image" src="src\assets\University\Michigan_Technological_University_seal.svg.png" />
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
