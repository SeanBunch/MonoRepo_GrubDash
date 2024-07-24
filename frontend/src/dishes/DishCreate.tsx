import React from "react";
// import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
import DishForm from "./DishForm";
// import ErrorAlert from "../layout/ErrorAlert";
// import { createDish, useCreateDishMutation } from "../utils/api";
// import { useCreateDishMutation } from "../utils/api";

// import { Dish } from "../types/types";



function DishCreate() {
  // const history = useHistory();

  // const [error, setError] = useState<Error | null>(null);
  
// ===========================================================================
// ===========================================================================
// ===========================================================================
const dish = {
  data: {
    id: 0,
    name: "",
    description: "",
    price: 0,
    image_url: "",
    quantity: 0
  }
}
  // const [createDish, { error }] = useCreateDishMutation();
  // async function submitHandler(dish: Dish) {
  //   try {
  //     await createDish(dish);
  //     history.push(`/dashboard`);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }


// ===========================================================================
// ===========================================================================
// ============================================================================

  // function submitHandler(dish: Dish) {
  //   const abortController = new AbortController();
  //   createDish(dish, abortController.signal)
  //     .then(() => history.push(`/dashboard`))
  //     .catch(setError);
  //   return () => abortController.abort();
  // }

  // function cancelHandler() {
  //   history.goBack();
  // }

  return (
    <main>
      <h1>Create Dish</h1>
      {

// error && "status" in error ? <div className="alert alert-danger m-2">Error: {error.status}</div> : null

}
      {/* <ErrorAlert error={error} /> */}
      {/* <DishForm onSubmit={submitHandler} onCancel={cancelHandler} /> */}
      <DishForm initialState={dish.data}/>

    </main>
  );
}

export default DishCreate;
