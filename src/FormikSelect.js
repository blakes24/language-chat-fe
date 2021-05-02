import { Field } from "formik";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";

function MaterialSelect({
  label,
  children,
  value,
  name,
  onChange,
  onBlur,
  required,
  className,
  helperText,
}) {
  return (
    <FormControl fullWidth variant="outlined" className={className}>
      <TextField
        select
        style={{ margin: 8 }}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        label={label}
        variant="outlined"
        size="small"
        helperText={helperText}
        required={required}
      >
        {children}
      </TextField>
    </FormControl>
  );
}

function FormikSelect({ name, items, label, instruction, required = false }) {
  return (
    <Field name={name} as={MaterialSelect} label={label} required={required}>
      <MenuItem value="" disabled>
        <em>{instruction || "None"}</em>
      </MenuItem>
      {items.map((item) => (
        <MenuItem key={item.value} value={item.value}>
          {item.label}
        </MenuItem>
      ))}
    </Field>
  );
}

export default FormikSelect;
