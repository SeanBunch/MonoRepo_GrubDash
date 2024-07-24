// import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import ErrorAlert from "../layout/ErrorAlert";
import DishForm from "./DishForm";
// import { readDish, updateDish, useReadDishQuery, useUpdateDishMutation } from "../utils/api";
import { RouteParams } from "../types/types";

import { useReadDishQuery } from "../utils/api";
import React from "react";

function DishEdit() {
  // const history = useHistory();
  // const { dishId } = useParams<RouteParams>();

  // const [dish, setDish] = useState<Dish | null>(null);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const abortController = new AbortController();
  //   readDish(dishId, abortController.signal).then(setDish).catch(setError);
  //   return () => abortController.abort();
  // }, [dishId]);
// ===========================================================================
// ===========================================================================
// ===========================================================================
const { dishId } = useParams<RouteParams>();
const { data: dish, error } = useReadDishQuery(dishId);

// ===========================================================================
// ===========================================================================
// ===========================================================================

  // function submitHandler(updatedDishOrder: Dish) {
  //   const abortController = new AbortController();
  
  //   updateDish(updatedDishOrder, abortController.signal)
  //     .then(() => history.push(`/dashboard`))
  //     .catch(setError);

  //   return () => abortController.abort();
  // }

  // function cancelHandler() {
  //   history.goBack();
  // }

  const child = dish ? (
    <DishForm initialState={dish}/>
  ) : (
    <p>Loading...</p>
  );

  return (
    <main>
      <h1>Edit Dish</h1>
      {

error && "status" in error ? <div className="alert alert-danger m-2">Error: {error.status}</div> : null

}
      {/* <ErrorAlert error={error} /> */}
      {child}
    </main>
  );
}

export default DishEdit;
