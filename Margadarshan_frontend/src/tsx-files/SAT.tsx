
import ExamSection from "./ExamSection";
import {useEffect, useState} from "react";
import axios from "axios";
function SAT(){
    const [data,setdata]=useState([])
    useEffect(() => {
        axios.get("http://localhost:8080/api/exam-deadlines")
            .then(res=>setdata(res.data.filter(item=>item.exam.examName==='SAT')))
            .catch(err=>console.log(err));
    }, []);
    return(
    <>
    <ExamSection/>
        <table>
            <thead>
            <tr>
                <th>id</th>
                <th>Exams</th>
                <th>SAT Test Dates</th>
                <th>registrationDeadline</th>
                <th>lateRegistrationDeadline</th>
            </tr>
            </thead>
            <tbody>
            {data.map((user,index)=>(
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
    )
}
export default SAT;