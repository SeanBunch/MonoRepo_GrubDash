import React, { useState, ChangeEvent, FormEvent } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { OrderFormProps, Order, Dish } from "../types/types";
import OrderFormDish from "./OrderFormDish";
import { removeFromCart } from "./cartSlice";


function OrderForm({ 
  initialState,
  submitHandler,
  readOnly = false,
  showStatus = false,
}: OrderFormProps) {

  const history = useHistory();
  const dispatch = useDispatch();
  const [newOrder, setNewOrder] = useState<Order>(initialState);
  function changeHandler({ target: { name, value } }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setNewOrder((previousOrder) => ({
      ...previousOrder,
      [name]: value,
    }));
  };
  const onSub = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if(submitHandler) {
      submitHandler(newOrder);
    }
  };
 

  function setDishQuantity(dishId: number, quantity: number) {
    if (newOrder.dishes) {
      setNewOrder((previousOrder) => {
        const dishes = previousOrder.dishes.map((dish: Dish) => {
          return {
            ...dish,
            quantity: dish.id === dishId ? Math.max(1, quantity) : dish.quantity,
          };
        });
  
        return {
          ...previousOrder,
          dishes,
        };
      });
    }
  }

function smite(dishId: number) {
  dispatch(removeFromCart(dishId));
    setNewOrder((previousOrder) => {
      return {
        ...previousOrder,
        dishes: previousOrder.dishes.filter((dish) => dish.id !== dishId),
      };
    });
  
}

  const dishes = newOrder.dishes?.map((dish: Dish) => (
    <OrderFormDish
      key={dish.id}
      dish={dish}
      setDishQuantity={setDishQuantity}
      deleteDish={smite}
      readOnly={readOnly}
    />
  ));

  const total = newOrder.dishes?.reduce(
    (sum: number, dish: Dish) => sum + dish.price * (dish.quantity),
    0
  );
  function onCancel() {
    history.goBack();
  }

  return (
    <form onSubmit={onSub}>
      <fieldset className="mb-2">
        {showStatus && (
          <div className="form-group">
            <label htmlFor="status">Order Status</label>
            <select
              className="form-control"
              id="status"
              name="status"
              required={true}
              value={newOrder.status}
              // placeholder="Select a status for the order"
              disabled={readOnly}
              onChange={changeHandler}
            >
              <option value="select-status" disabled>Select a status for the order</option>
              <option value="pending">Pending</option>
              <option value="preparing">Preparing</option>
              <option value="out-for-delivery">Out for delivery</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
        )}
        <div className="form-group">
          <label htmlFor="deliverTo">Delivery Address</label>
          <input
            type="text"
            className="form-control"
            id="deliverTo"
            name="deliverTo"
            required={true}
            value={newOrder.deliverTo}
            placeholder="Enter the delivery address"
            disabled={readOnly}
            onChange={changeHandler}
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobileNumber">Mobile Number</label>
          <input
            type="text"
            className="form-control"
            id="mobileNumber"
            name="mobileNumber"
            required={true}
            value={newOrder.mobileNumber}
            placeholder="Enter your mobile number"
            disabled={readOnly}
            onChange={changeHandler}
          />
        </div>

        <div className="form-row">
          <div className="col-md-2 col-lg-1">Quantity</div>
          <div className="col">Description</div>
          <div className="col-md-2 col-lg-1">Price</div>
          <div className="col-md-2 col-lg-1">Total</div>
          {readOnly === false && (
            <div className="col-auto">
              <span className="oi oi-trash m-2" />
              &nbsp;
            </div>
          )}
        </div>
        {dishes}
        <div className="form-row">
          <h3>
            <span className="text-muted">Total:</span> $ {total}.00
          </h3>
        </div>
      </fieldset>
      <div className="form-row">
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
            disabled={initialState.dishes?.length === 0}
          >
            <span className="oi oi-check" /> Submit
          </button>
        </div>
      </div>
    </form>
  );
}

export default OrderForm;
