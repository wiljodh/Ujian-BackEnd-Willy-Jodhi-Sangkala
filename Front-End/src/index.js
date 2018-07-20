import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

// Start Reducers
// InitialState fungsinya seperti state biasa
const initialState = {
    login: "",
    login_customer: "",
    id:''
  };
  
  function reducer(state = {initialState}, action) {
    switch (action.type) {
      // case for login problem
      case 'login':
        return {
          login: action.value,
        };
      // end of case login

    // case for login customer problem
      case 'login_customer':
        return {
            login_customer: action.value2,
        };
     // end of case login customer

         // case for login customer problem
         case 'sendid':
         return {
             login_customer: action.value2,
             id: action.id
         };
      // end of case login customer
  
    //  case for logout problem
    case 'logout':
    return {
    };
    // end of logout
  
      default:
        return state;
    }
  }

const store = createStore(reducer);
// End of Reducers

ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
