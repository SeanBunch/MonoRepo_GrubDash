// import React, { useEffect, useState } from "react";
import React, { useState } from "react";
// import { readDish } from "../utils/api";
import { Link, useParams } from "react-router-dom";
// import ErrorAlert from "../layout/ErrorAlert";
import DishCard from "../home/DishCard";
import { Dish, RouteParams } from "../types/types";
import { useReadDishQuery } from "../utils/api";
function DishView() {
  // const history = useHistory();
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
  // const [error, setError] = useState(null);

  // useEffect(loadOrder, [dishId]);

  // function loadOrder() {
  //   const abortController = new AbortController();

  //   readDish(dishId, abortController.signal).then(setDish).catch(setError);

  //   return () => abortController.abort();
  // }

  // function cancelHandler() {
  //   history.goBack();
  // }

  // function deleteHandler() {
  //   const confirmed = window.confirm(
  //     "Delete this order?\n\nYou will not be able to recover it."
  //   );
  //   if (confirmed) {
  //     deleteOrder(order.id)
  //       .then(() => history.push("/orders"))
  //       .catch(setError);
  //   }
  // }


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
