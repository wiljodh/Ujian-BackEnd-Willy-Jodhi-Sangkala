import React, { Component } from 'react';
import {Route} from 'react-router-dom';

import LoginAdmin from './components/LoginAdmin';
import AdminList from './components/AdminList';
import TambahUser from './components/TambahUser';
import FormEdit from './components/FormEdit';
import Saldo from './components/s/';
import TambahSaldo from './components/TambahSaldo';
import Transfer from './components/Transfer';
import CustomerList from './components/CustomerList';
import Show from './components/Show';

import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        
        
        <Route exact path="/" component={loginadmin} />
        {/* awal dari komponen untuk user(admin) */}
        <Route path="/adminlist" component={adminlist} />
        <Route path="/tambahuser" component={tambahuser} />
        <Route path="/editdata" component={FormEdit}/>       
        <Route path="/show" component={show}/>       
        {/* awal dari komponen untuk user(customer) */}
        <Route path="/customerlist" component={customerlist} />
        <Route path="/saldo" component={saldo} />
        <Route path="/tambahsaldo" component={tambahsaldo} />
        <Route path="/transfer" component={transfer} />
 
      </div>
    );
  }
}

export default App;
