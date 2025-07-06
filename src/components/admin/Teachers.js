import DataTable from "./DataTables";
import { useState } from "react";

const Teachers = () => {
  const [teachers] = useState([]);

  // Assume fetchTeachers() fills the state
  const columns = [
    { label: "Name", accessor: "name" },
    { label: "Email", accessor: "email" },
    {
      label: "Actions",
      accessor: "actions",
      render: (teacher) => (
        <div>
          <button className="text-blue-500">Edit</button>
          <button className="ml-4 text-red-500">Delete</button>
        </div>
      ),
    },
  ];

  return <DataTable data={teachers} columns={columns} filterKey="name" />;
};
export default Teachers;
