import Dashboard from "@layouts/dashboard/Dashboard";

import { cookies } from "next/headers";

export default function DashboardPage() {
  const token = cookies().get("authToken")?.value;
  if (!token) {
    return <p>Unauthorized. Please log in.</p>;
  }
  return <Dashboard />;
}
