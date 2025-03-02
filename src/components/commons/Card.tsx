import { Card as MuiCard, CardProps, CardContent } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledCard = styled(MuiCard)(() => ({
  padding: "8px",
  boxShadow: "5px 5px 0 rgba(0,0,0,.06)",
  backgroundColor: "#16121B",
}));

type CustomCardProps = CardProps;

function Card({ children, ...props }: CustomCardProps) {
  return (
    <StyledCard {...props}>
      <CardContent>{children}</CardContent>
    </StyledCard>
  );
}

export default Card;
