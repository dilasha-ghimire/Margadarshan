import AdminExam from './AdminExam';
import "../css-files/AdminExam.css"
import {useEffect, useState} from "react";
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import "../css-files/adminScholarship.css"
import {useNavigate} from "react-router-dom";

function AdminExam_IELTS(){

  const navigate = useNavigate();

  useEffect(() => {
    const storedOTP = localStorage.getItem('adminOTP');

    if (storedOTP == null){
      navigate('/login');
    }
  }, []);


  useEffect(() => {
    document.title = "Admin Exams IELTS | Margadarshan"
}, [])

  const [isIeltsContentVisible, setIeltsContentVisible] = useState(false);
  const handleIeltsButtonClick = () => {
      setIeltsContentVisible(!isIeltsContentVisible);
  };

  const { register, handleSubmit, reset } = useForm();

  // Define a mutation function using react-query's useMutation
  const mutation = useMutation((formData) =>
    axios.post("http://localhost:8080/api/save-exams", formData),
  
  {
    onSuccess: () => {
      // Hide the "adminExam_main" container
      setIeltsContentVisible(false);

      // Refetch to update the adminExam_sat data
      refetchExams();

      // Show an alert (you can customize this part)
      alert('Exam submitted successfully!');
    },
  });

    // Use react-query's useQuery to fetch exam data
    const { data: examsData, refetch: refetchExams } = useQuery('adminExam_ielts', async () => {
      const response = await axios.get('http://localhost:8080/api/exam-deadlines');
      return response.data;
    });

  const onSubmit = async (data) => {
    try {
      data.examId = 3;

      // Trigger the mutation with the form data
      await mutation.mutateAsync(data);

      // Reset the form after successful submission
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

   

    return (
        <>
        <AdminExam/>
        <div className='adminExam_manage'>
          <button className='adminExam-Button' onClick={handleIeltsButtonClick}>+</button>
          {isIeltsContentVisible && (
        <div className="adminExam_main">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="Ani">
              <div className="Rasu">
                <label className="andminExam_Text">IELTS Test Dates</label>
                <input type="text" {...register('examDate')} />
                <label className="andminExam_Text">Registration Deadline</label>
                <input type="text" {...register('registrationDeadline')}/>
                <label className="andminExam_Text">Late Registration Deadline</label>
                <input type="text" {...register('lateRegistrationDeadline')}/>
              </div>
              <button className="ExamAdmin_UploadButton" type="submit"
            disabled={mutation.isLoading} // Disable the button while the mutation is in progress
          >
            {mutation.isLoading ? 'Uploading...' : 'Upload'}
          </button>
            </div>
          </form>
        </div>
        )}
        </div>
        
        {/* Display uploaded exam data */}
        <div className="adminSch-list">
        {examsData?.filter((exam) => exam.exam.examId === 3)
    .map((exam, index) => (
                <div className="adminSch-main-container" key={index}>
                  {/* <p className="edit-sch-btn" onClick={() => setSatEditContentVisible(!isSatEditContentVisible)}>Edit</p> */}
                  <div className="adminSch-container">
                  <div className="adminSch-description-container">
                      <div className="adminSch-desc">
                        <p className="adminSch-name">IELTS Test Dates</p>
                        <p className="adminSch-name">Registration Deadline</p>
                        <p className="adminSch-name">Late Registration Deadline</p>                
                      </div>
                      
                    </div>
                    <div className="adminSch-deadline-container">
                      {/* Display your exam details here */}
                  <p className='adminSch-name'>{exam.examDate}</p>
                  <p className='adminSch-name'>{exam.registrationDeadline}</p>
                  <p className='adminSch-name'>{exam.lateRegistrationDeadline}</p>

                  </div>
                  </div>
                  <div></div>
                  <div className='adminSch-deadline-container'></div>
                  
                </div>
              ))}
            </div>
        </>
    )
}
export default AdminExam_IELTS;