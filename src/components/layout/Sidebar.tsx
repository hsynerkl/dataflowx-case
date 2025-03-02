import { styled, IconButton, List, ListItem, Box } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";
import { FC } from "react";
import { useThemeStore } from "@/store/useThemeStore";
import { useNavigate, useLocation } from "@tanstack/react-router";
import LogoIcon from "@/assets/icons/LogoIcon";
import Typography from "../commons/Typography";
import Button from "../commons/Button";
import { useAuthStore } from "@/store/useAuthStore";

const SidebarContainer = styled("aside")<{ open: boolean }>(({ open }) => ({
  width: "240px",
  backgroundColor: "#fff",
  boxShadow: "5px 5px 0 rgba(0,0,0,.06)",
  position: "fixed",
  height: "100vh",
  transition: "transform 0.3s ease-in-out",
  transform: open ? "translateX(0)" : "translateX(-240px)",
  padding: 8,
  userSelect: "none",
  display: "flex",
  flexDirection: "column",
  zIndex: 1000,
}));

const ToggleButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== "open",
})<{ open: boolean }>(({ open }) => ({
  position: "fixed",
  left: open ? "250px" : "10px",
  top: "50%",
  transform: "translateY(-50%)",
  transition: "left 0.3s ease-in-out",
  backgroundColor: "#fff",
  color: "#367AFF",
  boxShadow: "5px 5px 0 rgba(0,0,0,.06)",
  "&:hover": {
    backgroundColor: "#f0f0f0",
  },
  zIndex: 1001,
}));

const RotatingIcon = styled(ChevronLeft)<{ open: boolean }>(({ open }) => ({
  transform: `rotate(${open ? 180 : 0}deg)`,
  transition: "transform 0.3s ease-in-out",
}));

const MenuItem = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== "active",
})<{ active?: boolean }>(({ active }) => ({
  color: active ? "#367AFF" : "#000",
  cursor: "pointer",
  "&:hover": {
    color: "#367AFF",
    backgroundColor: "#367AFF1A",
  },
  backgroundColor: active ? "#367AFF1A" : "transparent",
  borderRadius: 6,
  fontWeight: 400,
  fontSize: 14,
  marginBottom: 4,
}));

const menuItems = [
  { name: "home", path: "/dashboard" },
  { name: "react-flow", path: "/dashboard/react-flow" },
  { name: "data-grid one", path: "/dashboard/data-grid-one" },
  { name: "data-grid two", path: "/dashboard/data-grid-two" },
];

const Sidebar: FC = () => {
  const { isSidebarOpen, toggleSidebar } = useThemeStore();
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = () => {
    navigate({ to: "/dashboard" });
  };

  return (
    <>
      <SidebarContainer open={isSidebarOpen}>
        <Box
          display="flex"
          alignItems="center"
          sx={{ cursor: "pointer" }}
          gap={1.5}
          mb={4}
          onClick={handleLogoClick}
        >
          <LogoIcon />
          <Typography
            variant="h6"
            fontSize={24}
            fontWeight={600}
            text="Revolutie"
          />
        </Box>

        <List disablePadding>
          {menuItems.map((item) => (
            <MenuItem
              key={item.path}
              active={location.pathname === item.path ? true : undefined}
              onClick={() => navigate({ to: item.path })}
            >
              {item.name}
            </MenuItem>
          ))}
        </List>

        <Box sx={{ mt: "auto" }}>
          <Button
            onClick={() => {
              logout();
              navigate({ to: "/login" });
            }}
            text="Çıkış Yap"
          />
        </Box>
      </SidebarContainer>

      <ToggleButton open={isSidebarOpen} onClick={toggleSidebar}>
        <RotatingIcon open={isSidebarOpen} />
      </ToggleButton>
    </>
  );
};

export default Sidebar;
