import "../css-files/scholarshipCentre.css";
import { useQuery } from "react-query";
import axios from "axios";
import Header from './Header';

function Scholarship() {
    const {data} = useQuery({
        queryKey: "GET_DATA",
        queryFn() {
            return axios.get("http://localhost:8080/api/scholarships")
        }
    })
    return (
        <>
            <Header/>

            <div className="centre">
                <div className="page-heading">
                    <div className="scholarship-title">
                        <p className="title-main-text">Scholarship</p>
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
                    <div className="sch-container">
                        <div className="sch-description">
                            <div className="sch-image-container">
                                <img className="sch-image" src="src\assets\Scholarship\peo.png" />
                            </div>
                            <div className="sch-desc-container">
                                <p className="sch-name">P.E.O. International Peace Scholarship (IPS)</p>
                                <p className="sch-institute">The International Peace Scholarship Fund</p>
                                <p className="sch-type">Women's scholarship</p>
                                <p className="grant">Grant: $12,500</p>
                            </div>
                        </div>
                        <div className="sch-deadline">
                            <p className="deadline">Deadline:</p>
                            <p className="date">15 Dec 2023</p>
                        </div>
                    </div>

                    <div className="sch-container">
                        <div className="sch-description">
                            <div className="sch-image-container">
                                <img className="sch-image" src="src\assets\Scholarship\uni of memphis.png" />
                            </div>
                            <div className="sch-desc-container">
                                <p className="sch-name">International Merit Scholarship</p>
                                <p className="sch-institute">University of Memphis</p>
                                <p className="sch-type">Merit-based scholarship</p>
                                <p className="grant">Grant: Various benefits</p>
                            </div>
                        </div>
                        <div className="sch-deadline">
                            <p className="deadline">Deadline:</p>
                            <p className="date">31 July 2024</p>
                        </div>
                    </div>
                </div>

                <div className="scholarship-choice">
                    {data?.data?.map(sch=>{
                    return  (<>
                        <p className="sch-choice">{sch.scholarshipName}</p>
                        <p className="sch-choice">{sch.scholarshipOrganization}</p>
                        <p className="sch-choice">{sch.scholarshipType}</p>
                        <p className="sch-choice">{sch.grant}</p>
                        <p className="sch-choice">{sch.scholarshipDeadline}</p>
                    </>)
                })}</div>
            </div>
        </>
    )
}

export default Scholarship