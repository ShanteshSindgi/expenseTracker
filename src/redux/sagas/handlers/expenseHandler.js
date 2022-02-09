import {call,put,takeLatest} from 'redux-saga/effects';
import { addExpenseCall } from '../requests/expenseRequests';
import * as types from './../../../types'
function* addExpense(action){
    console.log("action",action);
    try{
        yield call(addExpenseCall,action.payload);
        yield put({type:types.ADD_EXPENSE_SUCCESS,expenseStatus:200});
    }
    catch(e)
    {
        console.log("Sdsd",e);
       yield put({type:types.ADD_EXPENSE_FAILED,error:e.message,expenseStatus:500});
    }
}

export function* watchExpenseSaga(){
    console.log("In watcher");
    yield takeLatest(types.ADD_EXPENSE_REQUESTED,addExpense);
}