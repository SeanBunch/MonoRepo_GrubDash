import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createOrder } from "../utils/api";
import OrderForm from "./OrderForm";
import ErrorAlert from "../layout/ErrorAlert";
import { OrderCreateProps, Order, ErrorType } from "../types/types";

function OrderCreate({ order, setOrder, onSubmit }: OrderCreateProps) {
  const history = useHistory();
  const [error, setError] = useState<ErrorType | null>(null);

  function submitHandler(order: Order) {
    setError(null);
    const abortController = new AbortController();

    createOrder(order, abortController.signal).then(onSubmit).catch(setError);

    return () => abortController.abort();
  }

  function onCancel() {
    history.goBack();
  }

  return (
    <main>
      <h1>Create Order</h1>
      <ErrorAlert error={error} />
      <OrderForm order={order} setOrder={setOrder} onSubmit={submitHandler}>
        <div className="col-auto">
          <button
            type="button"
            className="btn btn-secondary mr-2"
            onClick={onCancel}
          >
            <span className="oi oi-x" /> Cancel
          </button>
        </div>
        <div className="col-auto">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={order.dishes.length === 0}
          >
            <span className="oi oi-check" /> Submit
          </button>
        </div>
      </OrderForm>
    </main>
  );
}

export default OrderCreate;
