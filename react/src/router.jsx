import { createBrowserRouter } from "react-router-dom";
import Parcours from "./vue/Parcours";
import User from "./vue/User";


const router = createBrowserRouter([
  {
    path: '/',
    element: <Parcours />
  }, {
    path: '/users/me',
    element: <User />
  }

])

export default router;