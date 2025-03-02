import { styled } from "@mui/material";
import { useThemeStore } from "@/store/useThemeStore";
import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  title: string;
}

const StyledContainer = styled("div")<{ isSidebarOpen: boolean }>(
  ({ isSidebarOpen, theme }) => ({
    position: "fixed",
    padding: theme.spacing(2),
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#F7F9FB",
    transition: "left 0.3s ease-in-out",
    overflowX: "hidden",
    overflowY: "scroll",
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    [theme.breakpoints.up("lg")]: {
      left: isSidebarOpen ? 240 : 0,
    },
  })
);

const Title = styled("h2")(() => ({
  fontSize: 24,
  fontWeight: "600",
  marginBottom: 16,
}));

const Container = ({ children, title }: ContainerProps) => {
  const { isSidebarOpen } = useThemeStore();
  return (
    <StyledContainer isSidebarOpen={isSidebarOpen}>
      <Title>{title}</Title>
      {children}
    </StyledContainer>
  );
};

export default Container;
