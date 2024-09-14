import { TextField, TextFieldProps } from "@mui/material";

export interface InputProps extends TextFieldProps<"filled"> {
  errorText?: string;
}
export default function Input(props: Partial<InputProps>) {
  const { errorText } = props;

  return (
    <TextField
      {...props}
      error={!!errorText}
      helperText={errorText}
      size="small"
      sx={{ width: "100%", ...props.sx }}
      onChange={props.onChange}
    />
  );
}
