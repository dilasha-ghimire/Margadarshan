import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';
import University from "./tsx-files/University.tsx";
import Scholarship from './tsx-files/Scholarship.tsx';
import Registration from './tsx-files/Registration.tsx';
import SOP from './tsx-files/SOP.tsx';
import SOPDialogBox from './tsx-files/SOPDialogBox.tsx';
import Exam from './tsx-files/Exam.tsx';
import Document from "./tsx-files/Document.tsx";
import Header from "./tsx-files/Header.tsx";
import Education from "./tsx-files/Education.tsx";
import Login from './tsx-files/Login.tsx';
import Exam from './tsx-files/Exam.tsx';
import SAT from './tsx-files/SAT.tsx';
import ExamSection from './tsx-files/ExamSection.tsx';
import AdminUniversity from './tsx-files/AdminUniversity.tsx';

const router = createBrowserRouter(
  [
      {
          path: "/university",
          element: <University/>
      },
      {
          path: "/scholarship",
          element: <Scholarship/>
      },
      {
          path: "/register",
          element: <Registration/>
      },
      {
          path: "/login",
          element: <Login/>
      },
      {
          path: "/document",
          element: <Document/>
      },
      {
          path:"/sop",
          element:<SOP/>
      },
      {
          path:"/dialogbox",
          element:<SOPDialogBox/>
      },
      {
          path: "/exam",
          element: <Exam/>
      },
      {
          path: "/header",
          element: <Header/>
      },
      {
          path: "/education",
          element: <Education/>
      },
      {

          path: "/sat",
          element: <SAT/>
      },
      {
          path: "/examsection",
          element: <ExamSection/>
      },
      {
          path: "/adminUniversity",
          element: <AdminUniversity/>
      }
  ]
)

const queryClient = new QueryClient();

function App() {

  return (
      <>   
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router}/>
            </QueryClientProvider>
      </>
  )
}

export default App
