import LayoutComponent from "@/components/layout";
import { Outlet } from "@tanstack/react-router";

export default function DashboardLayout() {
  return (
    <LayoutComponent>
      <Outlet />
    </LayoutComponent>
  );
}
