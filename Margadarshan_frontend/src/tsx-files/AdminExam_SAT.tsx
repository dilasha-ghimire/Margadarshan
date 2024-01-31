// import { useState } from 'react';
// import axios from 'axios';
// import { useForm } from 'react-hook-form';
// import { useMutation, useQueryClient, useQuery } from 'react-query';
// import AdminExam from './AdminExam';
// import "../css-files/adminScholarship.css"
// import { useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';

// const AdminExam_SAT = () => {
//   const {examDateId}=useParams();
//   const [data, setdata]=useState([])
//   const navigate= useNavigate()
//   useEffect(() => {
//     axios.get('http://localhost:8080/api/exam-deadlines/${examDateId}')
//     .then(res=>setdata(res.data))
//     .catch(err=>console.log(err))
//     document.title = "Admin Exams SAT | Margadarshan"
// }, [examDateId])
// // function handleEditSubmit(event){
// //   event.preventDefault()
// //   axios.post("http://localhost:8080/api/update-exams/"+examDateId, data)
// //   .then(res => {
// //     alert("data update successfully!")
// //     navigate("/")

// //  
// // }
// // Inside the handleEditSubmit function
// function handleEditSubmit(event) {
//   event.preventDefault();
//   axios.post("http://localhost:8080/api/update-exams/" + examDateId, {
//     // Use camelCase property names
//     examDateId: data.examDateId,
//     examDate: data.examDate,
//     registrationDeadline: data.registrationDeadline,
//     lateRegistrationDeadline: data.lateRegistrationDeadline,
//   })
//     .then(res => {
//       alert("Data updated successfully!");
//       navigate("/");
//     })
//     .catch(error => {
//       console.error('Error updating data:', error);
//     });
// }

//   const { register, handleSubmit, reset } = useForm();
//   const [isSatContentVisible, setSatContentVisible] = useState(false);
//   const [isSatEditContentVisible, setSatEditContentVisible] = useState(false);
//   const queryClient = useQueryClient();

//   // Use react-query's useQuery to fetch exam data
//   const { data: examsData, refetch: refetchExams } = useQuery('adminExam_sat', async () => {
//     const response = await axios.get('http://localhost:8080/api/exam-deadlines');
//     return response.data;
//   });

//   // Define a mutation function using react-query's useMutation
//   const mutation = useMutation(
//     (formData) => axios.post('http://localhost:8080/api/save-exams', formData),
//     {
//       onSuccess: () => {
//         // Hide the "adminExam_main" container
//         // setSatContentVisible(false);

//         // Refetch to update the adminExam_sat data
//         refetchExams();

//         // Show an alert (you can customize this part)
//         alert('Exam submitted successfully!');
//       },
//     }
//   );

//   const onSubmit = async (data) => {
//     try {
//       // Manually set the examId to 1 for SAT
//       data.examId = 1;

//       // Trigger the mutation with the form data
//       await mutation.mutateAsync(data);

//       // Reset the form after successful submission
//       reset();
//     } catch (error) {
//       console.error('Error submitting form:', error);
//     }
//   };

//   return (
//     <>
//       <AdminExam />
//       <div className="adminExam_manage">
//         <button className="adminExam-Button" onClick={() => setSatContentVisible(!isSatContentVisible)}>
//           +
//         </button>
//         {isSatContentVisible && (
//           <div className="adminExam_main">
//             <form onSubmit={handleSubmit(onSubmit)}>
//               {/* Your form fields go here */}
//               <div className="Ani">
//                 <div className="Rasu">
//                   <label className="andminExam_Text">SAT Test Dates</label>
//                   <input type="text" {...register('examDate')} />
//                   <label className="andminExam_Text">Registration Deadline</label>
//                   <input type="text" {...register('registrationDeadline')} />
//                   <label className="andminExam_Text">Late Registration Deadline</label>
//                   <input type="text" {...register('lateRegistrationDeadline')} />
//                 </div>
//                 <button className="ExamAdmin_UploadButton" type="submit" disabled={mutation.isLoading}>
//                   {mutation.isLoading ? 'Uploading...' : 'Upload'}
//                 </button>
//               </div>
//             </form>

