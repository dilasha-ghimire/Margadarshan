// import "../css-files/Exam.css";
import "../css-files/Exam.css"
import ExamSection from "./ExamSection";
import Header from "./Header";
function Exam(){
    return(
    <>
    <Header/>
    <ExamSection/>
    <h1>Fall 2023 Test Dates</h1>
    <table>
        <thead>
            <tr>
                <th>SAT Test Dates</th>
                <th>Registration Deadline</th>
                <th>Late Registration Deadline</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>November 4, 2023</td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td>y</td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            
        </tbody>
    </table>
    
    </>
    )
}
export default Exam;
