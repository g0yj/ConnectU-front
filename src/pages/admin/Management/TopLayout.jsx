import storage from "@/app/local/admin/local-storage";
import ServiceAuth from "@/app/service/admin/service-auth";
import Buttons from "@/components/Buttons";
import { clear } from "@/redux/login-user-store";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

const TopLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const loginUser = useSelector((state) => state.loginUser);
  const dispatch = useDispatch();

  if (location.pathname === "/admin") {
    return <Navigate to="/admin/members/member" replace={true} />;
  } else if (location.pathname === "/admin/members") {
    return <Navigate to="/admin/members/member" replace={true} />;
  } else if (location.pathname === "/admin/employees") {
    return <Navigate to="/admin/mentors/employee" replace={true} />;
  } else if (location.pathname === "/admin/sales/company") {
    return <Navigate to="/admin/sales/company" replace={true} />;
  } else if (location.pathname === "/admin/boards") {
    return <Navigate to="/admin/boards/board" replace={true} />;
  } 
  const onClickLogout = async () => {
  try {
    await ServiceAuth.logout(); 
    dispatch(clear()); 
    storage.loginedId.set("");
    storage.loginedToken.set("");
    navigate("/login");
  } catch (error) {
    console.log("로그아웃 실패. 다시 시도해주세요."); 
  }
};

  if (loginUser)
    return (
      <div className="layout-contents-wrap">
        <header className="ui-header-wrap">
          <div>
            <NavLink className="ui-logo small">
              <div className="title"> Connect YOU</div>
            </NavLink>
            <nav className="ui-gnb-wrap">
              <NavLink
                className={(navData) =>
                  navData.isActive ? "ui-link primary active" : "ui-link primary"
                }
                to="/admin/members"
              >
                회원관리
              </NavLink>
              <NavLink className="ui-link primary" to="/admin/employees">
                직원관리
              </NavLink>
              <NavLink
                className={(navData) =>
                  navData.isActive ? "ui-link primary active" : "ui-link primary"
                }
                to="/admin/sales/companys"
              >
                매출관리
              </NavLink>
               <NavLink className="ui-link primary" to="/admin/boards">
                게시물관리
              </NavLink>
            </nav>
          </div>

          <div className="ui-status-wrap">
            <Buttons className="grey small" onClick={onClickLogout}>
              LogOut
            </Buttons>
          </div>
        </header>
        <main className="page-main-wrap">
          <Outlet />
        </main>
      </div>
    );
};

export default TopLayout;
