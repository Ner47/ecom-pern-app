import { TextField } from "@/shared/ui/TextField/TextField";
import { Button } from "@/shared/ui/Button/Button";
import { createOrder } from "@/features/orders";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./CheckoutForm.css";

export function CheckoutForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullname: "",
    address: "",
    city: "",
    phone: "",
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

    const result = await dispatch(
      createOrder({
        paymentInfo: form,
      }),
    );

    console.log(result);

    if (createOrder.fulfilled.match(result)) {
      const order = result.payload;
      navigate(`/orders/${order.id}`);
    }
  }

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <h1>Checkout</h1>
      <TextField
        name="fullname"
        value={form.fullname}
        onChange={handleChange}
        placeholder="Full Name"
        required
      />

      <TextField
        name="address"
        value={form.address}
        onChange={handleChange}
        placeholder="Address"
        required
      />

      <TextField
        name="city"
        value={form.city}
        onChange={handleChange}
        placeholder="City"
        required
      />

      <TextField
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="Phone"
        required
      />

      <Button type="submit" color="background">
        Place Order
      </Button>
    </form>
  );
}
