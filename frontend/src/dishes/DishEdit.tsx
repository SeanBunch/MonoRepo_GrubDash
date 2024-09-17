import { useParams } from "react-router-dom";
import DishForm from "./DishForm";
import { RouteParams } from "../types/types";
import { useReadDishQuery } from "../utils/api";
import React from "react";

function DishEdit() {
const { dishId } = useParams<RouteParams>();
const { data: dish, error } = useReadDishQuery(dishId);
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
