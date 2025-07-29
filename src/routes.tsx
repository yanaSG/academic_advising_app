import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import * as Views from "./views/containers";
import { PATHS } from "./constant";
import { AuthProvider } from "./contexts/authContext";
import { ClusteringProvider } from "./contexts/clustering";
import ProtectedRoute from "./views/components/ProtectedRoute";

export const AppRoutes = () => {
  return (
    <ClusteringProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Redirect root to admin main */}
            <Route path="/" element={<Navigate to={PATHS.ADMIN_MAIN.path} />} />

            {/* Protected Admin Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path={PATHS.ADMIN_MAIN.path} element={<Views.AdminMain />}>
                <Route
                  path={PATHS.ADMIN_VIEW.DASHBOARD.path}
                  element={<Views.Dashboard />}
                />
                <Route
                  path={PATHS.ADMIN_VIEW.STUDENT_MGNT.VIEW.path}
                  element={<Views.ViewStudent />}
                />
                <Route
                  path={PATHS.ADMIN_VIEW.STUDENT_MGNT.ADD.path}
                  element={<Views.AddStudent />}
                />
                <Route
                  path={PATHS.ADMIN_VIEW.ADVISOR_MGNT.VIEW.path}
                  element={<Views.ViewAdvisor />}
                />
                <Route
                  path={PATHS.ADMIN_VIEW.ADVISOR_MGNT.ADD.path}
                  element={<Views.AddAdvisor />}
                />
                <Route
                  path={PATHS.ADMIN_VIEW.ADVISOR_MGNT.EDIT.path}
                  element={<Views.EditAdvisor />}
                />
                <Route
                  path={PATHS.ADMIN_VIEW.CLUSTER_MGNT.VIEW.path}
                  element={<Views.ViewCluster />}
                />
                <Route
                  path={PATHS.ADMIN_VIEW.CLUSTER_MGNT.EDIT.path}
                  element={<Views.EditCluster />}
                />

                {/* User Management */}
                <Route
                  path={PATHS.USER_MGNT.VIEW.path}
                  element={<Views.ViewUsers />}
                />
              </Route>
            </Route>

            {/* Public Routes */}
            <Route path={PATHS.LOGIN.path} element={<Views.Login />} />
            <Route path={PATHS.SIGNUP.path} element={<Views.Signup />} />
            <Route path={PATHS.LOGOUT.path} element={<Views.Logout />} />
            <Route path={PATHS.NOT_FOUND.path} element={<Views.NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ClusteringProvider>
  );
};
