import React from "react";
import "./style.css";

export default function ErrorBanner(props: any) {
  return (
    <>
      {props.useError.data !== "" ? (
        <div
          className={
            "alert alert-" + (props.useError.error ? "danger" : "success")
          }
          role="alert"
        >
          {props.useError.data}
        </div>
      ) : null}
    </>
  );
}
