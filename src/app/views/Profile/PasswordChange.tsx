import React, { useState } from "react";
import "./style.css";
import { k, l } from "../../i18n";
import { useSelector, useDispatch } from "react-redux";
import * as redux from "../../redux/modules/user";
import ErrorBanner from "./ErrorBanner";

export default function DataChange(props: any) {
  const store = useSelector(redux.selectStore);
  const dispatch = useDispatch();
  const [useError, setError] = useState({ data: "", error: true });
  const [usePassword, setPassword] = useState("");
  const [usePassword2, setPassword2] = useState("");

  const updatePassword = (password: string, password2: string) => {
    setError({ data: "", error: true });
    if (password !== password2) {
      setError({ data: `${l(k.PASSWORD_NOT_SELF)}`, error: true });
      return;
    }
    if (password === "") {
      setError({ data: `${l(k.PASSWORD_EMPTY)}`, error: true });
      return;
    }
    dispatch(redux.updatePassword(usePassword));
  };

  return (
    <>
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">{l(k.PASSWORD_CHANGE)}</h4>
          <ErrorBanner useError={useError} />

          {store.passwordUpdateStatus === 200 ? (
            <ErrorBanner
              useError={{ data: `${l(k.PASSWORD_CHANGE)}`, error: false }}
            />
          ) : null}
          {store.passwordUpdateStatus !== 200 &&
          store.passwordUpdateStatus !== 0 ? (
            <ErrorBanner
              useError={{ data: `${l(k.PASSWORD_UPDATE_ERROR)}`, error: true }}
            />
          ) : null}
          <p className="card-text">
            <form action="">
              <div className="form-group">
                <label htmlFor="">{l(k.PASSWORD)}</label>
                <input
                  type="password"
                  name=""
                  id="fname"
                  className="form-control"
                  value={usePassword}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="">{l(k.PASSWORD_REPEAT)}</label>
                <input
                  type="password"
                  name=""
                  id="lname"
                  className="form-control"
                  value={usePassword2}
                  onChange={(e) => setPassword2(e.target.value)}
                />
              </div>
              <button
                onClick={() => updatePassword(usePassword, usePassword2)}
                type="button"
                className="btn btn-primary"
              >
                {l(k.CHANGE_BUTTON)}
              </button>
            </form>
          </p>
        </div>
      </div>
    </>
  );
}
