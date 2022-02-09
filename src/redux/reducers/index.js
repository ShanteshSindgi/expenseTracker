import { expenseReducer } from "./expenseReducer";
import { combineReducers } from "redux";
import { transactionReducer } from "./transactionsReducer";
export const rootReducer =
    combineReducers({
        expenseReducer,
        transactionReducer
    });

