import { NavLink, Outlet, useLocation } from "react-router-dom";

// 회원관리(1depth)
const MemberLayout = () => {
  const location = useLocation();

  const onRefresh = (path) => {
    if (path === location.pathname) {
      window.location.reload();
    }
  };
  return (
    <>
      <nav className="ui-lnb-wrap">
        <div className="ui-lnb-inner">
          <NavLink
            className="link"
            to="/admin/members/member"
            onClick={() => onRefresh("/admin/members/member")}
          >
            회원관리
          </NavLink>
          <NavLink
            className="link"
            to="/admin/members/consult"
            onClick={() => onRefresh("/admin/members/consult")}
          >
            미회원관리
          </NavLink>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default MemberLayout;
