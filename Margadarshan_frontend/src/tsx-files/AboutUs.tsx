import React from 'react';
import Header from './Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css-files/aboutUsStyle.css';

const AboutUs: React.FC = () => {
    return (
        <div>
            <Header/>

            <div className="about-us-content">
                <div className = "abt-image-container" style={{ backgroundImage: `url('src/assets/AboutPage/graduation.png')` }}>
                    <div className="introduction color-overlay d-flex justify-content-center align-items-center">
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

                <div className="features-title">

                </div>
            </div>



        </div>
    );
};

export default AboutUs;