//           </div>
//         )}
//       </div>
//       {isSatEditContentVisible && (
//       <div className="adminExam_main">
//             <form onSubmit={handleEditSubmit}>
//               {/* Your form fields go here */}
//               <div className="Ani">
//                 <div className="Rasu">
//                   <label className="andminExam_Text">SAT Test Dates</label>
//                   <input type="text" name='exam_date' value={data.examDate} onChange={(e) => setdata({...data, examDate: e.target.value})}/>
//                   <label className="andminExam_Text">Registration Deadline</label>
//                   <input type="text" name='registration_deadline' value={data.registrationDeadline} onChange={(e) => setdata({...data, registrationDeadline: e.target.value})} />
//                   <label className="andminExam_Text">Late Registration Deadline</label>
//                   <input type="text"name='late_registration_deadline'  value={data.lateRegistrationDeadline} onChange={(e) => setdata({...data, lateRegistrationDeadline: e.target.value})} />
//                 </div>
//                 <button className="ExamAdmin_UploadButton" type="submit" >Update
//                 </button>
//               </div>
//             </form>

//           </div>
//       )}
      
//             {/* Display uploaded exam data */}
//             <div className="adminSch-list">
//             {examsData?.filter((exam) => exam.exam.examId === 1) // Filter exams with examId 1
//     .map((exam, index) => (
//                 <div className="adminSch-main-container" key={index}>
//                   <p className="edit-sch-btn" onClick={() => setSatEditContentVisible(!isSatEditContentVisible)}>Edit</p>
//                   <div className="adminSch-container">
//                   <div className="adminSch-description-container">
//                       <div className="adminSch-desc">
//                         <p className="adminSch-name">SAT Test Dates</p>
//                         <p className="adminSch-name">Registration Deadline</p>
//                         <p className="adminSch-name">Late Registration Deadline</p>                
//                       </div>
                      
//                     </div>
//                     <div className="adminSch-deadline-container">
//                       {/* Display your exam details here */}                 
//                   <p className='adminSch-name'>{exam.examDate}</p>
//                   <p className='adminSch-name'>{exam.registrationDeadline}</p>
//                   <p className='adminSch-name'>{exam.lateRegistrationDeadline}</p>

//                   </div>
//                   </div>
//                   <div></div>
//                   <div className='adminSch-deadline-container'></div>
                  
//                 </div>
//               ))}
//             </div>
//     </>
//   );
// };

// export default AdminExam_SAT;

// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useForm } from 'react-hook-form';
// import { useMutation, useQueryClient, useQuery } from 'react-query';
// import AdminExam from './AdminExam';
// import '../css-files/adminScholarship.css';
// import { useNavigate, useParams } from 'react-router-dom';

// const AdminExam_SAT = () => {
//   const { examDateId } = useParams();
//   const [data, setdata] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios.get(`http://localhost:8080/api/exam-deadlines/${examDateId}`)
//       .then(res => {
//         const examDetails = res.data[0]; // Assuming you are interested in the first item in the array
//         setdata({
//           examDateId: examDetails.examDateId,
//           examDate: examDetails.examDate,
//           registrationDeadline: examDetails.registrationDeadline,
//           lateRegistrationDeadline: examDetails.lateRegistrationDeadline,
//         });
//       })
//       .catch(err => console.log(err));
//     document.title = "Admin Exams SAT | Margadarshan";
//   }, [examDateId]);

//   function handleEditSubmit(event) {
//     event.preventDefault();
//     axios.post(`http://localhost:8080/api/update-exams/${examDateId}`, {
//       examDateId: examDateId,
//       examDate: data.examDate,
//       registrationDeadline: data.registrationDeadline,
//       lateRegistrationDeadline: data.lateRegistrationDeadline,
//     })
//       .then(res => {
//         alert("Data updated successfully!");
//         navigate("/");
//       })
//       .catch(error => {
//         console.error('Error updating data:', error);
//       });
//   }

//   const { register, handleSubmit, reset } = useForm();
//   const [isSatContentVisible, setSatContentVisible] = useState(false);
//   const [isSatEditContentVisible, setSatEditContentVisible] = useState(false);
//   const queryClient = useQueryClient();

//   const { data: examsData, refetch: refetchExams } = useQuery('adminExam_sat', async () => {
//     const response = await axios.get('http://localhost:8080/api/exam-deadlines');
//     return response.data;
//   });

//   const mutation = useMutation(
//     (formData) => axios.post('http://localhost:8080/api/save-exams', formData),
//     {
//       onSuccess: () => {
//         refetchExams();
//         alert('Exam submitted successfully!');
//       },
//     }
//   );

