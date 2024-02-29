const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";


const headers = new Headers();
headers.append("Content-Type", "application/json");

async function fetchJson(url, options) {
  try {
    const response = await fetch(url, options);

    if (response.status === 204) {
      return null;
    }

    const payload = await response.json();

    if (payload.error) {
      return Promise.reject({ message: payload.error });
    }
    return payload.data;
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error(error.stack);
      throw error;
    }
  }
}

export async function listDishes(signal) {
  const url = `${API_BASE_URL}/dishes`;
  return await fetchJson(url, { signal });
}

export async function createOrder(order, signal) {
  const url = `${API_BASE_URL}/orders`;
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({ data: order }),
    signal,
  };
  return await fetchJson(url, options);
}

export async function readOrder(orderId, signal) {
  const url = `${API_BASE_URL}/orders/${orderId}`;
  return await fetchJson(url, { signal });
}

export async function listOrders(signal) {
  const url = `${API_BASE_URL}/orders`;
  return await fetchJson(url, { signal });
}

export async function updateOrder(order, signal) {
  const url = `${API_BASE_URL}/orders/${order.id}`;
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify({ data: order }),
    signal,
  };
  return await fetchJson(url, options);
}

export async function deleteOrder(orderId, signal) {
  const url = `${API_BASE_URL}/orders/${orderId}`;
  const options = { method: "DELETE", signal };
  return await fetchJson(url, options);
}

export async function createDish(dish, signal) {
  const url = `${API_BASE_URL}/dishes`;
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({ data: dish }),
    signal,
  };
  return await fetchJson(url, options);
}

export async function readDish(dishId, signal) {
  const url = `${API_BASE_URL}/dishes/${dishId}`;
  return await fetchJson(url, { signal });
}

export async function updateDish(dish, signal) {
  const url = `${API_BASE_URL}/dishes/${dish.id}`;
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify({ data: dish }),
    signal,
  };
  return await fetchJson(url, options);
}

export async function deleteDish(dishId, signal) {
  const url = `${API_BASE_URL}/dishes/${dishId}`;
  const options = { method: "DELETE", signal };
  return await fetchJson(url, options);
}
