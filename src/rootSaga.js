import { all } from "redux-saga/effects";
import { watchExpenseSaga } from "./redux/sagas/handlers/expenseHandler";
import { watchTransactionsSaga } from "./redux/sagas/handlers/transactionsHandler";

export default function* rootSaga(){
   console.log("in root saga");
   yield all([watchExpenseSaga(),watchTransactionsSaga()])
}