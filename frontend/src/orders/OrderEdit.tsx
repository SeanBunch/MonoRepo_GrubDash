import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { deleteOrder } from "../utils/api";
import OrderForm from "./OrderForm";
import ErrorAlert from "../layout/ErrorAlert";
import { RouteParams, ErrorType } from "../types/types";
import { useReadOrderQuery } from "../utils/api";

function OrderEdit() {
  const history = useHistory();
  const { orderId } = useParams<RouteParams>();
  // const initialState: Order = {
  //     id: order.id,
  //     deliverTo: order.deliverTo,
  //     mobileNumber: order.mobileNumber,
  //     status: order.status,
  //     dishes: order.dishes,
  // };
  
  // const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<ErrorType | null>(null);
  const { data: ordersData } = useReadOrderQuery(orderId);


  // useEffect(() => {
  //   const abortController = new AbortController();
    
  //   readOrder(orderId, abortController.signal)
  //   .then((order) => setOrder(order))
  //   .catch(setError);
    
  //   return () => abortController.abort();
  // }, [orderId]);
  //============================================================================
  //============================================================================
  //============================================================================
  // function submitHandler(updatedOrder: Order) {
  //   const abortController = new AbortController();
    
  //   updateOrder(updatedOrder, abortController.signal)
  //     .then((savedOrder) => history.push(`/orders/${savedOrder.id}/confirmed`))
  //     .catch(setError);

  //   return () => abortController.abort();
  // }

  function cancelHandler() {
    history.goBack();
  }

  function deleteHandler() {
    const abortController = new AbortController();
    
    const confirmed = window.confirm(
      "Delete this order?\n\nYou will not be able to recover it."
    );
    if (confirmed && ordersData && ordersData.id) {
      deleteOrder(ordersData.id, abortController.signal)
        .then(() => history.push("/dashboard"))
        .catch(setError);
    }
  }

  const child = ordersData ? (
    <OrderForm
    initialState={ordersData}
      // setOrder={setOrder as React.Dispatch<React.SetStateAction<Order>>}
      // onSubmit={submitHandler}
      readOnly={ordersData.status === "delivered"}
      showStatus={true}
    >
      <div className="mr-auto">
        <button
          type="button"
          className="btn btn-secondary mr-2"
          onClick={cancelHandler}
          >
          <span className="oi oi-x" /> Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={ordersData.status === "delivered" || ordersData.dishes.length === 0}
        >
          <span className="oi oi-check" /> Submit
        </button>
      </div>
      <div className="col-auto">
        {ordersData.status === "pending" ? (
          <button
            type="button"
            className="btn btn-danger"
            title="Delete Order"
            disabled={ordersData.status !== "pending"}
            onClick={deleteHandler}
          >
            <span className="oi oi-trash" />
          </button>
        ) : (
          <p>
            'Pending' status only{" "}
            <button
              type="button"
              className="btn btn-danger"
              title="Delete Order"
              disabled={ordersData.status !== "pending"}
              onClick={deleteHandler}
            >
              <span className="oi oi-trash" />
            </button>
          </p>
        )}
      </div>
    </OrderForm>
  ) : (
    <p>Loading...</p>
  );

  return (
    <main>
      <h1>Edit Order</h1>
      <ErrorAlert error={error} />
      {child}
    </main>
  );
}

export default OrderEdit;
