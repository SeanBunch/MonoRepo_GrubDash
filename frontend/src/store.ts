import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./orders/cartSlice";
import { api } from "./utils/api";


const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        cart: cartReducer,
        
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
  
    devTools: process.env.NODE_ENV !== "production",
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;