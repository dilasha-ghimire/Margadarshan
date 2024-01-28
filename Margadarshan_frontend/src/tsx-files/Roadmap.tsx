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
import { useRef } from 'react';

function Roadmap() {

    useEffect(() => {
        document.title = "Roadmap | Margadarshan"
    }, [])

    const [selectedUniOption, setSelectedUniOption] = useState("");
    const [selectedEnglishTest, setSelectedEnglishTest] = useState("");
    const [isBachelorDivVisible, setBachelorDivVisible] = useState(false);
    const [isMasterDivVisible, setMasterDivVisible] = useState(false);
    const [selectedStudyLevel, setSelectedStudyLevel] = useState("");
    const [selectedEssay, setSelectedEssay] = useState("");
    const { register, handleSubmit } = useForm();
    const [universityDetails, setUniversityDetails] = useState<any>(null);

    const [isGpaPopupVisible, setGpaPopupVisible] = useState(false);
    const [isSatGrePopupVisible, setSatGrePopupVisible] = useState(false);
    const [isIeltsToeflPopupVisible, setIeltsToeflPopupVisible] = useState(false);
    const [isUniPopupVisible, setUniPopupVisible] = useState(false);
    const [isEssayPopupVisible, setEssayPopupVisible] = useState(false);

    const [popupMessage, setPopupMessage] = useState<string | null>(null);

    const [messageGpa, setMessageGpa] = useState("");
    const [messageSatGre, setMessageSatGre] = useState("");
    const [messageIeltsToefl, setMessageIeltsToefl] = useState("");
    const [messageEssay, setMessageEssay] = useState("");

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
            const details = response.data;
            setUniversityDetails(details);
            return details;
        },
    });

    const formValuesRef = useRef<any>({});

    const onSubmit = async (value: any) => {
        try {
            value.universityName = selectedUniOption;
            value.languageTestSelection = selectedEnglishTest;
            value.essaysPrepared = selectedEssay;
            value.degreeSelection = selectedStudyLevel;

            if (selectedEnglishTest === "IELTS") {
                value.ieltsScore = value.ieltsScore;
            }
            if (selectedEnglishTest === "TOEFL") {
                value.toeflScore = value.toeflScore;
            }

            await enterRoadmapData.mutateAsync(value);

            formValuesRef.current = value;

            closeSideNav();

            setGpaPopupVisible(true);
            setUniPopupVisible(true);
            setSatGrePopupVisible(true);
            setIeltsToeflPopupVisible(true);
            setEssayPopupVisible(true);
        }
        catch (error) {
            console.error("Error loading roadmap", error);
        }
    }

    useEffect(() => {
        if (enterRoadmapData.isSuccess) {
            const result = enterRoadmapData.data;

            if (selectedStudyLevel === 'bachelors') {
                compareBachelorsGpa(formValuesRef.current.averageBachelorsGpa, result.averageBachelorsGpa);
                compareSatsScore(formValuesRef.current.satScore, universityDetails.averageSatScore);
                compareEssays(formValuesRef.current.essaysPrepared, universityDetails.requiredEssays);

                if (selectedEnglishTest === "IELTS") {
                    compareIeltsScore(formValuesRef.current.ieltsScore, result.averageIeltsScore);
                }
                else {
                    compareToeflScore(formValuesRef.current.greScore, result.averageGreScore);
                }
            }
            else if (selectedStudyLevel === 'masters') {
                compareMastersGpa(formValuesRef.current.averageMastersGpa, universityDetails.averageMastersGpa);
                compareGreScore(formValuesRef.current.greScore, universityDetails.averageGreScore);
                compareEssays(formValuesRef.current.essaysPrepared, universityDetails.requiredEssays);

                if (selectedEnglishTest === "IELTS") {
                    compareIeltsScore(formValuesRef.current.ieltsScore, result.averageIeltsScore);
                }
                else {
                    compareToeflScore(formValuesRef.current.greScore, result.averageGreScore);
                }
            }

            setBachelorDivVisible(false);
            setMasterDivVisible(false);
        }
    }, [enterRoadmapData.isSuccess, selectedStudyLevel]);

    const compareBachelorsGpa = (userGpa: string, universityGpa: string) => {
        const userGpaFloat = parseFloat(userGpa);
        const universityGpaFloat = parseFloat(universityGpa);

        if (!isNaN(userGpaFloat) && !isNaN(universityGpaFloat)) {
            if (userGpaFloat >= universityGpaFloat) {
                setMessageGpa("Congratulations! Your GPA meets or exceeds the university's requirements.");
            } else {
                setMessageGpa("Sorry, your GPA is below the university's requirements.");
            }
        } else {
            setMessageGpa("Please enter valid GPA values.");
        }
    };

    const compareMastersGpa = (userGpa: string, universityGpa: string) => {
        const userGpaFloat = parseFloat(userGpa);
        const universityGpaFloat = parseFloat(universityGpa);

        if (!isNaN(userGpaFloat) && !isNaN(universityGpaFloat)) {
            if (userGpaFloat >= universityGpaFloat) {
                setMessageGpa("Congratulations! Your GPA meets or exceeds the university's requirements.");
            } else {
                setMessageGpa("Sorry, your GPA is below the university's requirements.");
            }
        } else {
            setMessageGpa("Please enter valid GPA values.");
        }
    };

    const compareSatsScore = (userSatsScore: string, universitySatsScore: string) => {
        const userSatsScoreInteger = parseInt(userSatsScore);
        const universitySatsScoreInteger = parseInt(universitySatsScore);

        console.log("userSatsScore:", userSatsScore); // Log the actual value received
        console.log("userSatsScoreInteger:", userSatsScoreInteger);
        console.log("universitySatsScore:", universitySatsScore); // Log the actual value received
        console.log("universitySatsScoreInteger:", universitySatsScoreInteger);

        if (!isNaN(userSatsScoreInteger) && !isNaN(universitySatsScoreInteger)) {
            if (userSatsScoreInteger >= universitySatsScoreInteger) {
                setMessageSatGre("Congratulations! Your SATs score meets or exceeds the university's requirements.");
            } else {
                setMessageSatGre("Sorry, your SATs score is below the university's requirements.");
            }
        } else {
            setMessageSatGre("Please enter valid SATs score values.");
        }
        console.log(setMessageSatGre);
    };

    const compareGreScore = (userGreScore: string, universityGreScore: string) => {
        const userGreScoreFloat = parseFloat(userGreScore);
        const universityGreScoreFloat = parseFloat(universityGreScore);

        if (!isNaN(userGreScoreFloat) && !isNaN(universityGreScoreFloat)) {
            if (userGreScoreFloat >= universityGreScoreFloat) {
                setMessageSatGre("Congratulations! Your GRE score meets or exceeds the university's requirements.")
            } else {
                setMessageSatGre("Sorry, your GRE score is below the university's requirements.")
            }
        } else {
            setMessageSatGre("Please enter valid GRE score values.")
        }
    };

    const compareIeltsScore = (userIeltsScore: string, universityIeltsScore: string) => {
        const userIeltsScoreFloat = parseFloat(userIeltsScore);
        const universityIeltsScoreFloat = parseFloat(universityIeltsScore);

        if (!isNaN(userIeltsScoreFloat) && !isNaN(universityIeltsScoreFloat)) {
            if (userIeltsScoreFloat >= universityIeltsScoreFloat) {
                setMessageIeltsToefl("Congratulations! Your IELTS score meets or exceeds the university's requirements.");
            } else {
                setMessageIeltsToefl("Sorry, your IELTS score is below the university's requirements.");
            }
        } else {
            setMessageIeltsToefl("Please enter valid IELTS score values.");
        }
        console.log(setMessageIeltsToefl);
    };

    const compareToeflScore = (userToeflScore: string, universityToeflScore: string) => {
        const userToeflScoreFloat = parseFloat(userToeflScore);
        const universityToeflScoreFloat = parseFloat(universityToeflScore);

        if (!isNaN(userToeflScoreFloat) && !isNaN(universityToeflScoreFloat)) {
            if (userToeflScoreFloat >= universityToeflScoreFloat) {
                setMessageIeltsToefl("Congratulations! Your TOEFL score meets or exceeds the university's requirements.");
            } else {
                setMessageIeltsToefl("Sorry, your TOEFL score is below the university's requirements.");
            }
        } else {
            setMessageIeltsToefl("Please enter valid TOEFL score values.");
        }
    };

    const compareEssays = (userEssays: string, universityRequiresEssays: boolean) => {
        if (userEssays.toLowerCase() === "yes" && universityRequiresEssays) {
            setMessageEssay("Congratulations! You have prepared the required essays.");
        } 
        else if (userEssays.toLowerCase() === "yes" && !universityRequiresEssays) {
            setMessageEssay("You have prepared essays, but the university does not require them.");
        }
        else if (userEssays.toLowerCase() === "no" && universityRequiresEssays) {
            setMessageEssay("You haven't prepared essays, but the university does not require them.");
        }
        else if (userEssays.toLowerCase() === "no" && !universityRequiresEssays) {
            setMessageEssay("You haven't prepared essays, and the university does not require them.");
        } 
        else {
            setMessageEssay("Essay preparation or requirements do not match.");
        }
    };

    const handleGpaButtonClick = () => {
        setPopupMessage(messageGpa);
        togglePopupGpa();
        console.log("Gpa message: ", messageGpa)
    };

    const handleSatsGreButtonClick = () => {
        setPopupMessage(messageSatGre);
        togglePopupSatGre();
        console.log("Sats/Gre message: ", messageSatGre)
    };

    const handleIeltsToeflButtonClick = () => {
        setPopupMessage(messageIeltsToefl);
        togglePopupIeltsToefl();
        console.log("Ielts/Toefl message: ", messageIeltsToefl)
    };

    const handleEssayButtonClick = () => {
        setPopupMessage(messageEssay);
        togglePopupEssay();
        console.log("Essay message: ", messageEssay)
    }

    const togglePopupGpa = () => {
        setGpaPopupVisible(!isGpaPopupVisible);
    };
    const togglePopupSatGre = () => {
        setSatGrePopupVisible(!isSatGrePopupVisible);
    };
    const togglePopupIeltsToefl = () => {
        setIeltsToeflPopupVisible(!isIeltsToeflPopupVisible);
    };
    const togglePopupUni = () => {
        setUniPopupVisible(!isUniPopupVisible);
    };
    const togglePopupEssay = () => {
        setEssayPopupVisible(!isEssayPopupVisible);
    }

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
                                    {selectedUniOption === "" && <option value="" disabled>Select a university</option>}
                                    {uni.map((uni, index) => (
                                        <option key={index} value={uni}>
                                            {uni}
                                        </option>
                                    ))}
                                </select>

                                <input className='gpa-input-roadmap' placeholder='Enter your GPA' {...register("averageBachelorsGpa")}></input>

                                <input className='sats-input-roadmap' placeholder='Enter your SATs score' {...register("satScore")}></input>
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
                                    <input type="radio" name="radio-roadmap"
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
                                    {selectedUniOption === "" && <option value="" disabled>Select a university</option>}
                                    {uni.map((uni, index) => (
                                        <option key={index} value={uni}>
                                            {uni}
                                        </option>
                                    ))}
                                </select>

                                <input className='gpa-input-roadmap' placeholder='Enter your GPA' {...register("averageMastersGpa")}></input>

                                <input className='sats-input-roadmap' placeholder='Enter your GRE score' {...register("greScore")}></input>
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
                                    <input type="radio" name="radio-roadmap"
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

                        <div className='gpa-popup-container'>
                            <div className='pop-up1'>
                                <p className='pop-up-text'>Your journey starts here!</p>
                            </div>
                            <img className='roadmap-button-start' src='src\assets\Roadmap\start.png'></img>
                        </div>

                        <div className='gpa-popup-container'>
                            {isGpaPopupVisible && (
                                <div className='pop-up2'>
                                    <p className='pop-up-text'>{messageGpa || "Enter your Gpa"}</p>
                                </div>
                            )}
                            <img className='roadmap-button2' src='src\assets\Roadmap\location3.png' onClick={handleGpaButtonClick}></img>
                        </div>

                        <div className='gpa-popup-container'>
                            {isIeltsToeflPopupVisible && (
                                <div className='pop-up3'>
                                    <p className='pop-up-text'>{messageIeltsToefl || "Enter your English test score"}</p>
                                </div>
                            )}
                            <img className='roadmap-button3' src='src\assets\Roadmap\location5.png' onClick={handleIeltsToeflButtonClick}></img>
                        </div>

                    </div>

                    <div className='roadmap-end-container'>
                        <img className='roadmap-img' src='src\assets\Roadmap\roadmap.png'></img>
                        <img className='roadmap-img-end' src='src\assets\Roadmap\end.png'></img>
                    </div>

                    <div className='bottom-roadmap-buttons'>

                        <div className='gpa-popup-container'>
                            <img className='roadmap-button4' src='src\assets\Roadmap\location2.png' onClick={togglePopupUni}></img>
                            {isUniPopupVisible && (
                                <div className='pop-up-down1'>
                                    <p className='pop-up-text'>{selectedUniOption ? `You have selected ${selectedUniOption}` : "Select a university"}</p>
                                </div>
                            )}
                        </div>

                        <div className='gpa-popup-container'>
                            {isSatGrePopupVisible && (
                                <div className='pop-up-down2'>
                                    <p className='pop-up-text'>{messageSatGre || "Enter your standardized test score"}</p>
                                </div>
                            )}
                            <img className='roadmap-button5' src='src\assets\Roadmap\location4.png' onClick={handleSatsGreButtonClick}></img>
                        </div>

                        <div className='gpa-popup-container'>
                            <img className='roadmap-button6' src='src\assets\Roadmap\location6.png' onClick={handleEssayButtonClick}></img>
                            {isEssayPopupVisible && (
                                <div className='pop-up-down3'>
                                    <p className='pop-up-text'>{messageEssay || "Essay prepared?"}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default Roadmap;