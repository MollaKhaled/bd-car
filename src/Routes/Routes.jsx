import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home/Home/Home";
import Main from "../layouts/Main";
import Login from "../components/Login/Login";
import Register from "../components/Login/Register";
import Book from "../components/Book/Book";
import Bookings from "../components/Bookings/Bookings";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    
    children: [
      {
        path: "/",
        element:<Home></Home>,
      },
      {
        path: "/book/:id",
        element:<PrivateRoute><Book></Book></PrivateRoute>,
        loader: ({params}) => fetch(`http://localhost:3000/services/${params.id}`)
      },
      {
        path: "/bookings",
        element:<PrivateRoute><Bookings></Bookings></PrivateRoute>,
      },
    
    ],
  },
  {
    path: "/login",
    element:<Login></Login>,
  },
  {
    path: "/register",
    element:<Register></Register>,
  },
]);

export default router;