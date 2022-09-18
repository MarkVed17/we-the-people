import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useEmpData } from "../../contexts";
import "./EmployeesListingPage.css";

const EmployeesListingPage = () => {
  const { empData } = useEmpData();

  const rows = empData;
  const columns = [
    { field: "id", headerName: "ID", type: "string" },
    { field: "first_name", headerName: "First name", type: "string" },
    { field: "last_name", headerName: "Last name", type: "string" },
    {
      field: "date_of_birth",
      headerName: "D.O.B",
      type: "date",
    },
    {
      field: "address",
      headerName: "Address",
      type: "string",
    },
    {
      field: "date_of_joining",
      headerName: "D.O.J",
      type: "date",
    },
    {
      field: "salary",
      headerName: "Salary",
      type: "number",
      valueGetter: (params) =>
        `${parseFloat(params.row.salary.replace(/,/g, ""))}`,
    },
    {
      field: "designation",
      headerName: "Designation",
      type: "string",
      flex: 1,
    },
  ];

  const navigate = useNavigate();

  const cellClickHandler = (params) => {
    if (params.field === "id") {
      navigate(`/employee/${params.row.first_name}`);
    }
  };

  return (
    <div className="employees-table">
      <button onClick={() => navigate("/overview")} className="link">
        <span className="material-symbols-outlined">visibility</span>
        <span>View Employee Hierarchy</span>
      </button>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        checkboxSelection
        autoHeight={true}
        autoPageSize={true}
        onCellClick={cellClickHandler}
      />
    </div>
  );
};

export { EmployeesListingPage };
