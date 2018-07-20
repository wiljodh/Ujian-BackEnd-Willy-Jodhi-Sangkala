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


class saldo extends Component {
  state = {
      dataproduk: [],
      saldo: "",
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
              this.setState({saldo: ambilData.data[0].saldo});
          })
        }


  render() 
    {
        // console.log(this.props.id)

          // // Mengecek apakah passwod sudah dan username uda benar?
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
                          <h1>Sisah saldo anda</h1>
                          <h1>Rp.{this.state.saldo}</h1>
                       <Link className="btn btn-danger" to="/customerlist"> Back </Link>
                        </center>


                    </div>
                )
    }
}

export default connect(mapStateToProps)(saldo);
