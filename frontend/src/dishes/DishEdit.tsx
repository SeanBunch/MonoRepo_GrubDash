import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import DishForm from "./DishForm";
import { readDish, updateDish } from "../utils/api";
import { Dish, RouteParams } from "../types/types";

function DishEdit() {
  const history = useHistory();
  const { dishId } = useParams<RouteParams>();

  const [dish, setDish] = useState<Dish | null>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    readDish(dishId, abortController.signal).then(setDish).catch(setError);
    return () => abortController.abort();
  }, [dishId]);

  function submitHandler(updatedDishOrder: Dish) {
    const abortController = new AbortController();
  
    updateDish(updatedDishOrder, abortController.signal)
      .then(() => history.push(`/dashboard`))
      .catch(setError);

    return () => abortController.abort();
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
