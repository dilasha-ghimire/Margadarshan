import React, {useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { faBookOpenReader } from '@fortawesome/free-solid-svg-icons';
import { faHandshake } from '@fortawesome/free-regular-svg-icons';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import Header from './Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css-files/aboutUsStyle.css';

const AboutUs: React.FC = () => {

    useEffect(() => {
        document.title = "About | Margadarshan"
    }, [])

    return (
        <div>
            <Header/>

            <div className="about-us-content">
                <div className="abt-image-container" style={{ backgroundImage: `url('src/assets/AboutPage/graduation.png')` }}>
                    <div className="introduction abt-color-overlay d-flex justify-content-center align-items-center">
                        <h1 id= "abt-main-header" >Navigating Our Narrative</h1>
                    </div>
                </div>

                <div className="abt-scroll-divider">
                    <div className="abt-scroll-animation">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>

                <div className="abt-margadarshan-animation">
                    <h2 abt-data-text="Margadarshan..." id="abt-animate">Margadarshan...</h2>
                </div>

                <div className="abt-introduction">
                    <p id="intro-para"> is a specialized platform aimed at assisting individuals who aspire to pursue education in the USA.
                        Providing a thorough guide, the platform ensures students are equipped with vital insights, detailed
                        instructions, and essential resources, streamlining and empowering their academic journey in the United States.
                        With the evolving global education landscape, an increasing number of Nepalese students are exploring
                        opportunities to study abroad. Margadarshan addresses this need, offering a thoughtfully crafted approach
                        to simplify the process for those seeking education in the USA.
                    </p>
                </div>

                <div className="abt-vision-value">
                    <div className="abt-vnv-section">
                        <h2>Our Vision and Value</h2>
                        <div className="abt-vnv-cards">
                            <div className="abt-vnv-card">
                                <FontAwesomeIcon icon={faGlobe} />
                                <div className="abt-vnv-content">
                                    <h3>Empowering Global Education</h3>
                                    <p>Striving to empower students
                                        by facilitating accessible and affordable
                                        education opportunities, fostering a
                                        connected and knowledgeable global community.
                                    </p>
                                </div>
                            </div>
                            <div className="abt-vnv-card">
                                <FontAwesomeIcon icon={faUserGroup} />
                                <div className="abt-vnv-content">
                                    <h3>Inclusivity and Diversity</h3>
                                    <p>Embracing the richness of diverse backgrounds,
                                        cultures, and perspectives, we are committed
                                        to creating an inclusive environment
                                        where every student feels valued and supported.
                                    </p>
                                </div>
                            </div>
                            <div className="abt-vnv-card">
                                <FontAwesomeIcon icon={faBookOpenReader} />
                                <div className="abt-vnv-content">
                                    <h3>Transformative Education</h3>
                                    <p>Envisioning education as a transformative journey,
                                        our goal is to provide enriching
                                        experiences that go beyond traditional boundaries,
                                        nurturing holistic development and lifelong skills.
                                    </p>
                                </div>
                            </div>
                            <div className="abt-vnv-card">
                                <FontAwesomeIcon icon={faHandshake} />
                                <div className="abt-vnv-content">
                                    <h3>Integrity and Ethics</h3>
                                    <p>Upholding the highest standards of integrity
                                        and ethics, we are dedicated to ensuring
                                        transparent and honest practices in all
                                        aspects of our educational services, building
                                        trust with our students and partners.
                                    </p>
                                </div>
                            </div>
                            <div className="abt-vnv-card">
                                <FontAwesomeIcon icon={faLightbulb} />
                                <div className="abt-vnv-content">
                                    <h3>Innovation in Education</h3>
                                    <p>Pioneering innovation in education, we aim
                                        to continuously explore and implement
                                        cutting-edge technologies and methodologies,
                                        adapting to the evolving needs of students
                                        and the education landscape.
                                    </p>
                                </div>
                            </div>
                            <div className="abt-vnv-card">
                                <FontAwesomeIcon icon={faGraduationCap} />
                                <div className="abt-vnv-content">
                                    <h3>Student-Centric Approach</h3>
                                    <p>Placing students at the center of our focus,
                                        we are committed to providing personalized
                                        and student-centric support, tailoring our
                                        services to meet the unique needs and
                                        aspirations of each individual learner.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="abt-footer">
                    <p>Copyright &copy; 2023 GyanSarathi</p>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;