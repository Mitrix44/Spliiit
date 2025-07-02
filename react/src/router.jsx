import { createBrowserRouter } from "react-router-dom";
import Parcours from "./vue/Parcours";


const router = createBrowserRouter([
  {
    path: '/',
    element: <Parcours />
  }

])

export default router;