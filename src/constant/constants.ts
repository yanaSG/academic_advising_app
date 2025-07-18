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
        STUDENT_MGNT: {
            VIEW: {
                path: "students/view",
                label: "View Students"
            },
            ADD: {
                path: "students/add",
                label: "Add Students"
            }
        },
        ADVISOR_MGNT: {
            VIEW: {
                path: "advisors/view",
                label: "View Advisors"
            },
            ADD: {
                path: "advisors/add",
                label: "Add Advisors"
            }
        },
        CLUSTER_MGNT: {
            VIEW: {
                path: "clusters/view",
                label: "View Clusters"
            },
            ADD: {
                path: "cluster/add",
                label: "Add Cluster"
            }
        },
    },
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