//   const onSubmit = async (data) => {
//     try {
//       data.examId = 1;
//       await mutation.mutateAsync(data);
//       reset();
//     } catch (error) {
//       console.error('Error submitting form:', error);
//     }
//   };

//   return (
//     <>
//       <AdminExam />
//       <div className="adminExam_manage">
//         <button className="adminExam-Button" onClick={() => setSatContentVisible(!isSatContentVisible)}>
//           +
//         </button>
//         {isSatContentVisible && (
//           <div className="adminExam_main">
//             <form onSubmit={handleSubmit(onSubmit)}>
//               <div className="Ani">
//                 <div className="Rasu">
//                   <label className="andminExam_Text">SAT Test Dates</label>
//                   <input type="text" {...register('examDate')} defaultValue={data.examDate} />
//                   <label className="andminExam_Text">Registration Deadline</label>
//                   <input type="text" {...register('registrationDeadline')} defaultValue={data.registrationDeadline} />
//                   <label className="andminExam_Text">Late Registration Deadline</label>
//                   <input type="text" {...register('lateRegistrationDeadline')} defaultValue={data.lateRegistrationDeadline} />
//                 </div>
//                 <button className="ExamAdmin_UploadButton" type="submit" disabled={mutation.isLoading}>
//                   {mutation.isLoading ? 'Uploading...' : 'Upload'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}
//       </div>
//       {isSatEditContentVisible && (
//         <div className="adminExam_main">
//           <form onSubmit={handleEditSubmit}>
//             <div className="Ani">
//               <div className="Rasu">
//                 <label className="andminExam_Text">SAT Test Dates</label>
//                 <input type="text" name='exam_date' value={data.examDate} onChange={(e) => setdata({ ...data, examDate: e.target.value })} />
//                 <label className="andminExam_Text">Registration Deadline</label>
//                 <input type="text" name='registration_deadline' value={data.registrationDeadline} onChange={(e) => setdata({ ...data, registrationDeadline: e.target.value })} />
//                 <label className="andminExam_Text">Late Registration Deadline</label>
//                 <input type="text" name='late_registration_deadline' value={data.lateRegistrationDeadline} onChange={(e) => setdata({ ...data, lateRegistrationDeadline: e.target.value })} />
//               </div>
//               <button className="ExamAdmin_UploadButton" type="submit">Update</button>
//             </div>
//           </form>
//         </div>
//       )}
//       <div className="adminSch-list">
//         {examsData?.filter((exam) => exam.exam.examId === 1)
//           .map((exam, index) => (
//             <div className="adminSch-main-container" key={index}>
//               <p className="edit-sch-btn" onClick={() => setSatEditContentVisible(!isSatEditContentVisible)}>Edit</p>
//               <div className="adminSch-container">
//                 <div className="adminSch-description-container">
//                   <div className="adminSch-desc">
//                     <p className="adminSch-name">SAT Test Dates</p>
//                     <p className="adminSch-name">Registration Deadline</p>
//                     <p className="adminSch-name">Late Registration Deadline</p>
//                   </div>
//                 </div>
//                 <div className="adminSch-deadline-container">
//                   <p className='adminSch-name'>{exam.examDate}</p>
//                   <p className='adminSch-name'>{exam.registrationDeadline}</p>
//                   <p className='adminSch-name'>{exam.lateRegistrationDeadline}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//       </div>
//     </>
//   );
// };

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import AdminExam from './AdminExam';
import '../css-files/adminScholarship.css';
import { useNavigate, useParams } from 'react-router-dom';

interface ExamDetails {
  examDateId: number;
  exam: {
    examId: number;
    examName: string;
  };
  examDate: string;
  registrationDeadline: string;
  lateRegistrationDeadline: string;
}

