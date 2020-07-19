import React from "react";
import "./style.css";
import { k, l } from "../../i18n";
import { useSelector } from "react-redux";
import * as redux from "../../redux/modules/user";
import IBox from "../../models/IBox";
import { useHistory } from "react-router-dom";

export default function BoxItem(props: any) {
  const user = useSelector(redux.selectData);
  const box = props.box as IBox;
  const history = useHistory();
  return (
    <>
      <div className="card boxitem">
        <div className="card-body">
          <h4 className="card-title">
            {box.name}{" "}
            {box.systemBox ? (
              <span className="badge badge-sharkme">{l(k.SYSTEMBOX)}</span>
            ) : null}
          </h4>
          <div
            className="divider"
            style={{
              backgroundColor:
                box.color == null || box.color == "#fff"
                  ? "#3a96bb"
                  : box.color,
            }}
          />
          <p className="card-text">{box.description}</p>

          <div className="row cardbox-btn-group">
            <div className="col-sm-10">
              <button
                type="button"
                className="btn btn-primary btn-open-cardbox"
                onClick={() => history.push("/app/box/" + box.id)}
                style={{
                  backgroundColor:
                    box.color == null || box.color == "#fff"
                      ? "#3a96bb"
                      : box.color,
                }}
              >
                {l(k.OPEN_CARD_BOX_BUTTON)}
              </button>
            </div>
            <div className="col-sm-2">
              <button className="btn btn-light" type="button">
                <i className="material-icons">delete</i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
