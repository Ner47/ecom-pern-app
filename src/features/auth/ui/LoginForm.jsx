import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { selectAuthStatus, selectAuthError, login } from "@/features/auth";
import { TextField } from "@/shared/ui/TextField/TextField";
import { Button } from "@/shared/ui/Button/Button";
import { useState } from "react";

import "./LoginForm.css";

export function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const status = useSelector(selectAuthStatus);
  const error = useSelector(selectAuthError);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const isLoading = status === "loading";

  const from =
    location.state?.from?.pathname + (location.state?.from?.search || "") ||
    "/";

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const result = await dispatch(login(form));

    if (login.fulfilled.match(result)) {
      navigate(from, { replace: true });
    }
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h1>Login</h1>

      {error && <p className="login-form__error">{error}</p>}

      <TextField
        // label="Email"
        name="username"
        type="email"
        value={form.username}
        onChange={handleChange}
        placeholder="Email"
        required
      />

      <TextField
        // label="Password"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />

      <Button color="background" type="submit" disable={isLoading.toString()}>
        {isLoading ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}
