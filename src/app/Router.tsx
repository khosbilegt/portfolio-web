import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./Layout";
import Home from "../features/home/pages/Home";
import Project from "../features/projects/pages/Project";
import Blog from "../features/blog/pages/Blog";
import { BlogList } from "../features/blog/pages/BlogList";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/blog">
          <Route path=":id" element={<Layout children={<Blog />} />} />
          <Route index element={<Layout children={<BlogList />} />} />
        </Route>
        <Route path="/project">
          <Route index element={<Layout children={<Project />} />} />
        </Route>
        <Route path="*" element={<Layout children={<Home />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
