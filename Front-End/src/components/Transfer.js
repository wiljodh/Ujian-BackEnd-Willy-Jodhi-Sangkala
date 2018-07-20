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


class transfer extends Component {

  state={
    redirect: false,
    status:""
  }

    tombol(obj){
          // console.log(obj.penambahansaldo.value)
          // console.log(id)
    axios.post(`http://localhost:3002/kirim_rekening`,{
                  id:this.props.login_customer,
                  nominal:obj.mengirim.value,
                  kerekening:obj.kerekening.value
                }).then((respon) => {
                  if(respon.data === 'berhasil'){
                      this.setState({
                        redirect: true
                      });
                  }else{
                    this.setState({status: "Nomor rekening tidak terdaftar/ saldo anda tidak cukup"});
                  }
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
                return <Redirect to='/customerlist'/>
                }

                return (
                    <div>
                    <Navbar />
                        <center>
                      <h1> Rekening yang anda tujui</h1>
                      <input type="text" ref="kerekening" placeholder="Rekening yang anda tujui"/>
                      <h1> Jumlah nominal yang mau dikirim</h1>
                      <input type="number" ref="mengirim" placeholder="Sebanyak berapa"/><br/>
                       
                       <button onClick={() => { this.tombol(this.refs); }} className="btn btn-danger"> kirim </button>
                       <br/><br/>

                       <Link className="btn btn-warning" to="/customerlist"> Back(tidak jadi) </Link>
                        </center>

                      <br/><br/><br/>
                          <center>
                        <h3> {this.state.status}</h3>
                        </center>

                    </div>
                )
    }
}

export default connect(mapStateToProps)(transfer);