const AdminExam_SAT = () => {
  const { examDateId } = useParams();
  const [data, setdata] = useState<ExamDetails[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8080/api/exam-deadlines`)
      .then(res => {
        setdata(res.data);
      })
      .catch(err => console.log(err));
    document.title = "Admin Exams SAT | Margadarshan";
  }, [examDateId]);

  const handleEditSubmit = (event: React.FormEvent, examDateId: number) => {
    event.preventDefault();

    setSatEditContentVisible(true);
    const editedData = data.find(exam => exam.examDateId === examDateId);

    if (editedData) {
      const formData = {
        examDateId: examDateId,
        examId:editedData.exam.examId,
        examDate: editedData.exam.examDate,
        registrationDeadline: editedData.exam.registrationDeadline,
        lateRegistrationDeadline: editedData.exam.lateRegistrationDeadline,
      };

      axios.put(`http://localhost:8080/api/update-exams`, formData)
        .then(res => {
          alert("Data updated successfully!");
          navigate("/");
        })
        .catch(error => {
          console.error('Error updating data:', error);
        });
    }
  };

  const { register, handleSubmit, reset } = useForm();
  const [isSatContentVisible, setSatContentVisible] = useState(false);
  const [isSatEditContentVisible, setSatEditContentVisible] = useState(false);
  const queryClient = useQueryClient();

  const { data: examsData, refetch: refetchExams } = useQuery('adminExam_sat', async () => {
    const response = await axios.get('http://localhost:8080/api/exam-deadlines');
    return response.data;
  });

  const mutation = useMutation(
    (formData) => axios.post('http://localhost:8080/api/save-exams', formData),
    {
      onSuccess: () => {
        refetchExams();
        alert('Exam submitted successfully!');
      },
    }
  );

  const onSubmit = async (data) => {
    try {
      data.examId = 1;
      await mutation.mutateAsync(data);
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  const getSelectedExam = () => {
    return data.find(exam => exam.examDateId === parseInt(examDateId, 10));
  };

  return (
    <>
      <AdminExam />
      <div className="adminExam_manage">
        <button className="adminExam-Button" onClick={() => setSatContentVisible(!isSatContentVisible)}>
          +
        </button>
        {isSatContentVisible && (
          <div className="adminExam_main">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="Ani">
                <div className="Rasu">
                  <label className="andminExam_Text">SAT Test Dates</label>
                  <input type="text" {...register('examDate')} defaultValue={data[0]?.examDate || ''} />
                  <label className="andminExam_Text">Registration Deadline</label>
                  <input type="text" {...register('registrationDeadline')} defaultValue={data[0]?.registrationDeadline || ''} />
                  <label className="andminExam_Text">Late Registration Deadline</label>
                  <input type="text" {...register('lateRegistrationDeadline')} defaultValue={data[0]?.lateRegistrationDeadline || ''} />
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
    <form onSubmit={(e) => handleEditSubmit(e, examDateId)}>
      <div className="Ani">
        <div className="Rasu">
          <label className="andminExam_Text">SAT Test Dates</label>
          <input type="text" name='exam_date' value={getSelectedExam()?.examDate || ''} onChange={(e) => setdata([{ ...getSelectedExam(), examDate: e.target.value }])} />
          <label className="andminExam_Text">Registration Deadline</label>
          <input type="text" name='registration_deadline' value={getSelectedExam()?.registrationDeadline || ''} onChange={(e) => setdata([{ ...getSelectedExam(), registrationDeadline: e.target.value }])} />
          <label className="andminExam_Text">Late Registration Deadline</label>
          <input type="text" name='late_registration_deadline' value={getSelectedExam()?.lateRegistrationDeadline || ''} onChange={(e) => setdata([{ ...getSelectedExam(), lateRegistrationDeadline: e.target.value }])} />
        </div>
        <button className="ExamAdmin_UploadButton" type="submit">Update</button>
      </div>
    </form>
  </div>
)}
      <div className="adminSch-list">
        {examsData?.filter((exam) => exam.exam.examId === 1)
          .map((exam, index) => (
            <div className="adminSch-main-container" key={index}>
              <p className="edit-sch-btn" onClick={() => setSatEditContentVisible(!isSatEditContentVisible)}>Edit</p>
              <div className="adminSch-container">
                <div className="adminSch-description-container">
                  <div className="adminSch-desc">
                    <p className="adminSch-name">SAT Test Dates</p>
                    <p className="adminSch-name">Registration Deadline</p>
                    <p className="adminSch-name">Late Registration Deadline</p>
                  </div>
                </div>
                <div className="adminSch-deadline-container">
                  <p className='adminSch-name'>{exam.examDate}</p>
                  <p className='adminSch-name'>{exam.registrationDeadline}</p>
                  <p className='adminSch-name'>{exam.lateRegistrationDeadline}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default AdminExam_SAT;