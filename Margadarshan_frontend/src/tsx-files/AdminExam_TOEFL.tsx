import { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import AdminExam from './AdminExam';
import "../css-files/adminScholarship.css"
import { useEffect } from 'react';
import {useNavigate} from "react-router-dom";

const AdminExam_TOEFL = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const storedOTP = localStorage.getItem('adminOTP');

        if (storedOTP == null){
            navigate('/login');
        }
    }, []);

    useEffect(() => {
        document.title = "Admin Exams TOEFL | Margadarshan"
    }, [])

  const { register, handleSubmit, reset } = useForm();
  const [isToeflContentVisible, settoeflContentVisible] = useState(false);
  const [isSatEditContentVisible, setSatEditContentVisible] = useState(false);
  const queryClient = useQueryClient();

  // Use react-query's useQuery to fetch exam data
  const { data: examsData, refetch: refetchExams } = useQuery('adminExam_sat', async () => {
    const response = await axios.get('http://localhost:8080/api/exam-deadlines');
    return response.data;
  });

  // Define a mutation function using react-query's useMutation
  const mutation = useMutation(
    (formData) => axios.post('http://localhost:8080/api/save-exams', formData),
    {
      onSuccess: () => {
        // Hide the "adminExam_main" container
        settoeflContentVisible(false);

        // Refetch to update the adminExam_sat data
        refetchExams();

        // Show an alert (you can customize this part)
        alert('Exam submitted successfully!');
      },
    }
  );

  const onSubmit = async (data) => {
    try {
      // Manually set the examId to 1 for SAT
      data.examId = 4;

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
      <AdminExam />
      <div className="adminExam_manage">
        <button className="adminExam-Button" onClick={() => settoeflContentVisible(!isToeflContentVisible)}>
          +
        </button>
        {isToeflContentVisible && (
          <div className="adminExam_main">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Your form fields go here */}
              <div className="Ani">
                <div className="Rasu">
                  <label className="andminExam_Text">TOEFL Test Dates</label>
                  <input type="text" {...register('examDate')} />
                  <label className="andminExam_Text">Registration Deadline</label>
                  <input type="text" {...register('registrationDeadline')} />
                  <label className="andminExam_Text">Late Registration Deadline</label>
                  <input type="text" {...register('lateRegistrationDeadline')} />
                </div>
                <button className="ExamAdmin_UploadButton" type="submit" disabled={mutation.isLoading}>
                  {mutation.isLoading ? 'Uploading...' : 'Upload'}
                </button>
              </div>
            </form>

          </div>
        )}
      </div>
      {isSatEditContentVisible && (
      <div className="adminExam_main">
            <form>
              {/* Your form fields go here */}
              <div className="Ani">
                <div className="Rasu">
                  <label className="andminExam_Text">TOEFL Test Dates</label>
                  <input type="text" {...register('examDate')} />
                  <label className="andminExam_Text">Registration Deadline</label>
                  <input type="text" {...register('registrationDeadline')} />
                  <label className="andminExam_Text">Late Registration Deadline</label>
                  <input type="text" {...register('lateRegistrationDeadline')} />
                </div>
                <button className="ExamAdmin_UploadButton" type="submit" >Update
                </button>
              </div>
            </form>

          </div>
      )}
      
            {/* Display uploaded exam data */}
            <div className="adminSch-list">
            {examsData?.filter((exam) => exam.exam.examId === 4) // Filter exams with examId 1
    .map((exam, index) => (
                <div className="adminSch-main-container" key={index}>
                  <p className="edit-sch-btn" onClick={() => setSatEditContentVisible(!isSatEditContentVisible)}>Edit</p>
                  <div className="adminSch-container">
                    <div className="adminSch-description-container">
                      <div className="adminSch-desc">
                        <p className="adminSch-name">TOEFL Test Dates</p>
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
  );
};

export default AdminExam_TOEFL;
