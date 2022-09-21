import { useEmpData } from "../../contexts";
import DropdownTreeSelect from "react-dropdown-tree-select";
import "react-dropdown-tree-select/dist/styles.css";
import "./EmployeeHierarchyPage.css";
import { useState } from "react";

const EmployeeHierarchyPage = () => {
  const { empData } = useEmpData();
  const rename = require("deep-rename-keys");
  const [inputs, setInputs] = useState({
    lowerInput: 0,
    upperInput: 0,
  });
  const [range, setRange] = useState({ lower: 0, upper: 0 });
  let myManager = {};

  // Create a Managers List
  for (let i = 0; i < empData.length; i += 1) {
    myManager[empData[i].id] = empData[i].manager_id;
  }

  // Convert Employees Data to a Hierarchical tree-type structure
  const listToTree = (list) => {
    let map = {},
      node,
      roots = [],
      i;

    for (i = 0; i < list.length; i += 1) {
      map[list[i].id] = i; // initialize the map
      list[i].children = []; // initialize the children
    }

    for (i = 0; i < list.length; i += 1) {
      node = list[i];

      if (node.manager_id !== "" && map.hasOwnProperty(node.manager_id)) {
        // if you have dangling branches check that map[node.manager_id] exists
        list[map[node.manager_id]].children.push(node);
      } else if (node.manager_id === "") {
        roots.push(node);
      } else {
        // if Manager doesn't exists then find a new Manager
        let newManager = node.manager_id;

        while (map.hasOwnProperty(newManager) === false) {
          newManager = myManager[newManager];
        }
        list[map[newManager]].children.push(node);
      }
    }
    return roots;
  };

  const filteredEmpData = empData.filter(
    (emp) =>
      parseFloat(emp.salary.replace(/,/g, "")) >= range.lower &&
      parseFloat(emp.salary.replace(/,/g, "")) <= range.upper
  );

  const data = listToTree(filteredEmpData);

  // Rename "first_name" key of all employees & its children (manager & employees under the manager) to "label" for <DropdownTreeSelect>
  const employeeTree = data.map((emp) =>
    rename(emp, function (key) {
      if (key === "first_name") return "label";
      return key;
    })
  );

  return (
    <div className="hierarchy-dropdown">
      <input
        onChange={(e) =>
          setInputs({ ...inputs, lowerInput: Number(e.target.value) })
        }
        placeholder="Lower Bound"
      />
      <input
        onChange={(e) =>
          setInputs({ ...inputs, upperInput: Number(e.target.value) })
        }
        placeholder="Upper Bound"
      />
      <button
        onClick={() =>
          setRange({
            lower: inputs.lowerInput,
            upper: inputs.upperInput,
          })
        }
        disabled={
          inputs.upperInput < 30000 || inputs.lowerInput > inputs.upperInput // Alex has a 30000 as the salary & if Alex is filtered then there's no hierarchy
        }
      >
        Filter
      </button>
      <DropdownTreeSelect data={employeeTree} />
    </div>
  );
};

export { EmployeeHierarchyPage };
