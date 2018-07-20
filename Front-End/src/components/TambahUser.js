import React, { Component } from 'react'
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
        login: state.login,
      };
  }

class tambahuser extends Component {
 
  state ={
    statusRedirect: false,
    redirect: false,
    status: ""
  }
 
  fungsiLogin = (e) => {
    // var self = this
   axios.post(`http://localhost:3002/tambahcustomer`, {
    nama : e.nama.value,
    email : e.email.value,
    alamat : e.alamat.value,
    nomor_hp : e.nomor_hp.value,
    gander : e.gander.value,
    birthday : e.birthday.value,
    rekening : e.rekening.value,
    kode_pin : e.kode_pin.value,
      })
      .then((respon) => {
        if(respon.data === 'berhasil'){
            this.setState({
                statusRedirect: true
            });
        }else{
          this.setState({status: "Nomor rekening anda sama dengan yang lain mohon dinganti"});
        }
    })
  }

  render() {

    // Mengecek apakah passwod sudah dan username uda benar?
    if (this.props.login != "1") {
      { this.state.redirect = true }
      this.props.dispatch({ type: 'login', value: "Username /Password anda salah" });
    }

    if(this.state.statusRedirect){
      return <Redirect to="/adminlist"/>
    }


    return (
      <div>
<div className="container">
        <h2>Tambah Customer Baru</h2>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="email">Nama :</label>
            <div className="col-sm-10">
              <input type="text" ref="nama" className="form-control" id="email" placeholder="nama" name="email" />
            </div>
          </div><br/>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="email">Email:</label>
            <div className="col-sm-10">
              <input type="text" ref="email" className="form-control" id="email" placeholder="email" name="email" />
            </div>
          </div><br/>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="email">alamat :</label>
            <div className="col-sm-10">
              <input type="text" ref="alamat" className="form-control" id="email" placeholder="alamat" name="email" />
            </div>
          </div><br/>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="email">Nomor hp:</label>
            <div className="col-sm-10">
              <input type="text" ref="nomor_hp" className="form-control" id="email" placeholder="nomor hp" name="email" />
            </div>
          </div><br/>
          

          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="email">birthday :</label>
            <div className="col-sm-10">
              <input type="text" ref="birthday" className="form-control" id="email" placeholder="ulta kamu" name="email" />
            </div>
          </div><br/>

          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="email">rekening :</label>
            <div className="col-sm-10">
              <input type="text" ref="rekening" className="form-control" id="email" placeholder="rekening" name="email" min="5" />
            </div>
          </div><br/>

          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="email">Kode pin :</label>
            <div className="col-sm-10">
              <input type="text" ref="kode_pin" className="form-control" id="email" placeholder="Kode Pin" name="email" min="5" />
            </div>
          </div>
        <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="pwd">gander:</label>
            <div className="col-sm-10">          
            <select ref="gander">
            <option value="pria">pria</option>
            <option value="wanita">wanita</option>
            </select>
            </div>
          </div>  
          <div className="form-group">        
            
            {/* Letak tombol dimulai */}
            <div className="col-sm-offset-2 col-sm-10">
              <button type="submit" className="btn btn-default" onClick={() => this.fungsiLogin(this.refs)}>Submit</button>
            </div>
          </div>
      </div>
      
      <center>
      <h3> {this.state.status}</h3>
      </center>
      
      </div>
    )
  }
}

export default connect(mapStateToProps)(tambahuser);