import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/admin/Login/LoginPage";
import RootPage from "./pages/RootPage";
import TopLayout from "./pages/admin/Management/TopLayout";
import MemberLayout from "./pages/admin/Management/Members/MemberLayout";
import MemberManagementPage from "./pages/admin/Management/Members/MemberTab/MemberManagementPage";

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
        element: <TopLayout />,
        children: [
            {
                path: "members",
                element: <MemberLayout />,
                children: [
                    {
                        path: "member",
                        element: <MemberManagementPage/>
                    }
                ]
            }
        ]
    }
])

export default router;