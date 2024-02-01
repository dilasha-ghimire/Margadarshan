// import AdminExam from './AdminExam';
// import "../css-files/AdminExam.css"
// import {useEffect, useState} from "react";
// import axios from 'axios';
// import { useForm } from 'react-hook-form';
// import { useMutation, useQuery } from 'react-query';
// import "../css-files/adminScholarship.css"
// function AdminExam_IELTS(){

//   useEffect(() => {
//     document.title = "Admin Exams IELTS | Margadarshan"
// }, [])

//   const [isIeltsContentVisible, setIeltsContentVisible] = useState(false);
//   const handleIeltsButtonClick = () => {
//       setIeltsContentVisible(!isIeltsContentVisible);
//   };
//   const [isIeltsEditContentVisible, setIeltsEditContentVisible] = useState(false);
//   const handleIeltsEdButtonClick = () => {
//     setIeltsEditContentVisible(!isIeltsEditContentVisible);
// };

//   const { register, handleSubmit, reset } = useForm();

//   // Define a mutation function using react-query's useMutation
//   const mutation = useMutation((formData) =>
//     axios.post("http://localhost:8080/api/save-exams", formData),
  
//   {
//     onSuccess: () => {
//       // Hide the "adminExam_main" container
//       setIeltsContentVisible(false);

//       // Refetch to update the adminExam_sat data
//       refetchExams();

//       // Show an alert (you can customize this part)
//       alert('Exam submitted successfully!');
//     },
//   });

//     // Use react-query's useQuery to fetch exam data
//     const { data: examsData, refetch: refetchExams } = useQuery('adminExam_ielts', async () => {
//       const response = await axios.get('http://localhost:8080/api/exam-deadlines');
//       return response.data;
//     });

//   const onSubmit = async (data) => {
//     try {
//       data.examId = 3;

//       // Trigger the mutation with the form data
//       await mutation.mutateAsync(data);

//       // Reset the form after successful submission
//       reset();
//     } catch (error) {
//       console.error('Error submitting form:', error);
//     }
//   };

   

//     return (
//         <>
//         <AdminExam/>
//         <div className='adminExam_manage'>
//           <button className='adminExam-Button' onClick={handleIeltsButtonClick}>+</button>
//           {isIeltsContentVisible && (
//         <div className="adminExam_main">
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <div className="Ani">
//               <div className="Rasu">
//                 <label className="andminExam_Text">IELTS Test Dates</label>
//                 <input type="text" {...register('examDate')} />
//                 <label className="andminExam_Text">Registration Deadline</label>
//                 <input type="text" {...register('registrationDeadline')}/>
//                 <label className="andminExam_Text">Late Registration Deadline</label>
//                 <input type="text" {...register('lateRegistrationDeadline')}/>
//               </div>
//               <button className="ExamAdmin_UploadButton" type="submit"
//             disabled={mutation.isLoading} // Disable the button while the mutation is in progress
//           >
//             {mutation.isLoading ? 'Uploading...' : 'Upload'}
//           </button>
//             </div>
//           </form>
//         </div>
//         )}
//         </div>
        
//         {/* Display uploaded exam data */}
//         <div className="adminSch-list">
//         {examsData?.filter((exam) => exam.exam.examId === 3)
//     .map((exam, index) => (
//                 <div className="adminSch-main-container" key={index}>
//                   <p className="edit-sch-btn" onClick={handleIeltsEdButtonClick}>Edit</p>
//                   <div className="adminSch-container">
//                   <div className="adminSch-description-container">
//                       <div className="adminSch-desc">
//                         <p className="adminSch-name">IELTS Test Dates</p>
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
//   {isIeltsEditContentVisible && (
//   <div className="adminExam_main">
//     <form>
//       <div className="Ani">
//         <div className="Rasu">
//           <label className="andminExam_Text">SAT Test Dates</label>
//           <input type="text" name='exam_date' />
//           <label className="andminExam_Text">Registration Deadline</label>
//           <input type="text" name='registration_deadline' />
//           <label className="andminExam_Text">Late Registration Deadline</label>
//           <input type="text" name='late_registration_deadline' />
//         </div>
//         <button className="ExamAdmin_UploadButton" type="submit">Update</button>
//       </div>
//     </form>
//   </div>
// )}
//         </>
//     )
// }
// export default AdminExam_IELTS;






