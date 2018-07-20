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


class show extends Component {
  state = {
      dataproduk: [],
  }
  componentDidMount(){
      axios.get(`http://localhost:3002/allviewcustomer`).then(
          /** Disini fungsi */
          (ambilData) => {
              console.log(ambilData.data);
              this.setState({dataproduk: ambilData.data});
          })
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



        const hasil = this.state.dataproduk.map((isi, urutan) => 
            {
                var urut = urutan + 1;
                var id = isi.id;
                var nama = isi.nama;
                var email = isi.email;
                var alamat = isi.alamat
                
                return  <tr key={urutan} style={{textAlign: 'center'}}>
                            <td>{urut}</td>
                            <td>{nama}</td>
                            <td>{email}</td>
                            <td>{alamat}</td>
                            <td>
                                <Link to={{pathname: '/editdata', state: {id:id}}} 
                                    className="btn btn-warning"><i className="fa fa-pencil"></i> Edit</Link>&nbsp;
                                {/* <button className="btn btn-danger btn-md"><i className="fa fa-trash"></i> Delete</button> */}
                            </td>
                        </tr>
            }
        );
                return (
                    <div>
                    <Navbar />
                    <div className="container">
                    <Link className="btn btn-danger" to="/adminlist"> Back </Link><br/>
                        <table className="table table-striped table-hover table-bordered">
                            <thead>
                                <tr style={{backgroundColor: ''}}>
                                    <th style={{textAlign: 'center'}}>Nomor</th>
                                    <th style={{textAlign: 'center'}}>Alamat</th>
                                    <th style={{textAlign: 'center'}}>Email</th>
                                    <th style={{textAlign: 'center'}}>Alamat</th>
                                    <th style={{textAlign: 'center'}}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Looping dimulai dari sini */}
                                {hasil}
                            </tbody>
                        </table>
                    </div>
                    </div>
                )
    }
}

export default connect(mapStateToProps)(show);
