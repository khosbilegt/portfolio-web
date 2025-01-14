import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./Layout";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Layout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
