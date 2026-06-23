import "./Button.css";

export function Button({
  children,
  type = "button",
  variant = "solid",
  color = "accent",
  disabled = false,
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`button button--${variant} button--${color} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
