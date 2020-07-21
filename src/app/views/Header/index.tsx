import React from "react";
import "./style.css";
import { k, l } from "../../i18n";
import { useSelector } from "react-redux";
import * as reduxUser from "../../redux/modules/user";
import Logout from "./LogoutItem";
import { Link } from "react-router-dom";

export default function Header(props: any) {
  const data = useSelector(reduxUser.selectData);

  return (
    <nav className="navbar navbar-light navbar-expand-md navigation-clean blueHeader">
      <div className="container">
        <Link className={"navbar-brand"} to={"/"}>
          <img src="/images/logo-03.png" />
        </Link>

        <button
          data-toggle="collapse"
          className="navbar-toggler"
          data-target="#navcol-1"
        >
          <span className="sr-only">Toggle navigation</span>
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navcol-1">
          <ul className="nav navbar-nav ml-auto">
            <li className="nav-item" role="presentation">
              <Link to={"/app/box"} className="nav-link">
                <i className="material-icons">inbox</i>
                {l(k.CARD_BOX)}
              </Link>
            </li>
            <li className="nav-item" role="presentation">
              <Link to={"/"} className="nav-link">
                <i className="material-icons">sentiment_very_satisfied</i>
                {l(k.LEARN)}
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="dropdown-toggle nav-link avatar-link"
                data-toggle="dropdown"
                aria-expanded="false"
                href="/"
              >
                <img
                  className="rounded-circle avatar"
                  alt="avatar"
                  src={
                    "https://avatar.support-pp.de/avatar?size=128&amp;name=" +
                    data.fname +
                    "980"
                  }
                />
              </a>
              <div className="dropdown-menu" role="menu">
                <Link className={"dropdown-item"} to={"/app/profile"}>
                  {data.fname + " " + data.lname}
                </Link>
                <Link className="dropdown-item" role="presentation" to="">
                  Second Item
                </Link>
                <Logout />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
