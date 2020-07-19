import React from "react";
import "./style.css";
import { k, l } from "../../i18n";
import { useSelector } from "react-redux";
import * as boxRedux from "../../redux/modules/box";
import BoxItem from "./BoxItem";

export default function Box(props: any) {
  const boxs = useSelector(boxRedux.selectData);

  // array of N elements, where N is the number of rows needed
  const rows = [...Array(Math.ceil(boxs.length / 3))];
  // chunk the products into the array of rows
  const boxRows = rows.map((row, idx) => boxs.slice(idx * 3, idx * 3 + 3));
  // map the rows as div.row
  const content = boxRows.map((row, idx) => (
    <div className="row mt-4" key={idx}>
      {row.map((box) => (
        <div className="col-sm-4">
          <BoxItem box={box} />
        </div>
      ))}
    </div>
  ));
  return <>{content}</>;
}
