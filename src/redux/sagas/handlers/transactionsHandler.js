import { put, call, takeLatest } from "redux-saga/effects"
import * as types from '../../../types'
import { fetchTransactions } from "../requests/transactionsRequests"


function* fetchTransactionApi(action) {
    try {
        const transactions = yield call(fetchTransactions,action.payload);
        yield put({ type: types.GET_TRANSACTIONS_SUCCESS, records: transactions });
    }
    catch (e) {
        console.log("e",e);
        yield put({ type: types.GET_TRANSACTIONS_FAILED, error: e.message,records:undefined });
    }
}




export function* watchTransactionsSaga() {
    yield takeLatest(types.GET_TRANSACTIONS_REQUESTED, fetchTransactionApi)
}