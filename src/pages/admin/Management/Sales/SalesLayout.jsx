import { NavLink, Outlet, useLocation } from "react-router-dom";

// 매출관리(1depth)
const SalesLayout = () => {
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
            to="/admin/sales/companys"
            onClick={() => onRefresh("/admin/sales/companys")}
          >
            업체관리
          </NavLink>
          <NavLink
            className="link"
            to="/admin/members/statistics"
            onClick={() => onRefresh("/admin/sales/statistics")}
          >
            매출통계
          </NavLink>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default SalesLayout;
