import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order } from '../types/types';




const initialState: Order = {
        id: 0,
        deliverTo: "",
        mobileNumber: "",
        status: "pending",
        dishes: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Order>) {

      const newDish = action.payload;
      const index = state.dishes.findIndex(
        (dish) => dish.id === newDish.id
      );

      if (index === -1) {
        return {
          ...state,
          dishes: [...state.dishes, {...newDish, quantity: 1}],
        };
      }

      const dishes = state.dishes.map((dish) => {
        if ( dish.id === newDish.id) {
          return {
            ...dish,
            quantity: dish.quantity + 1,
          }
        }
        return dish
      });

      return {
        ...state,
        dishes,
      };
  },
});

export const { addItem } = cartSlice.actions;

export default cartSlice.reducer;
