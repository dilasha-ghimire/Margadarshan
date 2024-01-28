import AdminExam from './AdminExam';
import "../css-files/AdminExam.css"
import {useEffect, useState} from "react";
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import "../css-files/adminScholarship.css"
import {useNavigate} from "react-router-dom";


function AdminExam_GRE(){

  const navigate = useNavigate();

  useEffect(() => {
    const storedOTP = localStorage.getItem('adminOTP');

    if (storedOTP == null){
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    document.title = "Admin Exams GRE | Margadarshan"
}, [])


  const [isGreContentVisible, setGreContentVisible] = useState(false);
  const handleGreButtonClick = () => {
      setGreContentVisible(!isGreContentVisible);
  };

  const { register, handleSubmit, reset } = useForm();

  // Define a mutation function using react-query's useMutation
  const mutation = useMutation((formData) =>
    axios.post("http://localhost:8080/api/save-exams", formData),
  
  {
    onSuccess: () => {
      // Hide the "adminExam_main" container
      setGreContentVisible(false);

      // Refetch to update the adminExam_sat data
      refetchExams();

      // Show an alert (you can customize this part)
      alert('Exam submitted successfully!');
    },
  });

    // Use react-query's useQuery to fetch exam data
    const { data: examsData, refetch: refetchExams } = useQuery('adminExam_gre', async () => {
      const response = await axios.get('http://localhost:8080/api/exam-deadlines');
      return response.data;
    });

  const onSubmit = async (data) => {
    try {
      data.examId = 2;

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
          <button className='adminExam-Button' onClick={handleGreButtonClick}>+</button>
          {isGreContentVisible && (
        <div className="adminExam_main">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="Ani">
              <div className="Rasu">
                <label className="andminExam_Text">GRE Test Dates</label>
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
        {examsData?.filter((exam) => exam.exam.examId === 2) // Filter exams with examId 1
    .map((exam, index) => (
                <div className="adminSch-main-container" key={index}>
                  {/* <p className="edit-sch-btn" onClick={() => setSatEditContentVisible(!isSatEditContentVisible)}>Edit</p> */}
                  <div className="adminSch-container">
                    <div className="adminSch-description-container">
                    {/* <img className="adminSch-image" src="" /> */}
                      <div className="adminSch-desc">
                        {/* <p className="adminSch-name">{exam.examDateId}</p> */}
                                        <p className="adminSch-name">{exam.examDate}</p>
                                        <p className="adminSch-type">{exam.registrationDeadline}</p>
                                        <p className="adminSch-grant">{exam.lateRegistrationDeadline}</p>
                      </div>
                    </div>
                    <div className="adminSch-deadline-container">
                      {/* Display your exam details here */}
                  {/* <p className='ademinSch-deadlin'>{exam.examDate}</p>
                  <p>{exam.registrationDeadline}</p>
                  <p>{exam.lateRegistrationDeadline}</p> */}
                   {/* <p className="adminSch-deadline-text">Deadline</p>
                                    <p className="ademinSch-deadlin">yassg</p> */}
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
export default AdminExam_GRE;
