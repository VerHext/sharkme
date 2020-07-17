import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as redux from "../../redux/modules/counter";
import styles from "./Counter.module.css";

export function Counter() {
  const count = useSelector(redux.selectCount);
  const data = useSelector(redux.selectData);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState("2");

  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(redux.increment())}
        >
          +
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(redux.decrement())}
        >
          -
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() =>
            dispatch(redux.incrementByAmount(Number(incrementAmount) || 0))
          }
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
          onClick={() =>
            dispatch(redux.incrementAsync(Number(incrementAmount) || 0))
          }
        >
          Add Async
        </button>

        <button
          className={styles.button}
          onClick={() => dispatch(redux.getApi())}
        >
          API REQUEST
        </button>
        <p> {JSON.stringify(data)}</p>
      </div>
    </div>
  );
}
