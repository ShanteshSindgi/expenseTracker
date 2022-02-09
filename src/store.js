import  rootSaga  from "./rootSaga";
import { rootReducer } from "./redux/reducers";
import createSagaMiddleware from "redux-saga";
import { applyMiddleware, compose, createStore } from "redux";


const sagaMiddleware=createSagaMiddleware();
const middleware=[sagaMiddleware];
const store = compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )(createStore)(rootReducer);

  sagaMiddleware.run(rootSaga);

  export default store;