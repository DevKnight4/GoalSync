import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import GoalSheetPage from "./pages/employee/GoalSheetPage";

import AppLayout from "./layout/AppLayout";

import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import ManagerDashboard from "./pages/manager/ManagerDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManagerApprovalsPage from "./pages/manager/ManagerApprovalsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Redirect root */}
        <Route path="/" element={<Navigate to="/employee" />} />

        {/* Layout Routes */}
        <Route element={<AppLayout />}>
          <Route path="/employee" element={<EmployeeDashboard />} />
          <Route path="/manager" element={<ManagerDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/employee/goals" element={<GoalSheetPage />} />
          <Route path="/manager/approvals" element={<ManagerApprovalsPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;