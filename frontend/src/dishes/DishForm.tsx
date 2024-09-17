import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Dish, DishFormProps } from "../types/types";
import { useUpdateDishMutation, useCreateDishMutation } from "../utils/api";

function DishForm({initialState}: DishFormProps) {
    const [updateDish, { error: updateError }] = useUpdateDishMutation();
    const [createDish, { error: createError }] = useCreateDishMutation();
    const [newDish, setNewDish] = useState<Dish>(initialState);
    const history = useHistory();


    async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();
      event.stopPropagation();
      try {
        if (newDish.id) {
          await updateDish(newDish);
        } else {
          await createDish(newDish);
        }
        history.push(`/dashboard`);
      } catch (error) {
        console.log(updateError, createError, error);
      }
    }
    const changeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;
      setNewDish((previousDish) => ({
        ...previousDish,
        [name]: name === "price" ? parseInt(value, 10) : value,
        ...(name === "name" && {
          image_url: `https://dummyimage.com/360x360/292929/e3e3e3&text=${encodeURI(value.trim())}`,
        }),
      }));
    };

    function cancelHandler() {
      history.goBack();
    };

  return (
    <>
      <form onSubmit={submitHandler} className="restaurant-edit">
        <fieldset>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={newDish?.name}
              required={true}
              placeholder="Dish Name"
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              className="form-control"
              rows={4}
              required={true}
              placeholder="Brief description of the dish"
              value={newDish?.description}
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="imageUrl">Image URL</label>
            <input
              type="text"
              id="imageUrl"
              name="image_url"
              className="form-control"
              value={newDish?.image_url}
              required={true}
              placeholder="Image URL"
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">$</span>
              </div>
              <input
                type="number"
                id="price"
                name="price"
                className="form-control"
                aria-label="Price (to the nearest dollar)"
                required={true}
                value={newDish?.price}
                onChange={changeHandler}
              />
              <div className="input-group-append">
                <span className="input-group-text">.00</span>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-secondary mr-2"
            onClick={cancelHandler}
          >
            <span className="oi oi-x" /> Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            <span className="oi oi-check" /> Submit
          </button>
        </fieldset>
      </form>
    </>
  );
}

export default DishForm;
