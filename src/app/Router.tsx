import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./Layout";
import Blog from "../features/blog/Blog";
import Home from "../features/home/pages/Home";
import About from "../features/about/pages/About";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/blog">
          <Route index element={<Layout children={<Blog />} />} />
        </Route>
        <Route path="/about" element={<Layout children={<About />} />} />
        <Route path="*" element={<Layout children={<Home />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
