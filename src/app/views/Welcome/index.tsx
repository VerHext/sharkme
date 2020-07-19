import React from "react";
import "./style.css";
import { k, l } from "../../i18n";
import { useSelector } from "react-redux";
import * as redux from "../../redux/modules/user";

export default function Welcome(props: any) {
  const user = useSelector(redux.selectData);
  return (
    <>
      <div className="row">
        <div className="col-sm-7">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">{l(k.WELCOME, user.fname)}</h4>

              <p className="card-text">
                {l(k.WELCOME_TXT, user.fname)}{" "}
                <a
                  href={encodeURI(
                    "mailto:support@klexhub.com?subject=" +
                      l(k.EMAIL_SUPPORT_SUBJECT) +
                      "&body=" +
                      l(k.EMAIL_SUPPORT_TEXT, user.fname, user.lname, user.id)
                  )}
                >
                  E-Mail{" "}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
