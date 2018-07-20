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


class customerlist extends Component {
  state = {
      dataproduk: [],
      nama: "",
      id:"",
      redirect: false
  }
  componentDidMount(){
    // console.log(this.props.login_customer)
      axios.post(`http://localhost:3002/viewcustomer`,{
        id:this.props.login_customer
      }).then(
          /** Disini fungsi */
          (ambilData) => {
              console.log(ambilData.data);
              this.setState({dataproduk: ambilData.data});
          })
        }


    sendid(id){
          this.props.dispatch({type:'sendid', 
          value2:this.props.login_customer,
          })
        }

  render() 
    {
        // console.log(this.props.login_customer)

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
                          <h1>Hallo selamat datang</h1>
                       
                       <Link onClick={() => { this.sendid(); }} className="btn btn-danger" to="/tambahsaldo"> Tambah </Link>

                       <br/><br/>
                       <Link onClick={() => { this.sendid(); }} className="btn btn-warning fa fa-pencil" to="/transfer">Transfer</Link>

                        <br/><br/>
                       <Link onClick={() => { this.sendid(); }} className="btn btn-primary fa fa-pencil" to="/saldo"> Saldo anda</Link>
                        </center>


                    </div>
                )
    }
}

export default connect(mapStateToProps)(customerlist);
