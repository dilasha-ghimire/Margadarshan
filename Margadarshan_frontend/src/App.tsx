import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import University from "./tsx-files/University.tsx";
import Scholarship from './tsx-files/Scholarship.tsx';
import Registration from './tsx-files/Registration.tsx';
import SOP from './tsx-files/SOP.tsx';
import SOPDialogBox from './tsx-files/SOPDialogBox.tsx';
import { QueryClient, QueryClientProvider } from 'react-query';
import University1 from './tsx-files/University1.tsx';
import About from "./tsx-files/About.tsx";
import Document from "./tsx-files/Document.tsx";
import Login from './tsx-files/Login.tsx';


const router = createBrowserRouter(
  [
      {
          path: "/about-us",
          element: <About/>
      },
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
            path: "exam",
            element: <University1/>
      },
      {
          path: "/login",
          element: <Login/>
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
