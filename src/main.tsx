import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "react-hot-toast";
import LoadingOverlayWrapper from "react-loading-overlay-ts";
import { Spinner } from "flowbite-react";
import { LoadingAtom } from "./states/loading";

import "./assets/styles.css";
import "react-responsive-modal/styles.css";
import { useAtomValue } from "jotai";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/create",
    element: <Create />,
  },
  {
    path: "/:code",
    element: <Dashboard />,
  },
]);

function App() {
  const isLoading = useAtomValue(LoadingAtom);
  return (
    <div className="bg-black dark:text-slate-50">
      <Toaster position="bottom-center" />
      <LoadingOverlayWrapper
        active={isLoading}
        spinner={<Spinner color={"success"} size={"xl"} />}
      >
        <div className="relative min-h-screen mx-auto dark:bg-gray-900 lg:w-3/12 md:w-5/12 sm:w-6/12">
          <div className="w-11/12 mx-auto">
            <RouterProvider router={router} />
          </div>
        </div>
      </LoadingOverlayWrapper>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
