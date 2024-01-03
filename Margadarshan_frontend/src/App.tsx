import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';

import University from "./tsx-files/University.tsx";
import Scholarship from './tsx-files/Scholarship.tsx';
import Registration from './tsx-files/Registration.tsx';
import SOP from './tsx-files/SOP.tsx';
import SOPDialogBox from './tsx-files/SOPDialogBox.tsx';
import University1 from './tsx-files/University1.tsx';
<<<<<<< Updated upstream
=======
// import About from "./tsx-files/About.tsx";

>>>>>>> Stashed changes
import Document from "./tsx-files/Document.tsx";
import Header from "./tsx-files/Header.tsx";
import Education from "./tsx-files/Education.tsx";
import Login from './tsx-files/Login.tsx';


const router = createBrowserRouter(
  [
<<<<<<< Updated upstream
=======
      // {
      //     path: "/about-us",
      //     element: <About/>
      // },
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
          path: "/exam",
          element: <University1/>
      },
      {
          path: "/header",
          element: <Header/>
      },
      {
          path: "/education",
          element: <Education/>
=======
            path: "/exam",
            element: <University1/>
>>>>>>> Stashed changes
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
