import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../features/home/Home";
import NotFound from "../components/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
