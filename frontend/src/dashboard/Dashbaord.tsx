import { useListDishesQuery, useListOrdersQuery } from "../utils/api";
import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
const { data: dishesData, error } = useListDishesQuery();
const { data: ordersData, error: ordersError } = useListOrdersQuery();

  const ordersList = ordersData?.data.map((order, index) => {
    const total = order.dishes.reduce(
      (sum, dish) => sum + dish.price * dish.quantity,
      0
    );
    return (
      <tr key={order.id}>
        <td>{index + 1}</td>
        <td>{order.deliverTo}</td>
        <td>{order.mobileNumber}</td>
        <td>$ {total}</td>
        <td>{order.status}</td>
        <td>
          <Link
            to={`/orders/${order.id}/edit`}
            className="btn btn-secondary"
            title="Edit Order"
          >
            <span className="oi oi-pencil" /> Edit
          </Link>
        </td>
      </tr>
    );
  });

  const DishesList = dishesData?.data.map((dish, index) => {
    return (
      <tr key={dish.id}>
        <td>{index + 1}</td>
        <td>{dish.name}</td>
        <td>{dish.description}</td>
        <td>$ {dish.price}</td>
        <td>
          <Link
            to={`/dishes/${dish.id}/edit`}
            className="btn btn-secondary"
            title="Edit Order"
          >
            <span className="oi oi-pencil" /> Edit
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <main>
      <h1>Dashboard</h1>
      <hr />
      <div className="row">
        <div className="col-md-12 col-lg-12 col-sm-12">
          <div className="white-box">
            <div className="d-md-flex mb-3">
              <h4 className="box-title mb-0">Orders</h4>
            </div>
            {error && "status" in error ?
             <div className="alert alert-danger m-2">
              Error: {error.status}
             </div> 
        : null}
        {ordersError && "status" in ordersError ?
             <div className="alert alert-danger m-2">
              Error: {ordersError.status}
             </div> 
        : null}
      
            {/* <ErrorAlert error={ordersError} /> */}
            <div className="table-responsive">
              <table className="table no-wrap">
                <thead>
                  <tr>
                    <th className="border-top-0">#</th>
                    <th className="border-top-0">DELIVERY ADDRESS</th>
                    <th className="border-top-0">PHONE</th>
                    <th className="border-top-0">TOTAL</th>
                    <th className="border-top-0">STATUS</th>
                  </tr>
                </thead>
                <tbody>{ordersList}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-md-12 col-lg-12 col-sm-12">
          <div className="white-box">
            <div className="d-md-flex mb-3">
              <h4 className="box-title mb-0">Dishes</h4>
            </div>
            {

              error && "status" in error ? <div className="alert alert-danger m-2">Error: {error.status}</div> : null
             
            }
            <Link to="/dishes/new" className="btn btn-primary mr-2">
              <span className="oi oi-plus" /> Create Dish
            </Link>
            <div className="table-responsive">
              <table className="table no-wrap">
                <thead>
                  <tr>
                    <th className="border-top-0">#</th>
                    <th className="border-top-0">NAME</th>
                    <th className="border-top-0">DESCRIPTION</th>
                    <th className="border-top-0">PRICE</th>
                  </tr>
                </thead>
                <tbody>{DishesList}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
