import { useId } from "react";
import "./TextField.css";

export function TextField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  helperText,
  disabled = false,
  variant = "outline",
  size = "md",
  fullWidth = false,
  multiline = false,
  rows = 4,
  startIcon,
  endIcon,
  className = "",
  ...props
}) {
  const generatedId = useId();
  const id = props.id || generatedId;
  const errorId = `${id}-error`;
  const helperId = `${id}-helper`;

  const FieldTag = multiline ? "textarea" : "input";

  return (
    <div
      className={`
        text-field
        text-field--${variant}
        text-field--${size}
        ${fullWidth ? "text-field--full" : ""}
        ${error ? "text-field--error" : ""}
        ${disabled ? "text-field--disabled" : ""}
        ${className}
      `}
    >
      <label className="text-field__box" htmlFor={id}>
        {label && <span className="text-field__label">{label}</span>}

        <div className="text-field__control">
          {startIcon && (
            <span className="text-field__icon text-field__icon--start">
              {startIcon}
            </span>
          )}

          <FieldTag
            id={id}
            className="text-field__input"
            name={name}
            type={multiline ? undefined : type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            rows={multiline ? rows : undefined}
            aria-invalid={Boolean(error)}
            aria-describedby={
              error ? errorId : helperText ? helperId : undefined
            }
            {...props}
          />

          {endIcon && (
            <span className="text-field__icon text-field__icon--end">
              {endIcon}
            </span>
          )}
        </div>
      </label>

      {error && (
        <span
          id={errorId}
          className="text-field__message text-field__message--error"
        >
          {error}
        </span>
      )}

      {!error && helperText && (
        <span id={helperId} className="text-field__message">
          {helperText}
        </span>
      )}
    </div>
  );
}
