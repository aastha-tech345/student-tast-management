export const studentData = [
  {
    id: 1,
    name: "John Doe",
    age: 30,
    email: "john@example.com",
    status: "active",
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 25,
    email: "jane@example.com",
    status: "inactive",
  },
  {
    id: 3,
    name: "Bob Johnson",
    age: 40,
    email: "bob@example.com",
    status: "active",
  },
  {
    id: 4,
    name: "Bob Johnson",
    age: 40,
    email: "bob@example.com",
    status: "inactive",
  },
];

export const columns = [
  { id: "name", label: "Name", minWidth: 200 },
  { id: "age", label: "Age", minWidth: 200, align: "center" },
  {
    id: "email",
    label: "Email",
    minWidth: 200,
    renderCell: (row) => <a href={`mailto:${row.email}`}>{row.email}</a>,
  },
  { id: "status", label: "Status",  minWidth: 200, align: "center" },
  { id: "action", label: "Action", align: "center" },
];
