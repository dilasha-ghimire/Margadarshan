import ExamSection from "./ExamSection";
import {useEffect, useState} from "react";
import axios from "axios";
function Exam(){

    useEffect(() => {
        document.title = "Exams | Margadarshan"
    }, [])

const [data,setdata]=useState([])
    useEffect(()=>{
        axios.get("http://localhost:8080/api/exam-deadlines")
            .then(res =>setdata(res.data))
            .catch(err => console.log(err));

    },[])

    return(
    <>
    <ExamSection/>
    <div className="table-container">
    <table>
            <thead>
            <tr>
                <th> id</th>
                <th>Exam_id</th>
                <th> Exams</th>
                <th>Exam Test Dates</th>
                <th>registrationDeadline</th>
                <th>lateRegistrationDeadline</th>
                {/*<th>MobileNo</th>*/}
                {/*<th>password</th>*/}

            </tr>
            </thead>
            <tbody>
            {
                data.map((user,index)=>{
                    return <tr key={index}>
                        <td> {user.examDateId}</td>
                        <td> {user.exam.examId}</td>
                        <td>{user.exam.examName}</td>
                        <td>{user.examDate}</td>
                        <td>{user.registrationDeadline}</td>
                        <td>{user.lateRegistrationDeadline}</td>
                        {/*<td>{user.mobileNo}</td>*/}
                        {/*<td>{user.password}</td>*/}



                    </tr>
                })
            }
            </tbody>
        </table>
    </div>
        

    </>
    )
}
export default Exam;
