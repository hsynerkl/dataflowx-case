import {
  TextField,
  TextFieldProps,
  Box,
  InputAdornment,
  IconButton,
  FormHelperText,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { ReactNode } from "react";

type CustomSlotProps = {
  input?: {
    startAdornment?: ReactNode;
    endAdornment?: ReactNode;
  };
};

type CustomTextFieldProps = Omit<TextFieldProps, "InputProps"> & {
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  onIconRightClick?: () => void;
  slotProps?: CustomSlotProps;
};

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

function TextInput({
  iconLeft,
  iconRight,
  onIconRightClick,
  slotProps,
  helperText,
  error,
  ...props
}: CustomTextFieldProps) {
  const mergedSlotProps: CustomSlotProps = {
    ...slotProps,
    input: {
      ...slotProps?.input,
      startAdornment: iconLeft ? (
        <InputAdornment position="start" sx={{ m: 0, p: 0 }}>
          <Box display="flex" alignItems="center" sx={{ m: 0, p: 0 }}>
            {iconLeft}
          </Box>
        </InputAdornment>
      ) : (
        slotProps?.input?.startAdornment
      ),
      endAdornment: iconRight ? (
        <InputAdornment position="end" sx={{ m: 0, p: 0 }}>
          <IconButton onClick={onIconRightClick} sx={{ m: 0, p: 0 }}>
            {iconRight}
          </IconButton>
        </InputAdornment>
      ) : (
        slotProps?.input?.endAdornment
      ),
    },
  };

  return (
    <Box position="relative">
      <StyledTextField
        fullWidth
        size="small"
        slotProps={mergedSlotProps}
        error={error}
        {...props}
      />
      {error && <FormHelperText error>{helperText}</FormHelperText>}
    </Box>
  );
}

export default TextInput;
