import React, { Component } from 'react';
import axios from 'axios';
import {Link,Redirect} from 'react-router-dom';
import Navbar from './Navbar';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
        login: state.login,
      };
  }


class adminlist extends Component {
  state = {
      dataproduk: [],
  }

  render() 
    {
        // console.log(this.props.login)

          // Mengecek apakah passwod sudah dan username uda benar?
            if(this.props.login != "1"){
                {this.state.redirect= true}  
                this.props.dispatch({type:'login', value:"Username /Password anda salah"});    
            }

            // Mengirm redirect jika pass dan user bukan dapat value 1
                if (this.state.redirect) {
                return <Redirect to='/'/>
                }

                return (
                    <div>
                    <Navbar />
                    <center>
                        <h1> Welcome to our admin Page</h1>
                    <Link className="btn btn-danger" to="/tambahuser"> Tambah </Link> &nbsp;&nbsp;
                    <Link className="btn btn-warning" to="/show"> Showall </Link>
                    </center>

                    </div>
                )
    }
}

export default connect(mapStateToProps)(adminlist);
