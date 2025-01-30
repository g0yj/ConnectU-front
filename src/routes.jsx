import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/admin/Login/LoginPage";
import RootPage from "./pages/RootPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootPage />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/admin",
        element
    }
])

export default router;