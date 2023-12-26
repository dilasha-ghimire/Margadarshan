import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import University from "./tsx-files/University.tsx";
import Scholarship from './tsx-files/Scholarship.tsx';
import Registration from './tsx-files/Registration.tsx';
import Login from './tsx-files/Login.tsx'
import { QueryClient, QueryClientProvider } from 'react-query';

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
