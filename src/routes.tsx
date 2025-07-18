import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import * as Views from "./views/containers";
import { PATHS } from "./constant";
// import { AuthProvider } from "./context/AuthContext";
// import ProtectedRoute from "./views/components/ProtectedRoute";
// import { AdminProvider } from "./context/AdminContext";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={PATHS.ADMIN_MAIN.path} />}
        />

        <Route path={PATHS.ADMIN_MAIN.path} element={<Views.AdminMain />}>
          <Route
            path={PATHS.ADMIN_VIEW.DASHBOARD.path}
            element={<Views.Dashboard />}
          />

          {/* User Management */}
          <Route
            path={PATHS.USER_MGNT.VIEW.path}
            element={<Views.ViewUsers />}
          />
        </Route>

        {/* Public Routes */}
        <Route path={PATHS.LOGIN.path} element={<Views.Login />} />
        <Route path={PATHS.SIGNUP.path} element={<Views.Signup />} />
        <Route path={PATHS.LOGOUT.path} element={<Views.Logout />} />
        <Route path={PATHS.NOT_FOUND.path} element={<Views.NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
