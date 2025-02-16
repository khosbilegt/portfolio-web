import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./Layout";
import Home from "../features/home/pages/Home";
import { Blog } from "../features/blog/pages/Blog";
import Project from "../features/projects/Project";
import BlogReader from "../features/blog/pages/BlogReader";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/blog">
          <Route path=":id" element={<Layout children={<BlogReader />} />} />
          <Route index element={<Layout children={<Blog />} />} />
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
