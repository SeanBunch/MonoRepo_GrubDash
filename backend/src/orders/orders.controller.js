const path = require("path");

// Use the existing order data
const orders = require(path.resolve("src/data/orders-data"));

// Use this function to assigh ID's when necessary
const nextId = require("../utils/nextId");

// TODO: Implement the /orders handlers needed to make the tests pass

function bodyDataCheck(propertyName) {
  return function (req, res, next) {
    const { data = {} } = req.body;
    if (data[propertyName]) {
      return next();
    }
    next({
      status: 400,
      message: `Order must include a ${propertyName}`,
    });
  };
}

function validateDishes(req, res, next) {
  const { data: { dishes } = {} } = req.body;
  if (dishes.length === 0 || !Array.isArray(dishes)) {
    next({
      status: 400,
      message: `Order must include at least one dish`,
    });
  }
  return next();
}

function quantityExists(req, res, next) {
  const { data: { dishes } = {} } = req.body;
  const index = dishes.findIndex(
    (dish) =>
      !dish.quantity || typeof dish.quantity != "number" || dish.quantity <= 0
  );
  if (index >= 0) {
    next({
      status: 400,
      message: `Dish ${index} must have a quantity that is an integer greater than 0`,
    });
  }
  return next();
}

function quantityIsNumber(req, res, next) {
  const { data: { dishes } = {} } = req.body;
  const index = dishes.findIndex((dish) => isNaN(dish.quantity));
  if (index >= 0) {
    next({
      status: 400,
      message: `Dish ${index} must have a quantity that is an integer greater than 0`,
    });
  }
  return next();
}

function orderExists(req, res, next) {
  const { orderId } = req.params;
  const foundOrder = orders.find((order) => order.id === orderId);
  if (foundOrder) {
    res.locals.order = foundOrder;
    return next();
  }
  next({
    status: 404,
    message: `Order not found: ${orderId}`,
  });
}

function status(req, res, next) {
  const { data: { status } = {} } = req.body;
  const validStatus = ["pending", "preparing", "out-for-delivery", "delivered"];
  if (validStatus.includes(status)) {
    return next();
  }
  next({
    status: 400,
    message: `Order must have a status of pending, preparing, out-for-delivery, delivered`,
  });
}

function orderDelivered(req, res, next) {
  const { data: { status } = {} } = req.body;
  if (status === "delivered") {
    next({
      status: 400,
      message: `A delivered order cannot be changed`,
    });
  }
  return next();
}

function deleteValidator(req, res, next) {
  const { order } = res.locals;
  if (order.status === "pending") {
    return next();
  }
  next({
    status: 400,
    message: `An order cannot be deleted unless it is pending`,
  });
}

function create(req, res, next) {
  const { data: { deliverTo, mobileNumber, status, dishes } = {} } = req.body;
  const newId = nextId();
  const newOrder = {
    id: newId,
    deliverTo,
    mobileNumber,
    dishes,
  };
  orders.push(newOrder);
  res.status(201).json({ data: newOrder });
}

function read(req, res, next) {
  const { orderId } = req.params;
  const foundOrder = orders.find((order) => orderId === order.id);
  res.json({ data: foundOrder });
}

function update(req, res, next) {
  const { orderId } = req.params;
  const { data: { id, deliverTo, mobileNumber, status, dishes } = {} } =
    req.body;

  if (!id || orderId === id) {
    const updatedOrder = {
      id: orderId,
      deliverTo,
      mobileNumber,
      status,
      dishes,
    };
    res.json({ data: updatedOrder });
  }
  next({
    status: 400,
    message: `Order id does not match route id. Order: ${id}, route: ${orderId}`,
  });
}

function destroy(req, res, next) {
  const { orderId } = req.params;
  const index = orders.findIndex((order) => order.id === orderId);
  if (index >= 0) {
    orders.splice(index, 1);
  }
  res.sendStatus(204);
}

function list(req, res, next) {
  res.json({ data: orders });
}

module.exports = {
  create: [
    bodyDataCheck("deliverTo"),
    bodyDataCheck("mobileNumber"),
    bodyDataCheck("dishes"),
    validateDishes,
    quantityExists,
    quantityIsNumber,
    create,
  ],
  list,
  read: [orderExists, read],
  update: [
    orderExists,
    bodyDataCheck("deliverTo"),
    bodyDataCheck("mobileNumber"),
    bodyDataCheck("status"),
    bodyDataCheck("dishes"),
    validateDishes,
    quantityExists,
    quantityIsNumber,
    status,
    orderDelivered,
    update,
  ],
  delete: [orderExists, deleteValidator, destroy],
};
