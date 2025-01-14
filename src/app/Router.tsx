import { BrowserRouter, Routes, Route } from "react-router";
import Dashboard from "../features/dashboard/Dashboard";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
