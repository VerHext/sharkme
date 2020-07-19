import React, { useState } from "react";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import * as boxRedux from "../../redux/modules/box";

export default function CardSearch(props: any) {
  const [useValue, setValue] = useState("");
  const store = useSelector(boxRedux.selectStore);
  const dispatch = useDispatch();
  return (
    <>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={store.search}
          onChange={(e) => dispatch(boxRedux.setSearch(e.target.value))}
        />
        <div className="input-group-append">
          <span className="input-group-text">
            <i className="material-icons">search</i>
          </span>
        </div>
      </div>
    </>
  );
}
