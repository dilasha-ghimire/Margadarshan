import React, { useState } from 'react';
import Header from './Header';
import '../css-files/educationstyle.css';
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";


const Education: React.FC = () => {

    const [isEduFormVisible, setEduFormVisible] = useState(false);
    const { register, handleSubmit, setValue } = useForm();

    const handleEduButtonClick = () => {
        setEduFormVisible(!isEduFormVisible);
    };

    const onSubmitUpdateEdu = (formData: any): void => {
    };

    return (
        <div>
            <Header/>

            <div className="edu-content">
                <div id="edu-navigation" className="edu-sidenavbar">
                    <div id="mySidenav" className="edu-sidenav-content">
                        <p>Portfolio</p>
                        <h1></h1>
                        <Link to="/education " className="doc-link">
                            <span>Education</span>
                        </Link>
                        <h1></h1>
                        <Link to="/document ">
                            <span>Documents</span>
                        </Link>
                        <h1></h1>
                        <Link to="/sop ">
                            <span>SoP and Essays</span>
                        </Link>
                    </div>
                </div>

                <div className="edu-main">
                    <div className="edu-title">
                        <h1>Education</h1>
                        <p>Share more details about your alma mater. Provide additional information about the institution where you pursued your education.</p>
                    </div>
                    <div className="edu-timeline">
                        <button className="edu-addButton" onClick={handleEduButtonClick}>
                            +
                        </button>

                        {isEduFormVisible && (
                            <div className="edu-form">
                                <h3>Update your Educational Journey</h3>
                                <form onSubmit={handleSubmit(onSubmitUpdateEdu)}>
                                    <div className="edu-institute">
                                        <label htmlFor="eduName" id="edu-name">Name of educational institute</label>
                                        <input type="text" id="eduName" {...register("eduName")} />
                                    </div>

                                    <div className="edu-lvl">
                                        <label htmlFor="eduLevel" id="edu-level">Educational level</label>
                                        <input type="text" id="eduLevel" {...register("eduLevel")} />
                                    </div>

                                    <button type="submit" id="edu-submit">Submit</button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Education;
