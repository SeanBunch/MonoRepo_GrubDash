import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import DishForm from "./DishForm";
import { readDish, updateDish } from "../utils/api";
import { Dish, RouteParams } from "../types/types";

function DishEdit() {
  const history = useHistory();
  const { dishId } = useParams<RouteParams>();

  const [dish, setDish] = useState<Dish>({
    id: 0,
    name: "",
    description: "",
    price: 0,
    image_url: "",
    quantity: 0,
    status: "",
    mobileNumber: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    const id = parseInt(dishId, 10);
    readDish(id, abortController.signal).then(setDish).catch(setError);
    return () => abortController.abort();
  }, [dishId]);

  function submitHandler(updatedDishOrder: Dish) {
    const abortController = new AbortController();
    try {
      updateDish(updatedDishOrder, abortController.signal)
        .then(() => history.push(`/dashboard`))
        .catch(setError);
    } catch (error: any) {
      setError(error);
    } finally {
      abortController.abort();
    }
    // updateDish(updatedDishOrder, abortController.signal)
    //   .then(() => history.push(`/dashboard`))
    //   .catch(setError);
  }

  function cancelHandler() {
    history.goBack();
  }

  const child = dish ? (
    <DishForm
      initialState={dish}
      onCancel={cancelHandler}
      onSubmit={submitHandler}
    />
  ) : (
    <p>Loading...</p>
  );

  return (
    <main>
      <h1>Edit Dish</h1>
      <ErrorAlert error={error} />
      {child}
    </main>
  );
}

export default DishEdit;
