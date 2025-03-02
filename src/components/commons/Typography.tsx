import {
  Typography as MUITypography,
  TypographyProps as MUITypographyProps,
} from "@mui/material";

type TypographyProps = MUITypographyProps & {
  text: string;
};

function Typography({ text, ...props }: TypographyProps) {
  return <MUITypography {...props}>{text}</MUITypography>;
}

export default Typography;
