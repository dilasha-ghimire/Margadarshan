// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import { useMutation } from 'react-query';
// import "../css-files/AdminExam.css"
// import AdminExam from './AdminExam';
// import {useEffect, useState} from "react";
// // import "../tsx-files/AdminExam"

// const AdminExam_SAT = () => {

//   useEffect(() => {
//     document.title = "Admin Exams | Margadarshan"
//   }, [])

//   const { register, handleSubmit, reset } = useForm();
//   const [isSatContentVisible, setSatContentVisibility] = useState(false);

//   // Define a mutation function using react-query's useMutation
//   const mutation = useMutation((formData) =>
//     axios.post("http://localhost:8080/api/save-exams", formData)
//   );

//   const onSubmit = async (data) => {
//     try {
//       // Manually set the examId to 1 for SAT
//       data.examId = 1;

//       // Trigger the mutation with the form data
//       await mutation.mutateAsync(data);

//       // Reset the form after successful submission
//       reset();

//       // After successful submission, set visibility to true
//       setSatContentVisibility(true);

//     } catch (error) {
//       console.error('Error submitting form:', error);
//     }
//   };

//   return (
//     <>
//     <AdminExam/>
//     {isSatContentVisible && (
//     <div className="adminExam_main">
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className="Ani">
//           <div className="Rasu">
//             <label className="andminExam_Text">SAT Test Dates</label>
//             <input type="text" {...register('examDate')} />
//             <label className="andminExam_Text">Registration Deadline</label>
//             <input type="text" {...register('registrationDeadline')} />
//             <label className="andminExam_Text">Late Registration Deadline</label>
//             <input type="text" {...register('lateRegistrationDeadline')} />
//           </div>
//           <button
//             className="ExamAdmin_UploadButton"
//             type="submit"
//             disabled={mutation.isLoading} // Disable the button while the mutation is in progress
//           >
//             {mutation.isLoading ? 'Uploading...' : 'Upload'}
//           </button>
//         </div>
//       </form>
//     </div>
//       )}
//     </>
//   );
// };

// export default AdminExam_SAT;
