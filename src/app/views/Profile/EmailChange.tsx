import React, { useState, useMemo } from "react";
import "./style.css";
import { k, l } from "../../i18n";
import { useSelector, useDispatch } from "react-redux";
import * as redux from "../../redux/modules/user";
import ErrorBanner from "./ErrorBanner";

export default function EmailChange(props: any) {
  const user = useSelector(redux.selectData);
  const store = useSelector(redux.selectStore);
  const dispatch = useDispatch();
  const [useEmail, setEmail] = useState("");
  const [useError, setError] = useState({ data: "", error: true });

  const updateEmail = () => {
    setError({ data: "", error: true });
    if (useEmail == "") {
      setError({ data: `${l(k.EMAIL_EMPTY)}`, error: true });
      return;
    }
    dispatch(redux.updateEmail(useEmail));
  };
  return (
    <>
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">{l(k.CHANGE_EMAIL)}</h4>
          <ErrorBanner useError={useError} />

          {store.emailUpdateStatus == 200 ? (
            <ErrorBanner
              useError={{ data: `${l(k.EMAIL_UPDATED)}`, error: false }}
            />
          ) : null}
          {store.emailUpdateStatus != 200 && store.emailUpdateStatus != 0 ? (
            <ErrorBanner
              useError={{ data: `${l(k.EMAIL_UPDATE_ERROR)}`, error: true }}
            />
          ) : null}
          <p className="card-text">
            <form action="">
              <div className="form-group">
                <label htmlFor="">E-Mail</label>
                <input
                  type="email"
                  name=""
                  id="email"
                  className="form-control"
                  placeholder={user.email}
                  value={useEmail}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => updateEmail()}
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