//
// import React, { useEffect, useState } from "react";
// import axios from 'axios';
// import { useForm } from 'react-hook-form';
// import { useMutation, useQuery } from 'react-query';
// import AdminExam from "./AdminExam";
//
// interface ExamDto {
//   examDate: string;
//   registrationDeadline: string;
//   lateRegistrationDeadline: string;
// }
//
// interface ExamData {
//   exam: {
//     examId: number;
//   };
//   examDateId: number;
//   examDate: string;
//   registrationDeadline: string;
//   lateRegistrationDeadline: string;
// }
//
// const AdminExam_IELTS: React.FC = () => {
//   useEffect(() => {
//     document.title = "Admin Exams IELTS | Margadarshan";
//   }, []);
//
//   const [isIeltsContentVisible, setIeltsContentVisible] = useState(false);
//
//   const handleIeltsButtonClick = () => {
//     setIeltsContentVisible(!isIeltsContentVisible);
//   };
//
//   const { register, handleSubmit, reset } = useForm();
//
//   const mutation = useMutation((formData: ExamDto) =>
//     axios.post("http://localhost:8080/api/save-exams", formData)
//   , {
//     onSuccess: () => {
//       setIeltsContentVisible(false);
//       refetchExams();
//       alert('Exam submitted successfully!');
//     },
//   });
//
//   const { data: examsData, refetch: refetchExams } = useQuery('adminExam_ielts', async () => {
//     const response = await axios.get<ExamData[]>('http://localhost:8080/api/exam-deadlines');
//     return response.data;
//   });
//
//   const onSubmit = async (data: ExamDto) => {
//     try {
//       data.examId = 3;
//       await mutation.mutateAsync(data);
//       reset();
//     } catch (error) {
//       console.error('Error submitting form:', error);
//     }
//   };
//
//   return (
//     <>
//       <AdminExam />
//       <div className='adminExam_manage'>
//         <button className='adminExam-Button' onClick={handleIeltsButtonClick}>+</button>
//         {isIeltsContentVisible && (
//           <div className="adminExam_main">
//             <form onSubmit={handleSubmit(onSubmit)}>
//               <div className="Ani">
//                 <div className="Rasu">
//                   <label className="andminExam_Text">IELTS Test Dates</label>
//                   <input type="text" {...register('examDate',{required:"exam date is required"})} />
//                   <label className="andminExam_Text">Registration Deadline</label>
//                   <input type="text" {...register('registrationDeadline',{required:"registration date is required"})} />
//                   <label className="andminExam_Text">Late Registration Deadline</label>
//                   <input type="text" {...register('lateRegistrationDeadline',{required:"LateRegistration date is required"})} />
//                 </div>
//                 <button className="ExamAdmin_UploadButton" type="submit"
//                   disabled={mutation.isLoading}
//                 >
//                   {mutation.isLoading ? 'Uploading...' : 'Upload'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}
//       </div>
//
//       <div className="adminSch-list">
//         {examsData?.filter((exam) => exam.exam.examId === 3)
//           .map((exam, index) => (
//             <div className="adminSch-main-container" key={index}>
//               {/* <p className="edit-sch-btn">Edit</p> */}
//               <button className="edit-sch-btn">Edit</button>
//               <div className="adminSch-container">
//                 <div className="adminSch-description-container">
//                   <div className="adminSch-desc">
//                     <p className="adminSch-name">IELTS Test Dates</p>
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
//               <div></div>
//               <div className='adminSch-deadline-container'></div>
//             </div>
//           ))}
//       </div>
//     </>
//   );
// }
//
// export default AdminExam_IELTS;



import React, { useEffect, useState } from "react";
// import axios from 'axios';
import { useForm } from 'react-hook-form';
// import { useMutation, useQuery } from 'react-query';
import AdminExam from "./AdminExam";
import axios from "axios";
import {useQuery} from "react-query";

// interface ExamDto {
//   examDate: string;
//   registrationDeadline: string;
//   lateRegistrationDeadline: string;
// }
//
interface ExamData {
  exam: {
    examId: number;
  };
  examDateId: number;
  examDate: string;
  registrationDeadline: string;
  lateRegistrationDeadline: string;
}

