import React, { useEffect, useState } from "react";
import { listDishes } from "../utils/api";
import DishCard from "./DishCard";
import ErrorAlert from "../layout/ErrorAlert";
import { Dish } from "../utils/types";

type HomeProps = {
    addToCart: (dish: Dish) => void;
};

function Home({ addToCart: addToCart }: HomeProps) {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [error, setError] = useState(null);

  useEffect(loadDishes, []);
  
  function loadDishes() {
    const abortController = new AbortController();
    setError(null);
    listDishes(abortController.signal).then(setDishes).catch(setError);
    return () => abortController.abort();
  }
  
  const cards = dishes[0] ? ( dishes.map((dish) => (
    <DishCard key={dish.id} dish={dish}>
      <button className="btn btn-primary" onClick={() => addToCart(dish)}>
        <span className="oi oi-plus" /> Add to cart
      </button>
    </DishCard>
  ))) : (
    <div>
      <h1>Loading...</h1>
      <p>The website is hosted on a free render.com account. The backend takes up to 1 minute to spin up. Thank you for visiting!</p>
    </div>
  );

  return (
    <main>
      <ErrorAlert error={error} />
      <div className="row">{cards}</div>
    </main>
  );
}

export default Home;
