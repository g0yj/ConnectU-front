import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/admin/Login/LoginPage";
import RootPage from "./pages/RootPage";
import TopLayout from "./pages/admin/Management/TopLayout";
import MemberLayout from "./pages/admin/Management/Members/MemberLayout";
import MemberManagementPage from "./pages/admin/Management/Members/MemberManagementPage";
import { WINDOWS } from "./app/helper/helper-window";
import SendEmailModal from "./pages/admin/Modal/SendEmailModal";

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
    },
    {
        path: WINDOWS.SEND_EMAIL.url,
        element: <SendEmailModal/>,
    },

])

export default router;