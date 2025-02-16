import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./Layout";
import Home from "../features/home/pages/Home";
import About from "../features/about/pages/About";
import { Blog } from "../features/blog/pages/Blog";

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
