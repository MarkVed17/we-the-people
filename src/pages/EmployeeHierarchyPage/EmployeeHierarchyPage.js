import { useEmpData } from "../../contexts";
import DropdownTreeSelect from "react-dropdown-tree-select";
import "react-dropdown-tree-select/dist/styles.css";
import "./EmployeeHierarchyPage.css";

const EmployeeHierarchyPage = () => {
  const { empData } = useEmpData();
  const rename = require("deep-rename-keys");

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
      if (node.manager_id !== "") {
        // if you have dangling branches check that map[node.manager_id] exists
        list[map[node.manager_id]].children.push(node);
      } else {
        roots.push(node);
      }
    }
    return roots;
  };

  const data = listToTree(empData);

  // Rename "first_name" key of all employees & its children (manager & employees under the manager) to "label" for <DropdownTreeSelect>
  const employeeTree = data.map((emp) =>
    rename(emp, function (key) {
      if (key === "first_name") return "label";
      return key;
    })
  );

  return (
    <div className="hierarchy-dropdown">
      <DropdownTreeSelect data={employeeTree} />
    </div>
  );
};

export { EmployeeHierarchyPage };
