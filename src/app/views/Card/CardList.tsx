import React, { useEffect, useState } from "react";
import "./style.css";
import * as boxRedux from "../../redux/modules/box";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CardSearch from "./CardSearch";
import ICard from "../../models/ICard";
import { k, l } from "../../i18n";

export default function CardList(props: any) {
  const history = useHistory();
  const store = useSelector(boxRedux.selectStore);
  const dispatch = useDispatch();
  const [useCars, setCards] = useState([] as ICard[]);

  useEffect(() => {
    dispatch(boxRedux.setSearch(""));
    setCards(store.cards);
  }, [store.cards]);

  useEffect(() => {
    try {
      setCards(
        store.cards.filter((card) =>
          card.question.toString().startsWith(store.search)
        )
      );
    } catch (e) {
      setCards(store.cards);
    }
  }, [store.search]);

  useEffect(() => {
    dispatch(
      boxRedux.getAllCardsByBox(
        history.location.pathname.replace("/app/box/", "")
      )
    );
  }, []);

  return (
    <>
      <div className="vokTable">
        <CardSearch />
        <div className="count">
          0 {l(k.FROM)} {useCars.length}
        </div>

        <table className="table" data-click-to-select="true">
          <thead className="thead-light">
            <tr>
              <th>
                <input
                  type="checkbox"
                  className="singlechkbox"
                  name="username"
                  value="1"
                />
              </th>
              <th>Deutsch</th>
              <th>Englisch</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {useCars.map((card, i) => {
              return (
                <tr key={card.id} onClick={(e) => console.log(e)}>
                  <td>
                    <input
                      type="checkbox"
                      aria-label="Checkbox for following text input"
                    />
                  </td>
                  <td>{card.question}</td>
                  <td>{card.answer}</td>
                  <td>
                    <button className="btn btn-light" type="button">
                      <i className="material-icons">edit</i>
                    </button>
                    {"  "}
                    <button className="btn btn-light" type="button">
                      <i className="material-icons">delete</i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
