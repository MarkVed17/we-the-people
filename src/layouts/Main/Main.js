import { Route, Routes } from "react-router-dom";
import { EmployeeDetailsPage, EmployeeHierarchyPage, EmployeesListingPage } from "../../pages";

const Main = () => {
  return (
    <Routes>
      <Route path="/" element={<EmployeesListingPage />} />
      <Route path="/employee/:name" element={<EmployeeDetailsPage />} />
      <Route path="/overview" element={<EmployeeHierarchyPage />} />
    </Routes>
  );
};

export { Main };
