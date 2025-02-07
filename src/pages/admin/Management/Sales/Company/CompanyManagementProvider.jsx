import { createContext } from "react";

export const CompanyManagementContext = createContext();

const CompanyManagementProvider = ({ refreshCompanyList, onDeletedCompany, children }) => {
  return (
    <CompanyManagementContext.Provider value={{ refreshCompanyList, onDeletedCompany }}>
      {children}
    </CompanyManagementContext.Provider>
  );
};

export default CompanyManagementProvider;
