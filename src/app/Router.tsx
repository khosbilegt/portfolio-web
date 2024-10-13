import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "*",
    element: <div>Not Found</div>,
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
