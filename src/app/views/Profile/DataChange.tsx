import React, { useState } from "react";
import "./style.css";
import { k, l } from "../../i18n";
import { useSelector, useDispatch } from "react-redux";
import * as redux from "../../redux/modules/user";
import ErrorBanner from "./ErrorBanner";

export default function DataChange(props: any) {
  const user = useSelector(redux.selectData);
  const store = useSelector(redux.selectStore);
  const [useError, setError] = useState({ data: "", error: true });
  const dispatch = useDispatch();
  const [useFname, setFname] = useState("");
  const [useLname, setLname] = useState("");

  const updateName = () => {
    setError({ data: "", error: true });
    if (useFname == useLname) {
      setError({
        data: `${l(k.FNAME_NOT_SELF_AS_LNAME_UPDATE_ERROR)}`,
        error: true,
      });
      return;
    }
    if (useFname == "" || useLname == "") {
      setError({ data: `${l(k.NAME_EMPTY_UPDATE_ERROR)}`, error: true });
      return;
    }
    dispatch(redux.updateName(useFname, useLname));
  };

  return (
    <>
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">{l(k.CHANGE_DATA)}</h4>
          <ErrorBanner useError={useError} />

          {store.nameUpdateStatus == 200 ? (
            <ErrorBanner
              useError={{ data: `${l(k.DATA_UPDATED)}`, error: false }}
            />
          ) : null}
          {store.nameUpdateStatus != 200 && store.nameUpdateStatus != 0 ? (
            <ErrorBanner
              useError={{ data: `${l(k.DATA_UPDATED_ERROR)}`, error: true }}
            />
          ) : null}
          <p className="card-text">
            <form action="">
              <div className="form-group">
                <label htmlFor="">{l(k.FNAME)}</label>
                <input
                  type="text"
                  name=""
                  id="fname"
                  className="form-control"
                  placeholder={user.fname}
                  value={useFname}
                  onChange={(e) => setFname(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="">{l(k.LNAME)}</label>
                <input
                  type="text"
                  name=""
                  id="lname"
                  className="form-control"
                  placeholder={user.lname}
                  value={useLname}
                  onChange={(e) => setLname(e.target.value)}
                />
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => updateName()}
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
