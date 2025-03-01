import { BrowserRouter, Routes, Route } from "react-router";
import UserLayout from "./UserLayout";
import Home from "../features/home/pages/Home";
import Blog from "../features/blog/pages/Blog";
import { BlogExplorer } from "../features/blog/pages/BlogExplorer";
import Login from "../features/user/pages/Login";
import Register from "../features/user/pages/Register";
import AdminLayout from "./AdminLayout";
import Dashboard from "../features/admin/pages/Dashboard";
import BlockTable from "../features/admin/pages/BlockTable";
import PageTable from "../features/admin/pages/PageTable";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/blog">
          <Route path=":id" element={<UserLayout children={<Blog />} />} />
          <Route
            index
            element={
              <UserLayout
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
              <UserLayout
                key={"project-explorer"}
                children={<BlogExplorer defaultTags={[0]} />}
              />
            }
          />
        </Route>
        <Route path="/user">
          <Route
            path="register"
            element={<UserLayout key={"register"} children={<Register />} />}
          />
          <Route
            index
            element={<UserLayout key={"login"} children={<Login />} />}
          />
        </Route>
        <Route path="/admin/*">
          <Route
            path="block"
            element={<AdminLayout children={<BlockTable />} />}
          />
          <Route
            path="page"
            element={<AdminLayout children={<PageTable />} />}
          />
          <Route index element={<AdminLayout children={<Dashboard />} />} />
        </Route>
        <Route path="*" element={<UserLayout children={<Home />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
