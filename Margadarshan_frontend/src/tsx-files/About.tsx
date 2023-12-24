import "../css-files/aboutHeader.css";
import "../css-files/aboutCentre.css";

function About() {
    return (
        <>
<div className="header">
            <div className="website-title">
                <button className="logo-button" id="logo-button">
                    <div className="logo-container">
                        <a href="homepage1.html"><img className="logo" src="Images\AboutPage\Margadarshan logo.png"/></a>
                    </div>
                </button>
                <button className="website-title-button">
                    MARGADARSHAN
                </button>
            </div>

            <div className="header-button-container">
                <a href = "about.html"><button className="header-button">About</button></a>

                <div className="header-button-uni">
                    <button className="header-button">Universities</button>

                    <div className="drop-down-uni">
                        <a href = "university.html"><button className="drop-down-button">Universities</button></a>
                        <a href="scholarship.html"><button className="drop-down-button">Scholarship</button></a>
                        <button className="drop-down-button">Exams</button>
                    </div>
                </div>

                <div className="header-button-portfolio">
                    <button className="header-button">Portfolio</button>
                    <div className="drop-down-portfolio">
                        <button className="drop-down-button">Education</button>
                        <button className="drop-down-button">Documents</button>
                        <button className="drop-down-button">SOP and Essays</button>
                    </div>
                </div>

                <button className="header-button">Roadmap</button>

                <div className="profile-container">
                    <button className="profile-button">
                        <img className="profile" src="Images\AboutPage\profile.png"/>
                    </button>   
                    <button className="logout-button">Logout</button>
                </div>
            </div>
        </div>

        <div className="content">
            <div className="about">
                <div className="banner1">
                    <div className="about-title">
                        <p className="about-us">About us</p>
                        <p className="about-us-subtext">
                            Our vision and values reflect what we believe and guide our actions.
                        </p>
                    </div>
                    <div className="about-image-container">
                        <img className="about-image" src="Images\AboutPage\about.png"/>
                    </div>
                </div>
                <div className="about-content-container">
                    Welcome to Margadarshan, GyanSarathi's pioneering initiative dedicated to guiding Nepalese students on their journey to study in the USA. 
                    In a dynamic global education landscape, Margadarshan stands as a beacon, offering comprehensive insights, step-by-step instructions, and invaluable resources to simplify the path to pursuing higher education abroad. 
                    As the number of Nepalese students seeking international education continues to surge, Margadarshan takes pride in empowering individuals with the tools they need to navigate this transformative experience.
                </div>
            </div>

            <div className="visions-values">
                <div className="banner2">
                    <div className="visions-images-left">
                        <img className="firecracker1" src="Images\AboutPage\visions.png"/>
                        <img className="firecracker2" src="Images\AboutPage\visions.png"/>
                        <img className="firecracker3" src="Images\AboutPage\visions.png"/>
                    </div>
                    <p className="visions-values">Our Visions and Values</p>
                    <div className="visions-images-right">
                        <img className="firecracker3" src="Images\AboutPage\visions.png"/>
                        <img className="firecracker2" src="Images\AboutPage\visions.png"/>
                        <img className="firecracker1" src="Images\AboutPage\visions.png"/>
                    </div>
                </div>
                <div className="visions-desc">
                    <ul>
                        <li>To enhance access to American educational opportunities by providing a diverse range of resources</li>
                        <p></p>
                        <li>To streamline the application journey through an easy-to-use platform</li>
                        <p></p>
                        <li>Mitigate cost concerns and boost opportunities through guidance on managing expenses and aiding in university selection</li>
                        <p></p>
                        <li>To speak to various groups of prospective students, considering their special requirements</li>
                        <p></p>
                        <li>To achieve successful placements in U.S. institutions</li>
                    </ul>
                </div>
            </div>

            <div className="copyright-container">
                Copyright &copy 2023 GyanSarathi
            </div>
        </div>
        
        </>
    )
}

export default About;