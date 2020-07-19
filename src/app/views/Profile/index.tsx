import React, { useState } from "react";
import "./style.css";
import { k, l } from "../../i18n";
import { useSelector, useDispatch } from "react-redux";
import * as redux from "../../redux/modules/user";
import ChangeEmail from "./EmailChange";
import ChangeData from "./DataChange";
import PasswordChange from "./PasswordChange";

export default function Profile(props: any) {
  const user = useSelector(redux.selectData);
  const dispatch = useDispatch();
  const [useEmail, setEmail] = useState("");
  return (
    <>
      <h2>{l(k.PROFILE)}</h2>
      <br />
      <div className="row">
        <div className="col-sm-7">
          <div className="row">
            <div className="col-sm-12">
              <ChangeEmail />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-sm-12">
              <ChangeData />
            </div>
          </div>
        </div>

        <div className="col-sm-5">
          <PasswordChange />
        </div>
      </div>
    </>
  );
}
