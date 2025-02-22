import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/admin/Login/LoginPage";
import RootPage from "./pages/RootPage";
import TopLayout from "./pages/admin/Management/TopLayout";
import MemberLayout from "./pages/admin/Management/Members/MemberLayout";
import MemberManagementPage from "./pages/admin/Management/Members/MemberManagementPage";
import { WINDOWS } from "./app/helper/helper-window";
import SendEmailModal from "./pages/admin/Modal/SendEmailModal";
import SendSmsModal from "./pages/admin/Modal/SendSmsModal";
import SalesLayout from "./pages/admin/Management/Sales/SalesLayout";
import CompanyManagementPage from "./pages/admin/Management/Sales/Company/CompanyManagementPage";

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
            },
            {
                path: "sales",
                element: <SalesLayout />,
                children: [
                    {
                        path: "companys",
                        element: <CompanyManagementPage />
                    }
                ]
            }
        ]
    },
    {
        path: WINDOWS.SEND_EMAIL.url,
        element: <SendEmailModal/>,
    },
    {
        path: WINDOWS.SEND_SMS.url,
        element: <SendSmsModal />,
  },

])

export default router;