import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import ExamSection from "./ExamSection";

function GRE() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/exam-deadlines")
            .then(res => setData(res.data.filter(item => item.exam.examName === 'GRE')))
            .catch(err => console.log(err));
    }, []);

    return (
        <>
        <Header/>
        <ExamSection/>
        <div className="table-container">
        <table>
                <thead>
                <tr>
                    <th>GRE Test Dates</th>
                    <th>Registration Deadline</th>
                    <th>Late Registration Deadline</th>
                </tr>
                </thead>
                <tbody>
                {data.map((user, index) => (
                    <tr key={index}>
                        <td>{user.examDate}</td>
                        <td>{user.registrationDeadline}</td>
                        <td>{user.lateRegistrationDeadline}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
            
        </>
    );
}

export default GRE;
