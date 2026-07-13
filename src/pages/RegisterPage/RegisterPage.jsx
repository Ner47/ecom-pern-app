import { useDispatch } from "react-redux";
import "./RegisterPage.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { TextField } from "@/shared/ui/TextField/TextField";
import { Button } from "@/shared/ui/Button/Button";
import { register } from "@/features/auth";

export function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const result = await dispatch(register(form));

    if (register.fulfilled.match(result)) {
      navigate("/");
    }
  }

  return (
    <main className="register">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1>Register</h1>

        <TextField
          name="firstname"
          type="text"
          value={form.firstname}
          onChange={handleChange}
          placeholder="First name"
          required
        />

        <TextField
          name="lastname"
          type="text"
          value={form.lastname}
          onChange={handleChange}
          placeholder="Last name"
        />

        <TextField
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />

        <TextField
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />

        <div className="register-form__buttons">
          <Button color="background" variant="outline" type="submit">
            Register
          </Button>
          or
          <Link to="/register">
            <Button color="background" type="submit">
              Login
            </Button>
          </Link>
        </div>
      </form>
    </main>
  );
}
