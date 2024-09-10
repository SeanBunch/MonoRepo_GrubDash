import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useCreateOrderMutation } from "../utils/api";
import { Order } from "../types/types";
import OrderForm from "./OrderForm";
import  { clearCart }  from "./cartSlice";
// import ErrorAlert from "../layout/ErrorAlert";
function OrderCreate() {
  const history = useHistory();
  const [ createOrder, { error: error } ] = useCreateOrderMutation();
  const cart = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();
//   const initialState = {
//     data : {
//       deliverTo: "",
//       mobileNumber: "",
//       status: "pending",
//       dishes: cart.dishes,
//     },
// };
const initialState = {
    deliverTo: "",
    mobileNumber: "",
    status: "pending",
    dishes: cart.dishes,
};
async function submitHandler(newOrder: Order) {
    try {
        const { data: spawnOrder } = await createOrder(newOrder).unwrap();
        dispatch(clearCart());
        history.push(`/orders/${spawnOrder.id}/confirmed`);
    } catch (error) {
      console.log(error);
    }
}
    
    return (
      <main>
      <h1>Create Order</h1>
      {error ? `Error: ${error}` : null}
      <OrderForm initialState={initialState} submitHandler={submitHandler}  />
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
