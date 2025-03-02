import { ReactNode, useEffect } from "react";
import Sidebar from "./Sidebar";
import { styled } from "@mui/material";
import { useAuthStore } from "@/store/useAuthStore";
import { useNavigate } from "@tanstack/react-router";

const LayoutContainer = styled("div")({
  flexDirection: "row",
  display: "flex",
});

const LayoutComponent = ({ children }: { children: ReactNode }) => {
  const { startLogoutTimer, user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      startLogoutTimer(navigate);
    }
  }, [user]);

  return (
    <LayoutContainer>
      <Sidebar />
      {children}
    </LayoutContainer>
  );
};

export default LayoutComponent;
