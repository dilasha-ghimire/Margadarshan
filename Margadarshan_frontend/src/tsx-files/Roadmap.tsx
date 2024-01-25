import Header from './Header';
import "../css-files/roadmap.css";
import { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

function Roadmap() {

    useEffect(() => {
        document.title = "Roadmap | Margadarshan"
    }, [])

    const [selectedUniOption, setSelectedUniOption] = useState("");
    const [selectedMajorOption, setSelectedMajorOption] = useState("");
    const [selectedEnglishTest, setSelectedEnglishTest] = useState("");
    const [isBachelorDivVisible, setBachelorDivVisible] = useState(false);
    const [isMasterDivVisible, setMasterDivVisible] = useState(false);
    const [selectedStudyLevel, setSelectedStudyLevel] = useState("");
    const [selectedEssay, setSelectedEssay] = useState("");
    const { register, handleSubmit } = useForm();

    const [isPopupVisible, setPopupVisible] = useState(false);
    const [popupMessage, setPopupMessage] = useState<string | null>(null);

    const [roadmapGpa, setRoadmapGpa] = useState("");
    const [universityGpa, setUniversityGpa] = useState("");

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

    const { data: majorsData } = useQuery({
        queryKey: "GETMAJORS",
        queryFn() {
            return axios.get("http://localhost:8080/api/universities-major");
        }
    })
    const majors = majorsData?.data || [];

    const { data: universityData } = useQuery({
        queryKey: "GETUNIVERSITIES",
        queryFn() {
            return axios.get("http://localhost:8080/api/roadmap-unis-dropdown");
        }
    })
    const uni = universityData?.data || [];

    const enterRoadmapData = useMutation({
        mutationKey: "SAVE DATA",
        mutationFn: async (requestData: any) => {
            const response = await axios.post("http://localhost:8080/api/roadmap", requestData);
            setUniversityGpa(response.data.averageBachelorsGpa);
            console.log(response.data);  
            return response.data;
        },
    });

    const onSubmit = async (value: any) => {
        try {
            value.universityMajor = selectedMajorOption;
            value.universityName = selectedUniOption;
            value.languageTestSelection = selectedEnglishTest;
            value.essaysPrepared = selectedEssay;
            value.degreeSelection = selectedStudyLevel;

            if (selectedEnglishTest === "Ielts") {
                value.ieltsScore = value.ieltsScore;
            }
            if (selectedEnglishTest === "Toefl") {
                value.toeflScore = value.toeflScore;
            }

            await enterRoadmapData.mutateAsync(value);

            setBachelorDivVisible(false);
            setMasterDivVisible(false);
        }
        catch (error) {
            console.error("Error loading roadmap", error);
        }
    }

    const compareGpa = () => {
        try {
          const roadmapGpaFloat = parseFloat(roadmapGpa);
          const universityGpaFloat = parseFloat(universityGpa);
    
          if (!isNaN(roadmapGpaFloat) && !isNaN(universityGpaFloat)) {
            if (roadmapGpaFloat < universityGpaFloat) {
              togglePopup("Your GPA is lower than the university's required GPA.");
            } else {
              togglePopup("Your GPA is equal or higher than the university's required GPA.");
            }
          } else {
            togglePopup("Please enter valid GPA values.");
          }
        } 
        catch (error) {
          console.error("An unexpected error occurred:", error.message);
        }
      };

    const togglePopup = (message: string | null = null) => {
        setPopupMessage(message);
        setPopupVisible(!isPopupVisible);
    };



    return (
        <>
            <Header />

            <div className='sidebar-roadmap' style={{ width: sideNavWidth }}>
                <a href="javascript:void(0)" className="close-sidebar-btn-roadmap" onClick={closeSideNav}><FontAwesomeIcon icon={faArrowLeft} /></a>
                <p className='sidebar-title-roadmap'>Enter the following details to construct your journey to the United States</p>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='study-level-radio-container'>
                        <div className="radio-container1-roadmap">
                            <label>Bachelors</label>
                            <input type="radio" name="study-radio-roadmap"
                                onClick={() => {
                                    setBachelorDivVisible(true);
                                    setMasterDivVisible(false);
                                    setSelectedStudyLevel('bachelors');
                                }}></input>
                            <span className="checkmark-roadmap"></span>
                        </div>

                        <div className="radio-container2-roadmap">
                            <label>Masters</label>
                            <input type="radio" name="study-radio-roadmap"
                                onClick={() => {
                                    setBachelorDivVisible(false);
                                    setMasterDivVisible(true);
                                    setSelectedStudyLevel('masters');
                                }}></input>
                            <span className="checkmark-roadmap"></span>
                        </div>
                    </div>

                    {selectedStudyLevel === 'bachelors' ? (
                        <div className='bachelor-input-container'>
                            <div className='univesity-gpa-container-roadmap'>
                                <select className='uni-dropdown-roadmap' value={selectedUniOption}
                                    onChange={(e) => setSelectedUniOption(e.target.value)}>
                                    {selectedMajorOption === "" && <option value="" disabled>Select a university</option>}
                                    {uni.map((uni, index) => (
                                        <option key={index} value={uni}>
                                            {uni}
                                        </option>
                                    ))}
                                </select>

                                <input className='gpa-input-roadmap' placeholder='Enter your GPA' {...register("averageBachelorsGpa")}></input>

                                <input className='sats-input-roadmap' placeholder='Enter your SAT scores' {...register("satScore")}></input>
                            </div>

                            <div className='english-test-container-roadmap'>
                                <div className='ielts-toefl-container-roadmap'>
                                    <label>English proficiency test taken:</label>
                                    <select
                                        className='english-test-dropdown-roadmap'
                                        value={selectedEnglishTest}
                                        onChange={(e) => {
                                            setSelectedEnglishTest(e.target.value);
                                            console.log("Selected English Test:", e.target.value);
                                        }}

                                    >
                                        {selectedEnglishTest === "" && <option value="" disabled>IELTS/TOEFL</option>}
                                        <option value="IELTS">IELTS</option>
                                        <option value="TOEFL">TOEFL</option>
                                    </select>
                                </div>

                                <div className='english-test-score-container-roadmap'>
                                    <label>Test score:</label>
                                    {!selectedEnglishTest && (
                                        <>
                                            <input
                                                className='english-test-score-input-roadmap'
                                            />
                                        </>
                                    )}
                                    {selectedEnglishTest === "IELTS" && (
                                        <input
                                            className='english-test-score-input-roadmap'
                                            {...register("ieltsScore")}
                                        />
                                    )}
                                    {selectedEnglishTest === "TOEFL" && (
                                        <input
                                            className='english-test-score-input-roadmap'
                                            {...register("toeflScore")}
                                        />
                                    )}
                                </div>
                            </div>

                            <div className='sup-essay-container-roadmap'>
                                <label>Supplementary essays prepared:</label>

                                <div className="radio-container1-roadmap">
                                    <label>Yes</label>
                                    <input type="radio" checked={true} name="radio-roadmap"
                                        onClick={() => {
                                            setSelectedEssay("Yes");
                                        }}></input>
                                    <span className="checkmark-roadmap"></span>
                                </div>

                                <div className="radio-container2-roadmap">
                                    <label>No</label>
                                    <input type="radio" name="radio-roadmap"
                                        onClick={() => {
                                            setSelectedEssay("No");
                                        }}></input>
                                    <span className="checkmark-roadmap"></span>
                                </div>
                            </div>

                            <button className='submit-btn-roadmap' type='submit'>Submit</button>
                        </div>
                    ) : null}

                    {selectedStudyLevel === 'masters' ? (
                        <div className='masters-input-container'>
                            <div className='univesity-gpa-container-roadmap'>
                                <select className='uni-dropdown-roadmap' value={selectedUniOption}
                                    onChange={(e) => setSelectedUniOption(e.target.value)}>
                                    {selectedMajorOption === "" && <option value="" disabled>Select a university</option>}
                                    {uni.map((uni, index) => (
                                        <option key={index} value={uni}>
                                            {uni}
                                        </option>
                                    ))}
                                </select>

                                <select className='major-dropdown-roadmap' value={selectedMajorOption}
                                    onChange={(e) => setSelectedMajorOption(e.target.value)}>
                                    {selectedMajorOption === "" && <option value="" disabled>Select a major</option>}
                                    {majors.map((major, index) => (
                                        <option key={index} value={major}>
                                            {major}
                                        </option>
                                    ))}
                                </select>

                                <input className='gpa-input-roadmap' placeholder='Enter your GPA'></input>

                                <input className='sats-input-roadmap' placeholder='Enter your SAT scores'></input>
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
                                    {!selectedEnglishTest && (
                                        <>
                                            <input
                                                className='english-test-score-input-roadmap'
                                            />
                                        </>
                                    )}
                                    {selectedEnglishTest === "IELTS" && (
                                        <input
                                            className='english-test-score-input-roadmap'
                                            {...register("ieltsScore")}
                                        />
                                    )}
                                    {selectedEnglishTest === "TOEFL" && (
                                        <input
                                            className='english-test-score-input-roadmap'
                                            {...register("toeflScore")}
                                        />
                                    )}
                                </div>
                            </div>

                            <div className='sup-essay-container-roadmap'>
                                <label>Supplementary essays prepared:</label>

                                <div className="radio-container1-roadmap">
                                    <label>Yes</label>
                                    <input type="radio" checked={true} name="radio-roadmap"
                                        onClick={() => {
                                            setSelectedEssay("Yes");
                                        }}></input>
                                    <span className="checkmark-roadmap"></span>
                                </div>

                                <div className="radio-container2-roadmap">
                                    <label>No</label>
                                    <input type="radio" name="radio-roadmap"
                                        onClick={() => {
                                            setSelectedEssay("No");
                                        }}></input>
                                    <span className="checkmark-roadmap"></span>
                                </div>
                            </div>

                            <button className='submit-btn-roadmap' type='submit'>Submit</button>
                        </div>
                    ) : null}
                </form>
            </div>

            <div className='centre-roadmap'>
                <button className='open-sidebar-btn-roadmap' onClick={openSideNav}><FontAwesomeIcon icon={faArrowRight} /></button>

                <div className='roadmap-container-main'>
                    <div className='top-roadmap-buttons'>
                        {/* {isPopupVisible && ( */}
                        <div className='pop-up'>
                            <p className='pop-up-text'>{popupMessage || "Default message"}</p>
                        </div>
                        {/* )} */}
                        <img className='roadmap-button' src='src\assets\Roadmap\location.png'></img>
                        <img className='roadmap-button' src='src\assets\Roadmap\location.png'></img>
                        <img className='roadmap-button' src='src\assets\Roadmap\location.png'></img>
                    </div>

                    <img className='roadmap-img' src='src\assets\Roadmap\roadmap.png'></img>

                    <div className='bottom-roadmap-buttons'>
                        <img className='roadmap-button' src='src\assets\Roadmap\location upside-down.png'></img>
                        <img className='roadmap-button' src='src\assets\Roadmap\location upside-down.png'></img>
                        <img className='roadmap-button' src='src\assets\Roadmap\location upside-down.png'></img>
                    </div>
                </div>

            </div>
        </>
    );
}

export default Roadmap;