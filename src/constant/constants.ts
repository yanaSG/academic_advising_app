// ROUTER PATH
export const PATHS = {
    // URLs for admin pages always start with "/admin"
    ADMIN_MAIN: {
        path: "/admin",
        label: "Admin Main"
    },
    LOGIN: {
        path: "/login",
        label: "Login"
    },
    SIGNUP: {
        path: "/signup",
        label: "Sign Up"
    },
    FORGOT_PASS: {
        path: "/forgot-password",
        label: "Forgot Password"
    },
    RESET_PASS: {
        path: "/reset-password",
        label: "Reset Password"
    },
    LOGOUT: {
        path: "/logout",
        label: "Logout"
    },
    NOT_FOUND: {
        path: "*",
        label: "Not Found"
    },
    USER_MGNT: {
        VIEW: {
            path: "users/view",
            label: "View Users"
        },
    },
    ADMIN_VIEW: {
        DASHBOARD: {
            path: "dashboard",
            label: "Dashboard"
        },
        NOTIFICATION: {
            path: "notifications",
            label: "Notifications"
        },
    },
    // Add more routes here
};

export const ADMIN_MENU = [
    {
        path: "/dashboard",
        label: "Dashboard"
    },
    {
        path: "/users/view",
        label: "View Users"
    },
];