import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./EmployeeDetailsPage.css";

const EmployeeDetailsPage = () => {
  const [empDetails, setEmpDetails] = useState([]);
  const { name } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `https://opensheet.elk.sh/1gH5Kle-styszcHF2G0H8l1w1nDt1RhO9NHNCpHhKK0M/${name.toLowerCase()}`
        );
        const data = await response.json();
        setEmpDetails(data);
      } catch (err) {
        console.error(err.message);
      }
    })();
  }, [name]);

  const rows = empDetails;
  const columns = [
    {
      id: "first_name",
      field: "first_name",
      headerName: "First name",
      type: "string",
    },
    {
      id: "last_name",
      field: "last_name",
      headerName: "Last name",
      type: "string",
    },
    {
      id: "date_of_birth",
      field: "date_of_birth",
      headerName: "D.O.B",
      type: "date",
    },
    {
      id: "address",
      field: "address",
      headerName: "Address",
      type: "string",
    },
    {
      id: "date_of_joining",
      field: "date_of_joining",
      headerName: "D.O.J",
      type: "date",
    },
    {
      id: "salary",
      field: "salary",
      headerName: "Salary",
      type: "number",
      valueGetter: (params) =>
        `${parseFloat(params.row.salary.replace(/,/g, ""))}`,
    },
    {
      id: "designation",
      field: "designation",
      headerName: "Designation",
      type: "string",
      flex: 1,
    },
  ];

  return (
    <div className="employee-details-table">
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={1}
        autoHeight={true}
        autoPageSize={true}
        getRowId={(row) => row.first_name}
        hideFooter
      />
    </div>
  );
};

export { EmployeeDetailsPage };
