import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {applyMiddleware, createStore} from "redux"
import {Provider} from "react-redux"
import thunk from "redux-thunk"
import rootReducers from "./redux/reducers/rootReducers"


const masterStore = createStore(rootReducers, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store = {masterStore}>
    <App />
  </Provider>,
  document.getElementById('root')
);