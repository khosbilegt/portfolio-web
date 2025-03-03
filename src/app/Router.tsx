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
import PageEditor from "../features/admin/pages/PageEditor";
import TagTable from "../features/admin/pages/TagTable";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/blog">
          <Route path=":key" element={<UserLayout children={<Blog />} />} />
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
            path="tag"
            element={
              <AdminLayout
                children={<TagTable />}
                breadcrumbItems={[
                  {
                    title: "Admin",
                    href: "/admin",
                  },
                  {
                    title: "Tag",
                    href: "/admin/tag",
                  },
                ]}
              />
            }
          />
          <Route
            path="block"
            element={
              <AdminLayout
                children={<BlockTable />}
                breadcrumbItems={[
                  {
                    title: "Admin",
                    href: "/admin",
                  },
                  {
                    title: "Block",
                    href: "/admin/block",
                  },
                ]}
              />
            }
          />
          <Route
            path="page/:id"
            element={
              <AdminLayout
                children={<PageEditor />}
                breadcrumbItems={[
                  {
                    title: "Admin",
                    href: "/admin",
                  },
                  {
                    title: "Page",
                    href: "/admin/page",
                  },
                ]}
              />
            }
          />
          <Route
            path="page"
            element={
              <AdminLayout
                children={<PageTable />}
                breadcrumbItems={[
                  {
                    title: "Admin",
                    href: "/admin",
                  },
                  {
                    title: "Page",
                    href: "/admin/page",
                  },
                ]}
              />
            }
          />
          <Route
            index
            element={
              <AdminLayout
                children={<Dashboard />}
                breadcrumbItems={[
                  {
                    title: "Admin",
                    href: "/admin",
                  },
                  {
                    title: "Dashboard",
                    href: "/admin",
                  },
                ]}
              />
            }
          />
        </Route>
        <Route path="*" element={<UserLayout children={<Home />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
