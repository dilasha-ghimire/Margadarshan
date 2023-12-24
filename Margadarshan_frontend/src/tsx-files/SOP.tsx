import './SOPUpload.css'

function SOP() {
   
    return(
    <>
        <div className="rasmi">
        <div className="header">
        <div className="website-title">
            <button className="logo-button" id="logo-button">
                <div className="logo-container">
                    <a href="homepage1.html"><img className="logo" src="src\assets\AboutPage\Margadarshan logo.png"/></a>
                </div>
            </button>
            <a href="homepage1.html"><button className="website-title-button" id="website-title-button">
                MARGADARSHAN
            </button></a>
        </div>

        <div className="header-button-container">
            <div className="about-univerisity-portfolio-roadmap">

            </div>
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
                    <img className="profile" src="src\assets\AboutPage\profile.png"/>
                </button>   
                <button className="logout-button">Logout</button>
            </div>
        </div>
          {/* ... rest of your code ... */}
        </div>
        <div className="t">
          <h1 className="sn" id="clu">
            SOP and essays
          </h1>
          <h3 className="sn">Upload your SOP and essays for review</h3>
          <button id="sopUploadButton" className="other-button">
            <b>Click me</b>
          </button>
        </div>
      </div>
    </>
    )
}
export default SOP;
