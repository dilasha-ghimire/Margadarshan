import Header from './Header';
import "../css-files/roadmap.css";
import { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

function Roadmap() {
    const [selectedUniOption, setSelectedUniOption] = useState("");
    const [selectedStandardTest, setSelectedStandardTest] = useState("");
    const [selectedEnglishTest, setSelectedEnglishTest] = useState("");

    useEffect(() => {
        return () => {
            document.body.style.backgroundColor = null;
        };
    }, []);

    useEffect(() => {
        document.body.style.backgroundColor = "#152039";
    }, []);

    const [sideNavWidth, setSideNavWidth] = useState<string>('0');

    const openSideNav = () => {
        setSideNavWidth('350px');
    };

    const closeSideNav = () => {
        setSideNavWidth('0');
    };

    return (
        <>
            <Header />

            <div className='sidebar-roadmap' style={{ width: sideNavWidth }}>
                <a href="javascript:void(0)" className="close-sidebar-btn-roadmap" onClick={closeSideNav}><FontAwesomeIcon icon={faArrowLeft} /></a>
                <p className='sidebar-title-roadmap'>Enter the following details to construct your journey to the United States</p>

                <form>
                    <div className='univesity-gpa-container-roadmap'>
                        <select className='uni-dropdown-roadmap' value={selectedUniOption}
                            onChange={(e) => setSelectedUniOption(e.target.value)}>
                            {selectedUniOption === "" && <option value="" disabled>Select a university</option>}
                        </select>

                        <input className='gpa-input-roadmap' placeholder='Enter your GPA'></input>
                    </div>

                    <div className='standard-test-container-roadmap'>
                        <div className='sat-gre-container-roadmap'>
                            <label>Standardized test taken:</label>
                            <select className='standard-test-dropdown-roadmap' value={selectedStandardTest}
                                onChange={(e) => setSelectedStandardTest(e.target.value)}>
                                {selectedStandardTest === "" && <option value="" disabled>SATs/GRE</option>}
                                <option>SATs</option>
                                <option>GRE</option>
                            </select>
                        </div>

                        <div className='standard-test-score-container-roadmap'>
                            <label>Test score:</label>
                            <input className='standard-test-score-input-roadmap'></input>
                        </div>
                    </div>

                    <div className='english-test-container-roadmap'>
                        <div className='ielts-toefl-container-roadmap'>
                            <label>English proficiency test taken:</label>
                            <select className='english-test-dropdown-roadmap' value={selectedEnglishTest}
                                onChange={(e) => setSelectedEnglishTest(e.target.value)}>
                                {selectedEnglishTest === "" && <option value="" disabled>IELTS/TOEFL</option>}
                                <option>IELTS</option>
                                <option>TOEFL</option>
                            </select>
                        </div>

                        <div className='english-test-score-container-roadmap'>
                            <label>Test score:</label>
                            <input className='english-test-score-input-roadmap'></input>
                        </div>
                    </div>

                    <div className='sup-essay-container-roadmap'>
                        <label>Supplementary essays prepared:</label>

                        <div className="radio-container1-roadmap">
                            <label>Yes</label>
                            <input type="radio" checked={true} name="radio-roadmap"></input>
                            <span className="checkmark-roadmap"></span>
                        </div>

                        <div className="radio-container2-roadmap">
                            <label>No</label>
                            <input type="radio" name="radio-roadmap"></input>
                            <span className="checkmark-roadmap"></span>

                        </div>
                    </div>

                        <button className='submit-btn-roadmap'>Submit</button>
                </form>
            </div>

            <div className='centre-roadmap'>
                <button className='open-sidebar-btn-roadmap' onClick={openSideNav}><FontAwesomeIcon icon={faArrowRight} /></button>
                <img className='roadmap-img' src='src\assets\Roadmap\roadmap.png'></img>
            </div>
        </>
    );
}

export default Roadmap;