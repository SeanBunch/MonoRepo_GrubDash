import { Order, Dish } from "../types/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";


const headers = new Headers();
headers.append("Content-Type", "application/json");

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL, headers }),
  tagTypes: ["Dishes", "Orders"],
  endpoints: (builder) => ({
    // builder.query<ResultType, QueryArg>()
    listDishes: builder.query<{data: Dish[]}, void>({
      query: () => '/dishes',
      providesTags: (result) =>
        result ? [...result.data.map(({ id }) => ({ type: "Dishes", id } as const)), { type: "Dishes", id: "LIST" }] : [{ type: "Dishes", id: "LIST" }],
    }),
    createOrder: builder.mutation<Order, Order>({
      query: (order) => ({
        url: '/orders',
        method: 'POST',
        body: { data: order },
      }),
      invalidatesTags: [{ type: "Orders", id: "LIST" }],
    }),
    readOrder: builder.query<Order, string>({
      query: (orderId) => `/orders/${orderId}`,
      providesTags: (result, error, orderId) => {
        if(error) {
          console.error(error);
          return [{ type: "Orders", id: orderId }];
        } else if (result) {
          return [{ type: "Orders", id: orderId }, { type: "Orders", id: "LIST" }];
        } else {
          return [{ type: "Orders", id: "LIST" }];  
        }
      },
    }),
    listOrders: builder.query<{data: Order[]}, void>({
      query: () => '/orders',
      providesTags: (result) =>
        result ? [...result.data.map(({ id }) => ({ type: "Orders", id } as const)), { type: "Orders", id: "LIST" }] : [{ type: "Orders", id: "LIST" }],
    }),
    updateOrder: builder.mutation<Order, Order>({
      query: (order) => ({
        url: `/orders/${order.id}`,
        method: 'PUT',
        body: { data: order },
      }),
      invalidatesTags: [{ type: "Orders", id: "LIST" }],
    }),
    deleteOrder: builder.mutation<void, number>({
      query: (orderId) => ({
        url: `/orders/${orderId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: "Orders", id: "LIST" }],
    }),
    createDish: builder.mutation<Dish, Dish>({
      query: (dish) => ({
        url: '/dishes',
        method: 'POST',
        body: { data: dish },
      }),
      invalidatesTags: [{ type: "Dishes", id: "LIST" }],
    }),
    readDish: builder.query<Dish, string>({
      query: (dishId) => `/dishes/${dishId}`,
      providesTags: (result, error, dishId) => {
        if (error) {
          console.error(error);
          return [{ type: "Dishes", id: dishId }];
        } else if (result) {
          return [{ type: "Dishes", id: dishId }, { type: "Dishes", id: "LIST" }];
        } else {
          return [{ type: "Dishes", id: "LIST" }];
        }
      },
    }),
    updateDish: builder.mutation<Dish, Dish>({
      query: (dish) => ({
        url: `/dishes/${dish.id}`,
        method: 'PUT',
        body: { data: dish },
      }),
      invalidatesTags: [{ type: "Dishes", id: "LIST" }],
    }),
    deleteDish: builder.mutation<void, number>({
      query: (dishId) => ({
        url: `/dishes/${dishId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: "Dishes", id: "LIST" }],
    }),
  }),
});

export const {
  useListDishesQuery,
  useCreateOrderMutation,
  useReadOrderQuery,
  useListOrdersQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useCreateDishMutation,
  useReadDishQuery,
  useUpdateDishMutation,
  useDeleteDishMutation,
} = api;

