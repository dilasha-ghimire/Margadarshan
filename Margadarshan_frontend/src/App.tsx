import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import University from "./tsx-files/University.tsx";
import Scholarship from './tsx-files/Scholarship.tsx';
import Registration from './tsx-files/Registration.tsx';

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
      }
  ]
)

function App() {

  return (
      <>
          <RouterProvider router={router}/>
      </>
  )
}

export default App
