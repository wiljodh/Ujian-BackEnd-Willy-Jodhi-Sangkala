import React, { Component } from 'react';
import axios from 'axios';
import {Link,Redirect} from 'react-router-dom';
import Navbar from './Navbar';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
        login_customer: state.login_customer,
        id: state.id
      };
  }


class tambahsaldo extends Component {

  state={
    redirect: false
  }

    tombol(obj){
          // console.log(obj.penambahansaldo.value)
          // console.log(id)
    axios.post(`http://localhost:3002/update_saldo`,{
                  id:this.props.login_customer,
                  tambah:obj.penambahansaldo.value
                })
        }

  render() 
    {
        // console.log(this.props.id)

          // Mengecek apakah passwod sudah dan username uda benar?
            if(this.props.login_customer.length != "1"){
                {this.state.redirect= true}  
                this.props.dispatch({type:'login_customer', value2:"Rekening / Pin ada salah"});    
            }

            // Mengirm redirect jika pass dan user bukan dapat value 1
                if (this.state.redirect) {
                return <Redirect to='/'/>
                }

                return (
                    <div>
                    <Navbar />
                        <center>

                      <input type="text" ref="penambahansaldo"/>
                       
                       <Link onClick={() => { this.tombol(this.refs); }} className="btn btn-danger" to="/customerlist"> Tambah </Link>
                       <br/>
                       <Link className="btn btn-danger" to="/customerlist"> Back </Link>
                        </center>

                    </div>
                )
    }
}

export default connect(mapStateToProps)(tambahsaldo);
