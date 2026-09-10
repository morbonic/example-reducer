import { useReducer } from "react";

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
};

const reducer = (state, action) => {
  if (!state.isActive && action.type !== "openAccount") return initialState;

  switch (action.type) {
    case "openAccount":
      return { ...state, isActive: true, balance: action.payload };

    case "deposit":
      return { ...state, balance: state.balance + action.payload };

    case "withdraw":
      const balance =
        state.balance >= action.payload
          ? state.balance - action.payload
          : state.balance;

      return { ...state, balance };

    case "requestLoan":
      if (state.loan > 0) return state;

      return {
        ...state,
        loan: action.payload,
        balance: state.balance + action.payload,
      };

    case "payLoan":
      return { ...state, loan: 0, balance: state.balance - state.loan };

    case "closeAccount":
      if (state.loan !== 0 && state.balance !== 0) return state;

      return initialState;

    default:
      throw new Error("Action unknown");
  }
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { balance, loan, isActive } = state;

  return (
    <div className="App">
      <h1>useReducer Bank Account</h1>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>

      <p>
        <button
          onClick={() => dispatch({ type: "openAccount", payload: 500 })}
          disabled={isActive}
        >
          Open account
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "deposit", payload: 150 })}
          disabled={!isActive}
        >
          Deposit 150
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "withdraw", payload: 50 })}
          disabled={!isActive}
        >
          Withdraw 50
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "requestLoan", payload: 5000 })}
          disabled={!isActive}
        >
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "payLoan" })}
          disabled={!isActive}
        >
          Pay loan
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "closeAccount" })}
          disabled={!isActive}
        >
          Close account
        </button>
      </p>
    </div>
  );
}
