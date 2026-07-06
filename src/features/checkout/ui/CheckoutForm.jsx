import { TextField } from "@/shared/ui/TextField/TextField";
import { Button } from "@/shared/ui/Button/Button";
import { createOrder } from "@/features/orders";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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

    if (createOrder.fulfilled.match(result)) {
      const order = result.payload;
      navigate(`/orders/${order.id}`);
    }
  }

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <h1>Checkout</h1>

      <TextField
        label="Full Name"
        name="fullname"
        value={form.fullname}
        onChange={handleChange}
        required
      />

      <TextField
        label="Address"
        name="address"
        value={form.address}
        onChange={handleChange}
        required
      />

      <TextField
        label="City"
        name="city"
        value={form.city}
        onChange={handleChange}
        required
      />

      <TextField
        label="Phone"
        name="phone"
        value={form.phone}
        onChange={handleChange}
        required
      />

      <Button type="submit">Place Order</Button>
    </form>
  );
}
