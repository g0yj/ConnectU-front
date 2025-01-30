import { Navigate } from "react-router-dom";

const RootPage = () => {

  return <Navigate to="/login" replace={true} />;
};

export default RootPage;
