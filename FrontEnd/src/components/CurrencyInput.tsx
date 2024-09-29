import { TextField, Typography } from "@mui/material";
import { forwardRef } from "react";
import { UseFormRegister } from "react-hook-form";

type FormValues = {
  email: string;
  name: string;
  price: number;
  information: string;
};

const Input = forwardRef<
  HTMLInputElement,
  { label: string; error?: string } & ReturnType<UseFormRegister<FormValues>>
>(({ onChange, onBlur, name, label, error }, ref) => (
  <>
    <TextField
      name={name}
      ref={ref}
      onChange={onChange}
      onBlur={onBlur}
      label={label}
      variant="outlined"
      fullWidth
      margin="normal"
    />
    <Typography variant="caption" color="error">
      {error}
    </Typography>
  </>
));

export default Input;
