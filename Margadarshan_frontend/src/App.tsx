import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import University from "./tsx-files/University.tsx";
// import Scholarship from './tsx-files/Scholarship.tsx';
import Registration from './tsx-files/Registration.tsx';
import About from './tsx-files/About.tsx';
import { QueryClient, QueryClientProvider } from 'react-query';

const router = createBrowserRouter(
  [
      {
          path: "/university",
          element: <University/>
      },
      // {
      //     path: "/scholarship",
      //     element: <Scholarship/>
      // },
      // {
      //     path: "/about",
      //     element: <About/>
      // },
      {
            path: "/register",
            element: <Registration/>
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
