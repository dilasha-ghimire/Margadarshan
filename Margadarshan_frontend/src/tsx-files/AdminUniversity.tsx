import "../css-files/adminUniHeader.css";
import "../css-files/adminUniCentre.css";
import { useQuery } from "react-query";
import axios from "axios";

function AdminUniversity() {
    const { data, error, isLoading } = useQuery({
        queryKey: "GETDATA",
        queryFn() {
            return axios.get("http://localhost:8080/api/universities")
        }
    })

    console.log("Data:", data);
    console.log("Error:", error);
    console.log("Loading:", isLoading);

    return (
        <>
            <div className="header-adminUni">
                <div className="header-left-adminUni">
                    <img className="logo-adminUni" src="src\assets\AboutPage\Margadarshan logo.png"></img>
                    <p className="margadarshan-adminUni">MARGADARSHAN</p>
                </div>
            </div>

            <div className="centre-adminUni">
                <div className="top-section-adminUni">
                    <div className="search-container-adminUni">
                        <label className="search-uni-adminUni">Search university:</label>

                        <div className="student-searchbar-container-adminUni">
                            <input className="student-searchbar-adminUni"></input>
                            <div className="student-searchbtn-container-adminUni">
                                <button className="student-searchbtn-adminUni">
                                    <img className="student-search-img-adminUni" src="src\assets\AdminUniversity\search.png"></img>
                                </button>
                            </div>
                        </div>
                    </div>

                    <button className="add-uni-btn-adminUni">Add university</button>
                </div>

                <div className="adminUni-list">
                        {data?.data?.map((uni, index) => (
                            <div className="adminUni-container" key={index}>
                                <div className="adminUni-description-container">
                                    <img className="adminUni-image" src="src\assets\University\Michigan_Technological_University_seal.svg.png" />
                                    <div className="adminUni-desc">
                                        <p className="adminUni-name">{uni.name}</p>
                                        <p className="adminUni-state">{uni.city}, {uni.state}</p>
                                        <p className="adminUni-major">{uni.major}</p>
                                    </div>
                                </div>
                                <div className="adminUni-fees-years">
                                    <p className="adminUni-fees">${uni.fees}/year</p>
                                    <p className="adminUni-length">{uni.length} years</p>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </>
    )
}
export default AdminUniversity;
