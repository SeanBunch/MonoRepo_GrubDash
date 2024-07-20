import React from "react";
import { OrderFormDishProps } from "../types/types";

function OrderFormDish({
  setDishQuantity,
  deleteDish,
  readOnly,
  dish,
}: OrderFormDishProps) {
  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    if (dish.id) {
      setDishQuantity(dish.id, parseInt(event.target.value));
    }
}

  function deleteHandler() {
    if (dish.id) {
      deleteDish(dish.id);
    }
  }

  return (
    <div className="form-row mb-2">
      <div className="col-md-2 col-lg-1">
        <input
          type="number"
          className="form-control"
          name={dish.name}
          value={dish.quantity}
          disabled={readOnly}
          onChange={changeHandler}
        />
      </div>
      <div className="col">
        <input
          type="text"
          className="form-control"
          disabled={true}
          value={dish.name}
        />
      </div>
      <div className="col-md-2 col-lg-1">
        <input
          type="text"
          className="form-control"
          disabled={true}
          value={`$ ${dish.price}`}
        />
      </div>
      <div className="col-md-2 col-lg-1">
        {dish.price && dish.quantity !== undefined && (
        <input
          type="text"
          className="form-control"
          disabled={true}
          value={`$ ${dish.price * dish.quantity}`}
        />
        )}
      </div>
      {readOnly === false && (
        <div className="col-auto">
          <button
            type="button"
            className="btn btn-danger"
            onClick={deleteHandler}
          >
            <span className="oi oi-trash" />
          </button>
        </div>
      )}
    </div>
  );
}

export default OrderFormDish;
