import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import DishForm from "./DishForm";
import ErrorAlert from "../layout/ErrorAlert";
import { createDish } from "../utils/api";


type Dish = { 
    name: string; 
    description: string;
    image_url: string;
    price: number; 
}
function DishCreate() {
  const history = useHistory();

  const [error, setError] = useState<Error | null>(null);

  function submitHandler(dish: Dish) {
    const abortController = new AbortController();
    createDish(dish, abortController.signal)
      .then(() => history.push(`/dashboard`))
      .catch(setError);
    return () => abortController.abort();
  }

  function cancelHandler() {
    history.goBack();
  }

  return (
    <main>
      <h1>Create Dish</h1>
      <ErrorAlert error={error} />
      <DishForm onSubmit={submitHandler} onCancel={cancelHandler} />
    </main>
  );
}

export default DishCreate;
