import { Route, Routes } from "react-router-dom";
import { EmployeeDetailsPage, EmployeesListingPage } from "../../pages";

const Main = () => {
  return (
    <Routes>
      <Route path="/" element={<EmployeesListingPage />} />
      <Route path="/employee/:name" element={<EmployeeDetailsPage />} />
    </Routes>
  );
};

export { Main };
