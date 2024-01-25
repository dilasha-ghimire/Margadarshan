import React, {useEffect} from 'react';
import '../css-files/mhomepagestyle.css';
import Header from "./Header.tsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';

const MainHomepage: React.FC = () => {

    useEffect(() => {
        document.title = "Margadarshan"
    }, [])

    let slideIndex: number = 0;
    (function initSlides(): void {
        const slides: HTMLCollectionOf<Element> = document.getElementsByClassName("mhp-image");
        let firstTimeLoad = true;

        for (let i = 0; i < slides.length; i++) {
            const slide = slides[i] as HTMLElement;
            slide.style.display = "none";
        }

        if (slides.length > 0) {
            const firstSlide = slides[0] as HTMLElement;
            firstSlide.style.display = "block";
        }

        if (firstTimeLoad) {
            setTimeout(() => showSlides(), 0);
            firstTimeLoad = false;
        }
        else {
            setTimeout(() => showSlides(), 3000);
        }

    })();
    function showSlides(): void {
        const slides: HTMLCollectionOf<Element> = document.getElementsByClassName("mhp-image");
        for (let i = 0; i < slides.length; i++) {
            const slide = slides[i] as HTMLElement;
            slide.style.display = "none";
        }

        slideIndex++;

        if (slideIndex > slides.length) {
            slideIndex = 1;
        }
        if (slides.length > 0) {
            const currentSlide = slides[slideIndex - 1] as HTMLElement;

            if (currentSlide) {
                currentSlide.style.display = "block";
            }
        }
        setTimeout(showSlides, 3000);
    }


    return (
        <div>
            <Header/>

            <div className="mhp-content">
                <div className="mhp-img-section">
                    <div className="mhp-image mhp-animate mhp-img-usa" style={{ backgroundImage: `url('src/assets/Homepage/USA.jpg')` }}>
                        <div className="mhp-usa-text mhp-color-overlay d-flex">
                            <h1 id="mhp-usa-main-header">
                                <span className="usa-first-line">A Personal Guide For</span>
                                <br/>
                                <span className="usa-second-line">Your Future</span>
                            </h1>
                        </div>
                    </div>

                    <div className="mhp-image mhp-animate mhp-img-uni" style={{ backgroundImage: `url('src/assets/Homepage/University.jpg')` }}>
                        <div className="mhp-uni-text mhp-color-overlay d-flex">
                            <h1 id="mhp-uni-main-header">
                                <span className="uni-first-line">Discover your path to</span>
                                <br/>
                                <span className="uni-second-line">Higher Education</span>
                            </h1>
                        </div>
                    </div>

                    <div className="mhp-image mhp-animate mhp-img-sch" style={{ backgroundImage: `url('src/assets/Homepage/Scholarship.jpg')` }}>
                        <div className="mhp-sch-text mhp-color-overlay d-flex">
                            <h1 id="mhp-sch-main-header">
                                <span className="sch-first-line">Your journey,</span>
                                <br/>
                                <span className="sch-second-line">our scholarship assistance</span>
                            </h1>
                        </div>
                    </div>

                    <div className="mhp-image mhp-animate mhp-img-road" style={{ backgroundImage: `url('src/assets/Homepage/Roadmap.jpg')` }}>
                        <div className="mhp-road-text mhp-color-overlay d-flex">
                            <h1 id="mhp-road-main-header">
                                <span className="road-first-line">Navigate your future with</span>
                                <br/>
                                <span className="road-second-line">our roadmap</span>
                            </h1>
                        </div>
                    </div>

                    <div className="mhp-image mhp-animate mhp-img-plane" style={{ backgroundImage: `url('src/assets/Homepage/Airport.jpg')` }}>
                        <div className="mhp-plane-text mhp-color-overlay d-flex">
                            <h1 id="mhp-plane-main-header">
                                <span className="plane-first-line">In the skies of tomorrow,</span>
                                <br/>
                                <span className="plane-second-line">find your dreams</span>
                            </h1>
                        </div>
                    </div>
                </div>

                <div className="mhp-our-services">
                    <div className="mhp-service-header">
                        <h3 id="mhp-service-h3">
                            Our Services
                        </h3>
                        <FontAwesomeIcon id="mhp-user-icon" icon={faUsers} />
                    </div>

                    <div className="mhp-arrow">
                        <FontAwesomeIcon className="mhp-animated-icon" icon={faArrowDown} />
                    </div>

                    <div className="mhp-service-section">
                        <div className="mhp-services">
                            <div className="mhp-service-cards mhp-al-1">
                                <div className="mhp-card-content">
                                    <img src="src/assets/Homepage/Expert.png" id="mhp-service-img" alt="Expert Guidance" />
                                    <p>Unlock the door to success with our expert guidance –
                                        your compass for a thriving higher education journey!</p>
                                </div>
                            </div>

                            <div className="mhp-service-cards mhp-al-2">
                                <div className="mhp-card-content">
                                    <img src="src/assets/Homepage/Uni.png" id="mhp-service-img" alt="University" />
                                    <p>Navigate the sea of possibilities effortlessly! Discover
                                        your ideal educational destination with our groundbreaking
                                        university shortlisting feature.</p>
                                </div>
                            </div>

                            <div className="mhp-service-cards mhp-al-3">
                                <div className="mhp-card-content">
                                    <img src="src/assets/Homepage/Map.png" id="mhp-service-img" alt="Map" />
                                    <p>Forge your own path to greatness! Craft a personalized
                                        roadmap for your dream university and embark on a
                                        journey tailored to your aspirations.</p>
                                </div>
                            </div>

                            <div className="mhp-service-cards mhp-al-4">
                                <div className="mhp-card-content">
                                    <img src="src/assets/Homepage/Mortarboard.png" id="mhp-service-img" alt="Mortarboard" />
                                    <p>Don't let opportunities pass you by! Uncover the goldmine
                                        of scholarships with our dynamic shortlisting feature –
                                        ensuring you seize every worthy chance.</p>
                                </div>
                            </div>

                            <div className="mhp-service-cards mhp-al-5">
                                <div className="mhp-card-content">
                                    <img src="src/assets/Homepage/Documents.png" id="mhp-service-img" alt="Documents" />
                                    <p>Transform your aspirations into a compelling narrative!
                                        Upload your content, receive expert feedback, and let
                                        your story shine with enhanced clarity.</p>
                                </div>
                            </div>

                            <div className="mhp-service-cards mhp-al-6">
                                <div className="mhp-card-content">
                                    <img src="src/assets/Homepage/Exam.png" id="mhp-service-img" alt="Exams" />
                                    <p>Explore international opportunities with ease! Search for
                                        admission tests worldwide via us, ensuring you're prepared
                                        for success on the global stage.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mhp-testimonial-title">
                    <FontAwesomeIcon id="mhp-quote-icon" icon={faQuoteLeft} />
                    <h1>Impressions we gathered</h1>
                </div>

                <div id="mhp-testimonial">
                    <div id="mhp-testimonial-grid">
                        <div id="mhp-grid-top">
                            <div id="mhp-testimonial-1" className="mhp-grid-item">
                                <div className="mhp-testimonial-header">
                                    <img src="src/assets/Homepage/img1.jpeg" id="mhp-test-img" alt="Siddharth Bhattarail profile picture"/>
                                        <div className="header-txt">
                                            <p className="mhp-p-name">Siddharth Bhattarai</p>
                                            <p>Proven Customer</p>
                                        </div>
                                </div>
                                <h4>Margadarshan played a pivotal role in streamlining my path to studying in the USA. The step-by-step instructions and comprehensive guide provided me with the clarity I needed. The resources offered were invaluable, making my academic journey seamless and empowering.</h4>
                            </div>
                            <div id="mhp-testimonial-2" className="mhp-grid-item">
                                <div className="mhp-testimonial-header">
                                    <img src="src/assets/Homepage/img2.jpg" id="mhp-test-img" alt="Aanya Acharya profile picture"/>
                                        <div className="header-txt">
                                            <p className="mhp-p-name">Saisha Acharya</p>
                                            <p>Proven Customer</p>
                                        </div>
                                </div>
                                <h4>User-friendly and insightful, Margadarshan is a must-visit for anyone pursuing education in the USA. It made my dream achievable.</h4>
                            </div>
                        </div>
                        <div id="mhp-grid-bottom">
                            <div id="mhp-testimonial-3" className="mhp-grid-item">
                                <div className="mhp-testimonial-header">
                                    <img src="src/assets/Homepage/img3.jpeg" id="mhp-test-img" alt="Parth Gautam profile picture"/>
                                        <div className="header-txt">
                                            <p className="mhp-p-name">Ojashwi Bajracharya</p>
                                            <p>Proven Customer</p>
                                        </div>
                                </div>
                                <h4>Margadarshan's tailored guidance and enjoyable resources boosted my confidence in navigating the complexities of studying in the USA.</h4>
                            </div>
                            <div id="mhp-testimonial-4" className="mhp-grid-item">
                                <div className="mhp-testimonial-header">
                                    <img src="src/assets/Homepage/img4.jpeg" id="mhp-test-img" alt="Arjun Sharma profile picture"/>
                                        <div className="header-txt">
                                            <p className="mhp-p-name">Arjun Sharma</p>
                                            <p>Proven Customer</p>
                                        </div>
                                </div>
                                <h4>Choosing Margadarshan was the best decision I made for my journey to study in the USA. The platform's attention to detail, user-friendly design, and rich resources were instrumental in simplifying the often overwhelming process. I highly recommend it to anyone looking for a comprehensive guide and support system.</h4>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mhp-nv-section">
                    <div className="mhp-nv-header">
                        <h1>News and Blogs</h1>
                    </div>
                    <div className="mhp-nv-scroll">
                            <div className="mhp-nv-box">
                                <a href="https://potomac.edu/international-students-know-american-universities/"><button className="mhp-vn-btn">
                                    <img id="mhp-btn-img" src="src/assets/Homepage/VN1.png"/>
                                </button></a>
                            </div>
                            <div className="mhp-nv-box">
                                <a href="https://www.timeshighereducation.com/student/advice/top-7-qualities-universities-look-student-applicants"><button className="mhp-vn-btn">
                                    <img id="mhp-btn-img" src="src/assets/Homepage/VN2.png"/>
                                </button></a>
                            </div>
                            <div className="mhp-nv-box">
                                <a href="https://shorelight.com/student-stories/how-to-study-in-the-us-a-guide-for-international-students/"><button className="mhp-vn-btn">
                                    <img id="mhp-btn-img" src="src/assets/Homepage/VN3.png"/>
                                </button></a>
                            </div>
                            <div className="mhp-nv-box">
                                <a href="https://educationusa.state.gov/foreign-institutions-and-governments/understanding-us-higher-education/international-student"><button className="mhp-vn-btn">
                                    <img id="mhp-btn-img" src="src/assets/Homepage/VN4.png"/>
                                </button></a>
                            </div>
                            <div className="mhp-nv-box">
                                <a href="https://blog.foreignadmits.com/10-tuition-free-universities-in-the-usa-for-international-students-2023/"><button className="mhp-vn-btn">
                                    <img id="mhp-btn-img" src="src/assets/Homepage/VN5.png"/>
                                </button></a>
                            </div>
                            <div className="mhp-nv-box">
                                <a href="https://yocket.com/blog/fall-intake-in-usa"><button className="mhp-vn-btn">
                                    <img id="mhp-btn-img" src="src/assets/Homepage/VN6.png"/>
                                </button></a>
                            </div>
                            <div className="mhp-nv-box">
                                <a href="https://www.bachelorsportal.com/countries/82/united-states.html"><button className="mhp-vn-btn">
                                    <img id="mhp-btn-img" src="src/assets/Homepage/VN7.png"/>
                                </button></a>
                            </div>
                    </div>

                    <div className="mhp-footer">
                        <p>Copyright &copy; 2023 GyanSarathi</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainHomepage;
