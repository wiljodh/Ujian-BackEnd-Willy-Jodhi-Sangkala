import React, { Component } from 'react'
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';



function mapStateToProps(state){
  return {
  login: state.login,
  login_customer: state.login_customer
  };
}


class loginadmin extends Component {
 
  state ={
    statusRedirect: false
  }
 
  fungsiLogin = (e) => {
    var self = this
   axios.post(`http://localhost:3002/login`, {
       username: e.username.value,
       password: e.password.value
      }).then((kepastian) => {
          self.props.dispatch({type:'login', value: kepastian.data,})
          self.setState({statusRedirect: true});
    })


  }


  fungsiLogincustomer = (e) => {
    var self = this
   axios.post(`http://localhost:3002/login_customer`, {
      rekening : e.rekening .value,
      kode_pin: e.kode_pin.value
      })
      .then((kepastian) => {
        var isi = kepastian.data.toString()
          self.props.dispatch({type:'login_customer', value2: isi,})
          self.setState({statusRedirect: true});
    })

  }

  render() {

    // Untuk user admin
    if(this.state.statusRedirect && this.props.login == 1){
      return <Redirect to="/adminlist"/>
    }    

    // Untuk user admin
    if(this.state.statusRedirect && this.props.login_customer > 0){
      return <Redirect to="/customerlist"/>
    }    


    return (
      <div>
<div className="container">
        <h2>Admin</h2>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="email">Email:</label>
            <div className="col-sm-10">
              <input type="text" ref="username" className="form-control" id="email" placeholder="username" name="email" />
            </div>
          </div><br/>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="pwd">Password:</label>
            <div className="col-sm-10">          
              <input type="password" ref="password" className="form-control" id="pwd" placeholder="Enter password" name="pwd" />
            </div>
          </div>
          <div className="form-group">        
            <div className="col-sm-offset-2 col-sm-10">
              <button type="submit" className="btn btn-default" onClick={() => this.fungsiLogin(this.refs)}>Submit</button>
            </div>
          </div>
      </div>
      <center>
      <p>{this.props.login}</p>
      </center>

      {/* Batasan antara customer dan user */}
      <hr/><br/>

      <div className="container">
        <h2>Customer</h2>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="email">rekening :</label>
            <div className="col-sm-10">
              <input type="text" ref="rekening" className="form-control" id="email" placeholder="nomor rekening anda" name="email" />
            </div>
          </div><br/>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="pwd">Kode pin:</label>
            <div className="col-sm-10">          
              <input type="password" ref="kode_pin" className="form-control" id="pwd" placeholder="Enter password" name="pwd" />
            </div>
          </div>
          <div className="form-group">        
            <div className="col-sm-offset-2 col-sm-10">
              <button type="submit" className="btn btn-default" onClick={() => this.fungsiLogincustomer(this.refs)}>Submit</button>
            </div>
          </div>
      </div>
      <center>
      <p>{this.props.login_customer}</p>
      </center>

      </div>
    )
  }
}

export default connect(mapStateToProps) (loginadmin);