import React, { useState, ChangeEvent, FormEvent } from "react";
import OrderFormDish from "./OrderFormDish";
import { OrderFormProps, Order } from "../types/types";

function OrderForm({ 
    order,
    setOrder,
    onSubmit,
    children,
    readOnly = false,
    showStatus = false
}: OrderFormProps) {

  const [orderOnSub, setorderOnSub] = useState<Order>({
    id: order.id,
    deliverTo: order.deliverTo,
    mobileNumber: order.mobileNumber,
    status: order.status,
    dishes: order.dishes,
  });
  function changeHandler({ target: { name, value } }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setorderOnSub((previousOrder) => ({
      ...previousOrder,
      [name]: value,
    }));
    
  }
  
  function submitHandler(event: FormEvent<HTMLFormElement>) {
    const abortController = new AbortController();
    event.preventDefault();
    event.stopPropagation();
    if (onSubmit) {
      onSubmit(orderOnSub);
    }

    return () => abortController.abort();
  }
  
  function setDishQuantity(dishId: number, quantity: number) {
    if (setOrder) {
      setorderOnSub((previousOrder) => {
        const dishes = previousOrder.dishes.map((dish) => {
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

function deleteDish(dishId: number) {

    if (setOrder) {
     setOrder((previousOrder) => {
      return {
        ...previousOrder,
        dishes: previousOrder.dishes.filter((dish) => dish.id !== dishId),
      };
    });
    setorderOnSub((previousOrder) => {
      return {
        ...previousOrder,
        dishes: previousOrder.dishes.filter((dish) => dish.id !== dishId),
      };
    });
  }
}

  const dishes = orderOnSub.dishes.map((dish) => (
    <OrderFormDish
      key={dish.id}
      dish={dish}
      setDishQuantity={setDishQuantity}
      deleteDish={deleteDish}
      readOnly={readOnly}
    />
  ));

  const total = orderOnSub.dishes.reduce(
    (sum, dish) => sum + dish.price * (dish.quantity),
    0
  );

  return (
    <form onSubmit={submitHandler}>
      <fieldset className="mb-2">
        {showStatus && (
          <div className="form-group">
            <label htmlFor="status">Order Status</label>
            <select
              className="form-control"
              id="status"
              name="status"
              required={true}
              value={orderOnSub.status}
              // placeholder="Select a status for the order"
              disabled={readOnly}
              onChange={changeHandler}
            >
              <option value="" disabled>Select a status for the order</option>
              <option value="pending">Pending</option>
              <option value="preparing">Preparing</option>
              <option value="out-for-delivery">Out for delivery</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
        )}
        <div className="form-group">
          <label htmlFor="deliverTo">Delivery address</label>
          <input
            type="text"
            className="form-control"
            id="deliverTo"
            name="deliverTo"
            required={true}
            value={orderOnSub.deliverTo}
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
            value={orderOnSub.mobileNumber}
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
      <div className="form-row">{children}</div>
    </form>
  );
}

export default OrderForm;
