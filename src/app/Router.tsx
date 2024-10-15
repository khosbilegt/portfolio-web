import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../features/home/Home";
import NotFound from "../components/NotFound";
import Layout from "../components/Layout";
import Skills from "../features/skills/Skills";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: "/skills",
    element: (
      <Layout>
        <Skills />
      </Layout>
    ),
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
