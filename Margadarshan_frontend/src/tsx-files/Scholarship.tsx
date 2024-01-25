import "../css-files/scholarshipCentre.css";
import { useQuery } from "react-query";
import axios from "axios";
import Header from './Header';
import {useEffect, useState} from "react";

function Scholarship() {

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
    return (
        <>
            <Header />

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
                    <div className="text-field-container">
                        <div className="major-choice">
                            <p className="question">What do you want to study?</p>
                            <input className="text-field" type="text" />
                        </div>
                        <div className="location-choice">
                            <p className="question">Which state do you want to study in?</p>
                            <input className="text-field" type="text" />
                        </div>
                    </div>
                    <div className="search-button-container-sch">
                        <button className="search">Search</button>
                    </div>
                </div>

                <div className="scholarship-list">
                    {displayScholarship.map((sch, index) => (
                        <div className="sch-container">
                            <div className="sch-description">
                                <div className="sch-image-container">
                                    <img className="sch-image" src={`/${sch.scholarshipImage}`}/>
                                </div>
                                <div className="sch-desc-container">
                                    <p className="sch-name">{sch.scholarshipName}</p>
                                    <p className="sch-institute">{sch.scholarshipOrganization}</p>
                                    <p className="sch-type">{sch.scholarshipType}</p>
                                    <p className="grant">Grant: {sch.grant}</p>
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

export default Scholarship