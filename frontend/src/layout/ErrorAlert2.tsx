import React from "react";
// import { ErrorAlertProps2 } from "../types/types";
import { useListDishesQuery } from "../utils/api";

function ErrorAlert2() {
const { error } = useListDishesQuery();


  if (error) {
    if ("status" in error) {
      return <div className="alert alert-danger m-2">Error: {error.status}</div>;
    }
  };

  return null
  // return (
  //   error && (
  //     <div className="alert alert-danger m-2">Error: {error.message}</div>
  //   )
  // );
}

export default ErrorAlert2;
