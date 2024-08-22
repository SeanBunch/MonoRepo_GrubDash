// import React, { useEffect, useState } from "react";
// import { listDishes, useListDishesQuery } from "../utils/api";
// import DishCard from "./DishCard";
// import ErrorAlert from "../layout/ErrorAlert";
// import { Dish, HomeProps } from "../types/types";


//  ===========================================================================
//  ===========================================================================
//  ===========================================================================
import React from "react";
import { useListDishesQuery } from "../utils/api";
import DishCard from "./DishCard";
// import { HomeProps } from "../types/types";
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




// const cards = isLoading ? (
//   <div>
//     <h1>Loading...</h1>
//     <p>The website is hosted on a free render.com account. The backend takes up to 1 minute to spin up. Thank you for visiting!</p>
//   </div>
// ) : (
//   (dishes as Dish[]).map((dish) => (
//     <DishCard key={dish.id} dish={dish}>
//       <button className="btn btn-primary" onClick={() => addToCart(dish)}>
//         <span className="oi oi-plus" /> Add to cart
//       </button>
//     </DishCard>
//   ))
// );

// return (
//   <main>
//      {
//      error && "status" in error ? <div className="alert alert-danger m-2">Error: {error.status}</div> : null
//      }

//     <div className="row">{cards}</div>
//   </main>
// );
};


//  ===========================================================================
//  ===========================================================================
//  ===========================================================================

  // const [dishes, setDishes] = useState<Dish[]>([]);
  // const [error, setError] = useState(null);

  // useEffect(loadDishes, []);
  
  // function loadDishes() {
  //   const abortController = new AbortController();
  //   setError(null);
  //   listDishes(abortController.signal).then(setDishes).catch(setError);
  //   return () => abortController.abort();
  // }
  
  // const cards = dishes[0] ? ( dishes.map((dish) => (
  //   <DishCard key={dish.id} dish={dish}>
  //     <button className="btn btn-primary" onClick={() => addToCart(dish)}>
  //       <span className="oi oi-plus" /> Add to cart
  //     </button>
  //   </DishCard>
  // ))) : (
  //   <div>
  //     <h1>Loading...</h1>
  //     <p>The website is hosted on a free render.com account. The backend takes up to 1 minute to spin up. Thank you for visiting!</p>
  //   </div>
  // );

  // return (
  //   <main>
  //     <ErrorAlert error={error} />
  //     <div className="row">{cards}</div>
  //   </main>
  // );
// }

export default Home;
