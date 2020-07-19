import React, { useEffect } from "react";
import "./style.css";
import { k, l } from "../../i18n";
import { useSelector } from "react-redux";
import * as boxRedux from "../../redux/modules/box";
import IBox from "../../models/IBox";
import { useHistory } from "react-router-dom";

export default function CardList(props: any) {
  const history = useHistory();
  const id = window.location.pathname.replace("/app/box/", "");
  console.log("ID :: " + id);
  const boxs = useSelector(boxRedux.selectData);
  const box = boxs.filter((box) => box.id == id);

  useEffect(() => {});
  return (
    <>
      <h1>CARD LIST</h1>
      <p>iD :: </p>
      <table className="table">
        <thead>
          <tr>
            <th>Deutsch</th>
            <th>Englisch</th>
            <th>Aktionen</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td scope="row"></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td scope="row"></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
