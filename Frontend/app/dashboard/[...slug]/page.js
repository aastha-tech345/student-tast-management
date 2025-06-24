import Profile from "@layouts/dashboard/Profile";
import Reports from "@layouts/dashboard/Reports";
import Settings from "@layouts/dashboard/Settings";
import { notFound } from "next/navigation";


const pageComponents = {
  profile: Profile,
  settings: Settings,
  reports: Reports,
};

export default function DashboardPage({ params }) {
  const { slug } = params;
  const [page] = slug || [""]; // Default to empty if no slug

  const Component = pageComponents[page.toLowerCase()] || notFound;

  return <Component />;
}