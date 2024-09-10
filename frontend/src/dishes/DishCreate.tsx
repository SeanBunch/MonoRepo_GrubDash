import React from "react";
import DishForm from "./DishForm";

function DishCreate() {
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

  return (
    <main>
      <h1>Create Dish</h1>
      {/* <ErrorAlert error={error} /> */}
      {/* <DishForm onSubmit={submitHandler} onCancel={cancelHandler} /> */}
      <DishForm initialState={dish.data}/>

    </main>
  );
}

export default DishCreate;
