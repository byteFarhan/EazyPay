import { createBrowserRouter } from "react-router-dom";
import Dashbord from "../Pages/Dashbord/Dashbord";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashbord />,
    // children:
    errorElement: <ErrorPage />,
  },
]);
export default router;
