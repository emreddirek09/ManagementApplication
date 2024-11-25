import {
    createBrowserRouter,
} from "react-router-dom";
import HomePage from "../pages/HomePage";
import Register from "../pages/Register";
import Login from "../pages/Login";
import AdminComponent from "../Components/AdminComponent";
import AdminAllCaseComponent from "../Components/AdminAllCaseComponent"; 
import AdminLayout from "../Layout/AdminLayout";  
import UserLayout from "../Layout/UserLayout";  
import UserCaseComponent from "../Components/UserCaseComponent";
import UserListComponent from "../Components/UserListComponent";
 





export const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/Register",
        element: <Register />
    },
    {
        path: "/",
        element: <AdminLayout />,
        children: [
            {
                path: "/AdminComponent",
                element: <AdminComponent />
            },
            {
                path: "/AdminAllCaseComponent",
                element: <AdminAllCaseComponent />
            }
        ]
    },
    {
        path: "/",
        element: <UserLayout />,
        children: [
            {
                path: "/UserCaseComponent",
                element: <UserCaseComponent />
            },
            {
                path: "/UserListComponent",
                element: <UserListComponent />
            } 
        ]
    }
]);

