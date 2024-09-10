import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dish } from '../types/types';


export interface CartState {
  dishes: Dish[];
}

const initialState: CartState = {
  dishes: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Dish>) => {
      const newDish = action.payload;
      const existingDish = state.dishes.find((dish) => dish.id === newDish.id);

      if (existingDish) {
        existingDish.quantity = (existingDish.quantity || 1) + 1;
      } else {
        state.dishes.push({ ...newDish, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const dishId = action.payload;
      state.dishes = state.dishes.filter((dish) => dish.id !== dishId);
    },
    clearCart: (state) => {
      state.dishes = [];
    }
    // Optionally, add other actions like removeFromCart, clearCart, etc.
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
