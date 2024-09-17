import React from "react";
import { useListDishesQuery } from "../utils/api";
import DishCard from "./DishCard";
import { addToCart } from "../orders/cartSlice";
import { useDispatch } from "react-redux";

function Home() {
const { data: dishes, error, isSuccess, isError, isLoading } = useListDishesQuery();
const dispatch = useDispatch();

if (isLoading) {
  return <div>Loading...</div>;
}

if (isError) {
  if (isError) {
    if ('status' in error) {
      return <div className="alert alert-danger m-2">Error: {error.status}</div>;
    } else {
      return <div className="alert alert-danger m-2">Error: An unknown error occurred.</div>;
    }
  }
}

if (!isSuccess) {
  return <div className="alert alert-danger m-2">Something went wrong</div>;
}

return (
  <main> 
  <div className="row">
      {dishes.data.map((dish) => (
    <DishCard key={dish.id} dish={dish}>
      <button className="btn btn-primary" onClick={() => dispatch(addToCart(dish))}>
        <span className="oi oi-plus" /> Add to cart
      </button>
    </DishCard>
  ))
         
      }
  </div>
  </main>
);
};


export default Home;
