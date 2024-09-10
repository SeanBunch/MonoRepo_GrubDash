import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useCreateOrderMutation } from "../utils/api";
import { Order } from "../types/types";
import OrderForm from "./OrderForm";
import  { clearCart }  from "./cartSlice";

function OrderCreate() {
  const history = useHistory();
  const [ createOrder, { error: error } ] = useCreateOrderMutation();
  const cart = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();
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
    </main>
  );
}

export default OrderCreate;
