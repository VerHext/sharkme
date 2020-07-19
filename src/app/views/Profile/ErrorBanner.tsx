import React, { useState } from "react";
import "./style.css";
import { k, l } from "../../i18n";

export default function ErrorBanner(props: any) {
  return (
    <>
      {props.useError.data != "" ? (
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
