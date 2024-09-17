import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import DishCard from "../home/DishCard";
import { Dish, RouteParams } from "../types/types";
import { useReadDishQuery } from "../utils/api";
function DishView() {
  const { dishId } = useParams<RouteParams>();
  const [dish, setDish] = useState<Dish>({ 
    id: 0,
    name: "", 
    description: "",
    price: 0,
    image_url: "",
    quantity: 0,
    status: "",
});
const { data: readDish } = useReadDishQuery(dishId);
readDish ? setDish(readDish) : setDish(dish);

  return (
    <main>
      <h1>View Dish</h1>
      {/* <ErrorAlert error={error} /> */}
      <DishCard dish={dish}>
        <Link to={`/dishes/${dish.id}/edit`} className="btn btn-secondary">
          <span className="oi oi-pencil" /> Edit
        </Link>
      </DishCard>
    </main>
  );
}

export default DishView;
