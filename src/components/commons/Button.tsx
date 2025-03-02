import { Button as MUIButton, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ComponentProps, ReactNode } from "react";

type ButtonProps = {
  isLoading?: boolean;
  text?: string;
  icon?: ReactNode;
} & ComponentProps<typeof MUIButton>;

const StyledButton = styled(MUIButton)(() => ({
  background: "#367AFF",
  color: "white",
  fontWeight: 600,
  fontSize: "14px",
  textTransform: "none",
  height: "40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  "&.Mui-disabled": {
    background: "#367AFF",
    color: "white",
    opacity: 0.9,
    height: "40px",
  },
}));

function Button({ isLoading, text, icon, ...props }: ButtonProps) {
  return (
    <StyledButton
      type="submit"
      variant="contained"
      fullWidth
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <CircularProgress size={24} color="inherit" />
      ) : (
        <>
          {icon}
          {text}
        </>
      )}
    </StyledButton>
  );
}

export default Button;
