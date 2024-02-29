import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";

import "./assets/styles.css";
import "react-responsive-modal/styles.css";
import Create from "./pages/Create";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/create",
    element: <Create />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <div className="bg-black dark:text-slate-50">
    <div className="min-h-screen mx-auto dark:bg-gray-900 lg:w-3/12 md:w-5/12 sm:w-6/12">
      <RouterProvider router={router} />
    </div>
  </div>
);
