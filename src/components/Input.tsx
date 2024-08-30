import { BaseTextFieldProps, TextField } from "@mui/material";

export interface InputProps extends BaseTextFieldProps {
  errorText?: string;
}
export default function Input(props: InputProps) {
  const { errorText } = props;

  return (
    <TextField
      {...props}
      error={!!errorText}
      helperText={errorText}
      size="small"
    />
  );
}
