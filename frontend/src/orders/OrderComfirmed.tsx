import React from "react";
import { useParams } from "react-router-dom";
// import ErrorAlert from "../layout/ErrorAlert";
import OrderForm from "./OrderForm";
import { RouteParams} from "../types/types";
import { useReadOrderQuery } from "../utils/api";




function OrderConfirmed() {
  const { orderId } = useParams<RouteParams>();
  const { data: readOrder } = useReadOrderQuery(orderId);

  return (
    <main>
      <h1>Order Confirmed</h1>
      {
        // error ? <ErrorAlert error={error} /> : null
      }

      {
        readOrder ? (
          <OrderForm initialState={readOrder} readOnly={true} showStatus={true} />
        ) : (
          <p>Loading...</p>
        )
      }
    </main>
  );
}

export default OrderConfirmed;
