import "../css-files/ExamSection.css"
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useMutation } from 'react-query';
import "../css-files/AdminExam.css"
import {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import AdminHeader from "./AdminHeader.tsx";


function AdminExam(){

    useEffect(() => {
        document.title = "Admin Exams | Margadarshan"
    }, [])

    const { register, handleSubmit, reset } = useForm();
    const [selectedExam, setSelectedExam] = useState<string | null>(null);

    const [isSatContentVisible, setSatContentVisible] = useState(false);
    const handleButtonClick = () => {
        setSatContentVisible(!isSatContentVisible);
        setGreContentVisible(false);
        setSelectedExam("sat");
    };

    const [isGreContentVisible, setGreContentVisible] = useState(false);
    const handleGreButtonClick = () => {
        setGreContentVisible(!isGreContentVisible);
        setSatContentVisible(false);
        setSelectedExam("gre");

    };

  
    // Define a mutation function using react-query's useMutation
    const mutation = useMutation((formData) =>
      axios.post("http://localhost:8080/api/save-exams", formData)
    );
  
    const onSubmit = async (data) => {
      try {
        if (selectedExam === "sat") {
          data.examId = 1;
        } else if (selectedExam === "gre") {
          data.examId = 2;
        }
        // Manually set the examId to 1 for SAT
        // data.examId = 1;
  
        // Trigger the mutation with the form data
        await mutation.mutateAsync(data);
  
        // Reset the form after successful submission
        reset();
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    };

    return(
        <>
        <AdminHeader/>
        <div className="tarara">
        <div className="left_div" style={{ marginLeft: '100px' }}>
            <div id="exam_text" className="left_content1">Exams</div>
            <div className="left_content"><img className="exam_image" src="src\assets\Exam\section-calendar.png" alt="image" /></div>

        </div>
        {/* <div className="right_div">
            
                <Link to={"/AdminExam_SAT"}><button id="button1" className="exam_types">SAT</button></Link> 
              
                <Link to={"/AdminExam_GRE"}><button id="button2" className="exam_types">GRE</button></Link> 
              
                
                <button id="button3" className="exam_types">IELTS</button>
                
                
                <button id="button4" className="exam_types">TOEFL</button>        
        </div> */}
        <div className="right_div">
            
                <button id="button1" className="exam_types" onClick={handleButtonClick}>SAT</button>
              
                <button id="button2" className="exam_types" onClick={handleGreButtonClick}>GRE</button>
              
                
                <button id="button3" className="exam_types">IELTS</button>
                
                
                {/* <a href="/TOEFL"><button>TOEFL</button></a> */}
                <button id="button4" className="exam_types">TOEFL</button>
                
        </div>
    </div>
    <div className="dates">
        <h1>Fall 2023 Test Dates</h1>
    </div>
    {isSatContentVisible && (
    <div className="adminExam_main">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="Ani">
          <div className="Rasu">
            <label className="andminExam_Text">SAT Test Dates</label>
            <input type="text" {...register('examDate')} />
            <label className="andminExam_Text">Registration Deadline</label>
            <input type="text" {...register('registrationDeadline')} />
            <label className="andminExam_Text">Late Registration Deadline</label>
            <input type="text" {...register('lateRegistrationDeadline')} />
          </div>
          <button
            className="ExamAdmin_UploadButton"
            type="submit"
            disabled={mutation.isLoading} // Disable the button while the mutation is in progress
          >
            {mutation.isLoading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      </form>
    </div>
      )}


{isGreContentVisible && (
    <div className="adminExam_main">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="Ani">
          <div className="Rasu">
            <label className="andminExam_Text">GRE Test Dates</label>
            <input type="text" {...register('examDate')} />
            <label className="andminExam_Text">Registration Deadline</label>
            <input type="text" {...register('registrationDeadline')} />
            <label className="andminExam_Text">Late Registration Deadline</label>
            <input type="text" {...register('lateRegistrationDeadline')} />
          </div>
          <button
            className="ExamAdmin_UploadButton"
            type="submit"
            disabled={mutation.isLoading} // Disable the button while the mutation is in progress
          >
            {mutation.isLoading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      </form>
    </div>
      )}

        </>
    )

}
export default AdminExam;
