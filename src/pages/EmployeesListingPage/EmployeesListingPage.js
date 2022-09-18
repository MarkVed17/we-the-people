import { DataGrid } from "@mui/x-data-grid";
import { useEmpData } from "../../contexts";

const EmployeesListingPage = () => {
  const { empData } = useEmpData();

  const rows = empData;
  const columns = [
    { field: "id", headerName: "ID", type: "text" },
    { field: "first_name", headerName: "First name", type: "text" },
    { field: "last_name", headerName: "Last name", type: "text" },
    {
      field: "date_of_birth",
      headerName: "D.O.B",
      type: "date",
    },
    {
      field: "address",
      headerName: "Address",
      type: "text",
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
      type: "text",
    },
  ];

  return (
    <div
      style={{
        width: "56%",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        // rowsPerPageOptions={[5]}
        checkboxSelection
        autoHeight="true"
        autoPageSize="true"
        // loading={empData ? "false" : "true"}
      />
    </div>
  );
};

export { EmployeesListingPage };
