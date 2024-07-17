import React from "react";
import { Dish } from "../utils/types";

interface DishCardProps {
    dish: Dish;
    children: React.ReactNode;
}

function DishCard({ dish, children }: DishCardProps) {
  return (
    <div className="col-sm-12 col-md-6 col-lg-3 my-2">
      <div className="card">
        <img
          src={dish.image_url}
          className="card-img-top"
          alt={`${dish.name} interior`}
        />
        <div className="card-body">
          <h5 className="card-title text-truncate">{dish.name}</h5>
          <p className="card-text">{dish.description}</p>
        </div>
          <p className="card-text offset-md-1">$ {dish.price}</p>
        <div className="card-footer">
          {children}
          </div>
      </div>
    </div>
  );
}

export default DishCard;
