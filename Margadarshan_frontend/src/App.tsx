import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';

import University from "./tsx-files/University.tsx";
import Scholarship from './tsx-files/Scholarship.tsx';
import Registration from './tsx-files/Registration.tsx';
import SOP from './tsx-files/SOP.tsx';
import AboutUs from "./tsx-files/AboutUs.tsx";
import Document from "./tsx-files/Document.tsx";
import Header from "./tsx-files/Header.tsx";
import Education from "./tsx-files/Education.tsx";
import Login from './tsx-files/Login.tsx';
import SAT from './tsx-files/SAT.tsx';
import ExamSection from './tsx-files/ExamSection.tsx';
import AdminUniversity from './tsx-files/AdminUniversity.tsx';
import Exam from './tsx-files/Exam.tsx';
import MainHomepage from "./tsx-files/MainHomepage.tsx";
import AdminHeader from './tsx-files/AdminHeader.tsx';
import AdminScholarship from './tsx-files/AdminScholarship.tsx';
import GRE from "./tsx-files/GRE.tsx";
import IELTS from './tsx-files/IELTS.tsx';
import TOEFL from './tsx-files/TOEFL.tsx';
import Roadmap from './tsx-files/Roadmap.tsx';
import AdminEducation from "./tsx-files/AdminEducation.tsx";
import AdminExam from './tsx-files/AdminExam.tsx';
import AdminDashboard from "./tsx-files/AdminDashboard.tsx";
import AdminExam_SAT from './tsx-files/AdminExam_SAT.tsx';
import AdminExam_GRE from './tsx-files/AdminExam_GRE.tsx';
import AdminExam_IELTS from './tsx-files/AdminExam_IELTS.tsx';
import AdminExam_TOEFL from './tsx-files/AdminExam_TOEFL.tsx';
import AdminProfile from "./tsx-files/AdminProfile.tsx";
import ForgotPassword from './tsx-files/ForgotPassword.tsx';
import UserProfile from './tsx-files/UserProfile.tsx';
import AdminDocument from "./tsx-files/AdminDocument.tsx";


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
            path: "/exam",
            element: <Exam/>
        },
        {
            path: "/about-us",
            element: <AboutUs/>
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
        },
        {
            path: "/mainhomepage",
            element: <MainHomepage/>
        },
        {
            path: "/adminHeader",
            element: <AdminHeader/>       
        },
        {
            path: "/adminScholarship",
            element: <AdminScholarship/>
        },
        {
            path: "/gre",
            element: <GRE/>
        },
        {
            path: "/ielts",
            element: <IELTS/>
        },
        {
            path: "/toefl",
            element: <TOEFL/>
        }, 
        {
            path: "/roadmap",
            element: <Roadmap/>
        },
        {
            path: "/admineducation",
            element: <AdminEducation/>
        },
        {
            path: "/admindocument",
            element: <AdminDocument/>
        },
        {
            path: "/adminExam",
            element: <AdminExam/>
        },
        {
            path: "/adminDashboard",
            element: <AdminDashboard/>
        },
        {
            path: "/adminProfile",
            element: <AdminProfile/>
        },
        {
            path: "/forgotPassword",
            element: <ForgotPassword/>
        },
        {
            path: "/adminExam_sat",
            element: <AdminExam_SAT/>
        }, 
        {
            path: "/adminExam_gre",
            element: <AdminExam_GRE/>
        }, 
        {
            path: "/adminExam_ielts",
            element: <AdminExam_IELTS/>
        }, 
        {
            path: "/adminExam_toefl",
            element: <AdminExam_TOEFL/>
        },
        {
            path: "/userProfile",
            element: <UserProfile/>
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