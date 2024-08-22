import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
// import { createOrder } from "../utils/api";
import OrderForm from "./OrderForm";
import ErrorAlert from "../layout/ErrorAlert";
import { ErrorType } from "../types/types";
import { useSelector } from "react-redux";

function OrderCreate() {
  // const history = useHistory();
  const [error, setError] = useState<ErrorType | null>(null);
  const cart = useSelector((state: any) => state.cart);

  const initialState = {
  deliverTo: "",
  mobileNumber: "",
  status: "pending",
  dishes: cart.dishes,
};

  // function submitHandler(order: Order) {
  //   setError(null);
  //   const abortController = new AbortController();

  //   createOrder(order, abortController.signal).then(onSubmit).catch(setError);

  //   return () => abortController.abort();
  // }
  
  // function onCancel() {
  //   history.goBack();
  // }

  return (
    <main>
      <h1>Create Order</h1>
      <ErrorAlert error={error} />
      <OrderForm initialState={initialState} setError={setError} />
        {/* <div className="col-auto">
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
        </div> */}
      {/* </OrderForm> */}
    </main>
  );
}

export default OrderCreate;
