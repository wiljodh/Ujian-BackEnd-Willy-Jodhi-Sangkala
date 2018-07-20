import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
      login: state.login,
    };
}

class Navbar extends Component {
  
  logut(){
    this.props.dispatch({type:'logout',},);
  } 

  render() {
    return (
      <div>
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-2">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
              <a className="navbar-brand" href="#">Bank Mr.Ade</a>
            </div>

            {/* disini terdapat tombol log out */}
              <ul className="nav navbar-nav navbar-right">
                <li><Link onClick={()=>{this.logut();}} to="/">LogOut</Link></li>
              </ul>
          </div>
        </nav>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Navbar);
