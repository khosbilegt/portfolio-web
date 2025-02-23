import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./Layout";
import Home from "../features/home/pages/Home";
import Blog from "../features/blog/pages/Blog";
import { BlogExplorer } from "../features/blog/pages/BlogExplorer";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/blog">
          <Route path=":id" element={<Layout children={<Blog />} />} />
          <Route
            index
            element={
              <Layout
                key={"blog-explorer"}
                children={<BlogExplorer defaultTags={[23]} />}
              />
            }
          />
        </Route>
        <Route path="/project">
          <Route
            index
            element={
              <Layout
                key={"project-explorer"}
                children={<BlogExplorer defaultTags={[0]} />}
              />
            }
          />
        </Route>
        <Route path="*" element={<Layout children={<Home />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
