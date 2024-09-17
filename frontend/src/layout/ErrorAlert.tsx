import React from "react";
import { ErrorAlertProps } from "../types/types";

function ErrorAlert({ error: error }: ErrorAlertProps) {
  return (
    error && (
      <div className="alert alert-danger m-2">Error: {error.message}</div>
    )
  );
}

export default ErrorAlert;
