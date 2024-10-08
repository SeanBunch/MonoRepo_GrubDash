import React from "react";
import { useHistory, useParams } from "react-router-dom";
import OrderForm from "./OrderForm";
import { RouteParams, Order } from "../types/types";
import { useReadOrderQuery, useUpdateOrderMutation, useDeleteOrderMutation } from "../utils/api";

function OrderEdit() {
  const history = useHistory();
  const { orderId } = useParams<RouteParams>();
  const { data: ordersData, isSuccess } = useReadOrderQuery(orderId);
  const [updateOrder] = useUpdateOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();
  
  async function submitHandler(newOrder: Order) {
    try {
      const { data: changeOrder} = await updateOrder(newOrder).unwrap();
      history.push(`/orders/${changeOrder.id}/confirmed`);
    } catch (error) {
      console.log(error);
    }
  }

  function cancelHandler() {
    history.goBack();
  }


  function deleteHandler() {
    
    const confirmed = window.confirm(
      "Delete this order?\n\nYou will not be able to recover it."
    );
    if (confirmed && ordersData && ordersData.id) {
      try {
        deleteOrder(ordersData.id).unwrap();
        history.push("/dashboard")
      } catch (error) {
        console.log(error);
      }
    }
  }

  const child = ordersData ? (
    <OrderForm
    initialState={ordersData.data}
      submitHandler={submitHandler}
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
          disabled={ordersData.status === "delivered" || ordersData.data.dishes.length === 0}
        >
          <span className="oi oi-check" /> Submit
        </button>
      </div>
      <div className="col-auto">
        {isSuccess && ordersData.data.status === "pending" ? (
          <button
            type="button"
            className="btn btn-danger"
            title="Delete Order"
            disabled={false}
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
              disabled={true}
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
      {/* <ErrorAlert error={error} /> */}
      {child}
    </main>
  );
}

export default OrderEdit;
