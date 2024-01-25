
import ExamSection from "./ExamSection";
import {useEffect, useState} from "react";
import axios from "axios";
function SAT(){

    useEffect(() => {
        document.title = "Exams | Margadarshan"
    }, [])

    const [data,setdata]=useState([])
    useEffect(() => {
        axios.get("http://localhost:8080/api/exam-deadlines")
            .then(res=>setdata(res.data.filter(item=>item.exam.examName==='SAT')))
            .catch(err=>console.log(err));
    }, []);
    return(
    <>
    <ExamSection/>
    <div className="table-container">
    <table>
            <thead>
            <tr>
                <th>SAT Test Dates</th>
                <th>Registration Deadline</th>
                <th>Late Registration Deadline</th>
            </tr>
            </thead>
            <tbody>
            {data.map((user,index)=>(
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
    )
}
export default SAT;