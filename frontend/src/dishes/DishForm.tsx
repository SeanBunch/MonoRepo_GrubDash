import React, { useState } from "react";

type Dish = { 
    name: string; 
    description: string;
    image_url: string;
    price: number; 
}

type DishFormProps = {
  onSubmit: (dish: Dish) => void;
  onCancel: () => void;
  initialState?:Dish;
};

function DishForm({
    onSubmit,
    onCancel,
    initialState = { name: "", description: "", image_url: "", price: 0 },
  }: DishFormProps) {

  const [dish, setDish] = useState<Dish>(initialState);
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setDish((previousDish) => ({
      ...previousDish,
      [name]: name === "price" ? parseInt(value, 10) : value,
      ...(name === "name" && {
        image_url: `https://dummyimage.com/360x360/292929/e3e3e3&text=${encodeURI(value.trim())}`,
      }),
    }));
  };

//   function nameChangeHandler({ target: { name, value } }) {
//     setDish((previousDish) => ({
//       ...previousDish,
//       [name]: value,
//       image_url: `https://dummyimage.com/360x360/292929/e3e3e3&text=${encodeURI(
//         value.trim()
//       )}`,
//     }));
//   }

//   function changeHandler({ target: { name, value } }) {
//     setDish((previousDish) => ({
//       ...previousDish,
//       [name]: value,
//     }));
//   }

//   function priceChangeHandler({ target: { name, value } }) {
//     setDish((previousDish) => ({
//       ...previousDish,
//       [name]: parseInt(value, 10),
//     }));
//   }

  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.stopPropagation();
    onSubmit(dish);
  }

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
              value={dish.name}
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
              value={dish.description}
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
              value={dish.image_url}
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
                value={dish.price}
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
            onClick={onCancel}
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
