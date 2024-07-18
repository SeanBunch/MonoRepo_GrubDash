import React, { useEffect, useState } from "react";
import { readOrder } from "../utils/api";
import { useHistory, useParams } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import OrderForm from "./OrderForm";
import { RouteParams, Order } from "../types/types";


const initialState = {
    id: 0,
    deliverTo: "",
    mobileNumber: "",
    status: "",
    dishes: [],
  };


function OrderConfirmed() {
  const history = useHistory();
  const { orderId } = useParams<RouteParams>();

  const [order, setOrder] = useState<Order | null>({...initialState});
  const [error, setError] = useState<Error | null>(null);

  useEffect(loadOrder, [orderId]);

  function loadOrder() {
    const abortController = new AbortController();
    const id = parseInt(orderId, 10);

    readOrder(id, abortController.signal).then(setOrder).catch(setError);

    return () => abortController.abort();
  }

  function cancelHandler() {
    history.push("/");
  }

  const child = order ? (
    <OrderForm order={order} readOnly={true} showStatus={true}>
      <div className="col-auto">
        <button
          type="button"
          className="btn btn-secondary mr-2"
          onClick={cancelHandler}
        >
          <span className="oi oi-home" /> Home
        </button>
      </div>
    </OrderForm>
  ) : (
    <p>Loading...</p>
  );

  return (
    <main>
      <h1>Order Confirmed</h1>
      <ErrorAlert error={error} />
      {child}
    </main>
  );
}

export default OrderConfirmed;
