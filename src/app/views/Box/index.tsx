import React from "react";
import "./style.css";
import { useSelector } from "react-redux";
import * as boxRedux from "../../redux/modules/box";
import BoxItem from "./BoxItem";

export default function Box(props: any) {
  const boxs = useSelector(boxRedux.selectData);

  const rows = [...Array(Math.ceil(boxs.length / 3))];
  const boxRows = rows.map((row, idx) => boxs.slice(idx * 3, idx * 3 + 3));
  const content = boxRows.map((row, idx) => (
    <div className="row mt-4" key={idx}>
      {row.map((box) => (
        <div key={box.id} className="col-sm-4">
          <BoxItem box={box} />
        </div>
      ))}
    </div>
  ));
  return <>{content}</>;
}
