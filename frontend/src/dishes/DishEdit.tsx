import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import DishForm from "./DishForm";
import { readDish, updateDish } from "../utils/api";

interface RouteParams {
    dishId: string;
}
type Dish = { 
    id: number;
    name: string; 
    description: string;
    image_url: string;
    price: number; 
}

function DishEdit() {
  const history = useHistory();
  const { dishId } = useParams<RouteParams>();

  const [dish, setDish] = useState<Dish>({
    id: 0,
    name: "",
    description: "",
    image_url: "",
    price: 0
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    readDish(dishId, abortController.signal).then(setDish).catch(setError);
    return () => abortController.abort();
  }, [dishId]);

  function submitHandler(updatedDishOrder: Dish) {
    updateDish(updatedDishOrder)
      .then(() => history.push(`/dashboard`))
      .catch(setError);
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