const AdminExam_IELTS: React.FC = () => {
  useEffect(() => {
    document.title = "Admin Exams IELTS | Margadarshan";
  }, []);

  const [isIeltsContentVisible, setIeltsContentVisible] = useState(false);
    const [educationData, setEducationData] = useState([]);
    const [editEducationId, setEditEducationId] = useState(null);
  const handleIeltsButtonClick = () => {
      setEditEducationId(null);
      setIeltsContentVisible(!isIeltsContentVisible);
  };

  const { register, handleSubmit,setValue, reset } = useForm();
  const handleEditClick = (event) => {
    const examDateId = event.target.dataset.id;
    const educationToEdit = educationData.find((edu) => edu.examDateId === parseInt(examDateId));
    if (educationToEdit) {
      setValue("eduName", educationToEdit.examDate);
      setValue("eduLevel", educationToEdit.registrationDeadline);
      setValue("lateRegistration", educationToEdit.lateRegistrationDeadline);

      setEditEducationId(educationToEdit.examDateId);
        setIeltsContentVisible(true);
    }
  };
  const onSubmitSaveEdu=async (formData) => {
      try {
          let response;
          if (editEducationId) {
              response = await axios.post('http://localhost:8080/api/update-exams', {
                  examDateId: editEducationId,
                  examDate: formData.eduName,
                  registrationDeadline: formData.eduLevel,
                  lateRegistrationDeadline: formData.lateRegistration,
                  // studentId: localStorage.getItem('loggedInUserId')
              });
          } else {
              response = await axios.post('http://localhost:8080/api/save-exams', {
                  examDate: formData.eduName,
                  registrationDeadline: formData.eduLevel,
                  lateRegistrationDeadline: formData.lateRegistration,
                  examId:3,
                  // studentId: localStorage.getItem('loggedInUserId')
                  onSuccess: () => {
                      setIeltsContentVisible(false);
                      refetchExams();
                      window.alert('Exam submitted successfully!');
                  },
              });
          }
          console.log('Response:', response);
      }
      catch (error) {
          console.error('An error occurred while saving education data:', error);
          window.alert("An error occurred while saving education data: " + error.message);
      }
  };



  // const mutation = useMutation((formData: ExamDto) =>
  //         axios.post("http://localhost:8080/api/save-exams", formData)
  //     , {
  //       onSuccess: () => {
  //         setIeltsContentVisible(false);
  //         refetchExams();
  //         alert('Exam submitted successfully!');
  //       },
  //     });

  const { data: examsData, refetch: refetchExams } = useQuery('adminExam_ielts', async () => {
    const response = await axios.get<ExamData[]>('http://localhost:8080/api/exam-deadlines');
    return response.data;
  });

  // const onSubmit = async (data: ExamDto) => {
  //   try {
  //     data.examId = 3;
  //     await mutation.mutateAsync(data);
  //     reset();
  //   } catch (error) {
  //     console.error('Error submitting form:', error);
  //   }
  // };

  return (
      <>
        <AdminExam />
        <div className='adminExam_manage'>
          <button className='adminExam-Button' onClick={handleIeltsButtonClick}>+</button>
          {isIeltsContentVisible && (
              <div className="adminExam_main">
                <form onSubmit={handleSubmit(onSubmitSaveEdu)}>
                  <div className="Ani">
                    <div className="Rasu">
                      <label htmlFor="eduName" className="andminExam_Text" >IELTS Test Dates</label>
                      <input type="text" id="eduName" {...register('eduName',{required:"exam date is required"})} />
                      <label htmlFor="eduLevel" className="andminExam_Text">Registration Deadline</label>
                      <input type="text" id="eduLevel" {...register('eduLevel',{required:"registration date is required"})} />
                      <label htmlFor="lateRegistration" className="andminExam_Text">Late Registration Deadline</label>
                      <input type="text" id="lateRegistration" {...register('lateRegistration',{required:"LateRegistration date is required"})} />
                    </div>
                    <button className="ExamAdmin_UploadButton" type="submit"

                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
          )}
        </div>

        <div className="adminSch-list">
          {examsData?.filter((exam) => exam.exam.examId === 3)
              .map((exam, index) => (
                  <div className="adminSch-main-container" key={index}>
                    {/* <p className="edit-sch-btn">Edit</p> */}
                    <button className="edit-sch-btn" data-id={exam.examDateId} onClick={handleEditClick}>Edit</button>
                    <div className="adminSch-container">
                      <div className="adminSch-description-container">
                        <div className="adminSch-desc">
                          <p className="adminSch-name">IELTS Test Dates</p>
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
                    <div></div>
                    <div className='adminSch-deadline-container'></div>
                  </div>
              ))}
        </div>
      </>
  );
}

export default AdminExam_IELTS;
