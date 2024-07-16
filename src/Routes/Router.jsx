import { createBrowserRouter } from "react-router-dom";
import Dashbord from "../Pages/Dashbord/Dashbord";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Register from "../Pages/Register/Register";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashbord />,
    // children:
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <ErrorPage />,
  },
]);
export default router;
