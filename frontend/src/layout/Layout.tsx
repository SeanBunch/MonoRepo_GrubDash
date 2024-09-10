import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Menu from "./Menu";
import { Redirect, Route, Switch } from "react-router-dom";

import Home from "../home/Home";
import OrderCreate from "../orders/OrderCreate";
import OrderEdit from "../orders/OrderEdit";
import DishEdit from "../dishes/DishEdit";
import DishCreate from "../dishes/DishCreate";
import Dashboard from "../dashboard/Dashbaord";
import OrderConfirmed from "../orders/OrderComfirmed";
import { useSelector } from "react-redux";

function Layout() {
  const cart = useSelector((state: any) => state.cart);

  return (
    <>
      <Header />
      <Menu
        cartCount={cart.dishes.reduce(
          (sum: number, dish: { quantity: number }) => sum + (dish.quantity ?? 0), 0)
                  }
      />
      <div className="container">
        <Switch>
          <Route exact={true} path="/orders">
            <Redirect to={"/dashboard"} />
          </Route>
          <Route exact={true} path="/dishes">
            <Redirect to={"/dashboard"} />
          </Route>
          <Route path="/orders/new">
            <OrderCreate
              // order={order}
              // setOrder={setOrder}
            />
          </Route>
          <Route path="/orders/:orderId/confirmed">
            <OrderConfirmed />
          </Route>
          <Route path="/orders/:orderId/edit">
            <OrderEdit />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/dishes/:dishId/edit">
            <DishEdit />
          </Route>
          <Route path="/dishes/new">
            <DishCreate />
          </Route>
          <Route exact={true} path="/">
            <Home />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
