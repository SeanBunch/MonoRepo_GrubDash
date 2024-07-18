import { Order, Dish } from "../types/types";
import { FetchError } from "../types/types";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";


const headers = new Headers();
headers.append("Content-Type", "application/json");

async function fetchJson<T>(url: string, options: RequestInit): Promise<T> {
  try {
    const response = await fetch(url, options);

    if (response.status === 204) {
      return null as unknown as T;
    }

    const payload = await response.json();

    if (payload.error) {
      const error = new Error(payload.error) as FetchError;
      error.status = response.status;
      error.response = response;

      throw error;
      // return Promise.reject({ message: payload.error });
    }

    return payload.data;
  } catch (error) {
    if ((error as FetchError).name !== "AbortError") {
      console.error((error as FetchError).stack);
      throw error;
    }
    throw error;

    // if (error.name !== "AbortError") {
    //   console.error(error.stack);
    //   throw error;
    // }
  }
}

export async function listDishes(signal: AbortSignal): Promise<Dish[]> {
  const url = `${API_BASE_URL}/dishes`;
  return await fetchJson<Dish[]>(url, { signal });
}

export async function createOrder(order: Order, signal: AbortSignal): Promise<Order> {
  const url = `${API_BASE_URL}/orders`;
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({ data: order }),
    signal,
  };
  return await fetchJson<Order>(url, options);
}

export async function readOrder(orderId: number, signal: AbortSignal): Promise<Order> {
  const url = `${API_BASE_URL}/orders/${orderId}`;

  try {
    return await fetchJson(url, { signal });
  } catch (error) {
    
    if (error !== "AbortError") {
      console.error(error);
      throw error;
    }
    return await fetchJson<Order>(url, { signal });
  }
}
export async function listOrders(signal: AbortSignal): Promise<Order[]> {
  const url = `${API_BASE_URL}/orders`;
  return await fetchJson<Order[]>(url, { signal });
}

export async function updateOrder(order: Order, signal: AbortSignal): Promise<Order> {
  const url = `${API_BASE_URL}/orders/${order.id}`;
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify({ data: order }),
    signal,
  };
  return await fetchJson<Order>(url, options);
}

export async function deleteOrder(orderId: number, signal: AbortSignal): Promise<void> {
  const url = `${API_BASE_URL}/orders/${orderId}`;
  const options = { method: "DELETE", signal };
  return await fetchJson<void>(url, options);
}

export async function createDish(dish: Dish, signal: AbortSignal): Promise<Dish> {
  const url = `${API_BASE_URL}/dishes`;
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({ data: dish }),
    signal,
  };
  return await fetchJson<Dish>(url, options);
}

export async function readDish(dishId: number, signal: AbortSignal): Promise<Dish> {
  const url = `${API_BASE_URL}/dishes/${dishId}`;
  return await fetchJson<Dish>(url, { signal });
}

export async function updateDish(dish: Dish, signal: AbortSignal): Promise<Dish> {
  const url = `${API_BASE_URL}/dishes/${dish.id}`;
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify({ data: dish }),
    signal,
  };
  return await fetchJson<Dish>(url, options);
}

export async function deleteDish(dishId: number, signal: AbortSignal): Promise<void> {
  const url = `${API_BASE_URL}/dishes/${dishId}`;
  const options = { method: "DELETE", signal };
  return await fetchJson<void>(url, options);
}
