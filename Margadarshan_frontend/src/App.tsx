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
<<<<<<< Updated upstream
//import AdminHeader from './tsx-files/AdminHeader.tsx';
//import AdminScholarship from './tsx-files/AdminScholarship.tsx';
//import GRE from "./tsx-files/GRE.tsx";
//import IELTS from './tsx-files/IELTS.tsx';
//import TOEFL from './tsx-files/TOEFL.tsx';
//import Roadmap from './tsx-files/Roadmap.tsx';

=======
import AdminHeader from './tsx-files/AdminHeader.tsx';
import AdminScholarship from './tsx-files/AdminScholarship.tsx';
import GRE from "./tsx-files/GRE.tsx";
import IELTS from './tsx-files/IELTS.tsx';
import TOEFL from './tsx-files/TOEFL.tsx';
import Roadmap from './tsx-files/Roadmap.tsx';
import AdminEducation from "./tsx-files/AdminEducation.tsx";
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
=======
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
        }
>>>>>>> Stashed changes
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
