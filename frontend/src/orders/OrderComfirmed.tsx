import React, { useEffect, useState } from "react";
import { readOrder } from "../utils/api";
import { useParams } from "react-router-dom";
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
  const { orderId } = useParams<RouteParams>();

  const [order, setOrder] = useState<Order | null>({...initialState});
  const [error, setError] = useState<Error | null>(null);

  useEffect(loadOrder, [orderId]);

  function loadOrder() {
    const abortController = new AbortController();
    readOrder(orderId, abortController.signal).then(setOrder).catch(setError);

    return () => abortController.abort();
  }



  const child = order ? (
    <OrderForm order={order} readOnly={true} showStatus={true} />
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
