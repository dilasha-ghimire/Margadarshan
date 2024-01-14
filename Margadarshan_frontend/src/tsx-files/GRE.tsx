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
            <h2>GRE Exam Dates</h2>
            <table>
                <thead>
                <tr>
                    <th>id</th>
                    <th>Exams</th>
                    <th>GRE Test Dates</th>
                    <th>registrationDeadline</th>
                    <th>lateRegistrationDeadline</th>
                </tr>
                </thead>
                <tbody>
                {data.map((user, index) => (
                    <tr key={index}>
                        <td>{user.examDateId}</td>
                        <td>{user.exam.examName}</td>
                        <td>{user.examDate}</td>
                        <td>{user.registrationDeadline}</td>
                        <td>{user.lateRegistrationDeadline}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}

export default GRE;
