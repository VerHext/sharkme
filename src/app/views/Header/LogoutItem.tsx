import React from "react";
import "./style.css";
import { k, l } from "../../i18n";
import { keycloakClient } from "../../utils";
import { Link } from "react-router-dom";

export default function Logout(props: any) {
  return (
    <Link
      className={"dropdown-item"}
      to={""}
      onClick={() => keycloakClient.logout()}
    >
      {l(k.LOGOUT)}
    </Link>
  );
}
