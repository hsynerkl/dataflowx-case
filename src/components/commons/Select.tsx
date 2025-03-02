import {
  TextField,
  MenuItem,
  TextFieldProps,
  FormHelperText,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledTextField = styled(TextField)(() => ({
  "& .MuiFormLabel-root": {
    fontSize: "13px",
    transition:
      "color 0.2s ease-out, transform 0.2s ease-out, font-size 0.2s ease-out",
    color: "#969696",
  },
  "& label.Mui-focused": {
    color: "#367AFF",
    transform: "translate(13px, -10px) scale(1)",
    fontSize: "13px",
  },
  "& .MuiFormLabel-root.MuiInputLabel-shrink": {
    fontSize: "13px",
    transform: "translate(13px, -10px) scale(1)",
    transition:
      "color 0.2s ease-out, transform 0.2s ease-out, font-size 0.2s ease-out",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#367AFF",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "4px",
    color: "#969696",
    "& fieldset": {
      borderColor: "#969696",
    },
    "&:hover fieldset": {
      borderColor: "#367AFF",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#367AFF",
    },
  },
  "& input": {
    fontSize: "13px",
    padding: "12px 11px",
    color: "#969696",
  },
  "& input::placeholder": {
    color: "#969696 !important",
    opacity: "1 !important",
  },
  "& input:-webkit-autofill": {
    backgroundColor: "transparent !important",
    WebkitBoxShadow: "0 0 0 1000px white inset !important",
    WebkitTextFillColor: "#969696 !important",
  },
  "& .MuiInputBase-input.Mui-error": {
    color: "#969696 !important",
  },
  "& .MuiFormLabel-root.Mui-error": {
    color: "#969696 !important",
  },
  "& .MuiOutlinedInput-root.Mui-error fieldset": {
    borderColor: "#367AFF",
  },
}));

type CustomSelectOption = {
  value: string;
  label: string;
};

type CustomSelectProps = Omit<TextFieldProps, "select"> & {
  options: CustomSelectOption[];
};

const Select: React.FC<CustomSelectProps> = ({
  options,
  helperText,
  error,
  ...props
}) => {
  return (
    <Box position="relative">
      <StyledTextField fullWidth size="small" select error={error} {...props}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </StyledTextField>
      {error && helperText && (
        <FormHelperText error>{helperText}</FormHelperText>
      )}
    </Box>
  );
};

export default Select;
