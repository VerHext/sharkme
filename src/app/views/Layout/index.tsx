import React from "react";
import Header from "../Header";
import "./material-icons.css";
import "./layout.css";
import { Counter } from "../../features/counter/Counter";

export default function Layout(props: any) {
  console.log(props);
  return (
    <div className="body">
      <Header />
      <div className="container mt-5">{props.content}</div>
    </div>
  );
}
