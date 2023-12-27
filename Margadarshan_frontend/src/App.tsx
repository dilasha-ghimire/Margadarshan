import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import University from "./tsx-files/University.tsx";
import Scholarship from './tsx-files/Scholarship.tsx';
import Registration from './tsx-files/Registration.tsx';
import SOP from './tsx-files/SOP.tsx';
import SOPDialogBox from './tsx-files/SOPDialogBox.tsx';
import { QueryClient, QueryClientProvider } from 'react-query';
import University1 from './tsx-files/University1.tsx';


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
