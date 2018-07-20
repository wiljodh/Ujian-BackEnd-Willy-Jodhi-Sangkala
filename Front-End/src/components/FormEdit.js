import React, { Component } from 'react';
import axios from 'axios';
import { Redirect,Link } from 'react-router-dom';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
        login: state.login,
      };
  }

class FormEdit extends Component {
  state = {
    nama : "",
    email : "",
    alamat : "",
    nomor_hp : "",
    gander : "",
    birthday : "",
    statusRedirect: false
  }
//   Untuk munculkan data yang mengandung id yg di tujuh di database
  componentDidMount(){
      var id = this.props.location.state.id;
        // console.log(id)

      axios.get('http://localhost:3002/getdata/'+id).then(
          (hasilAmbil) => {
          console.log(hasilAmbil.data);
          this.setState({
            nama : hasilAmbil.data[0].nama,
            email : hasilAmbil.data[0].email,
            alamat : hasilAmbil.data[0].alamat,
            nomor_hp : hasilAmbil.data[0].nomor_hp,
            gander : hasilAmbil.data[0].gander,
            birthday : hasilAmbil.data[0].birthday,
            id: hasilAmbil.data[0].id,
          });
          
      }
      );
  }

  value = (e) => {
    axios.post('http://localhost:3002/updatedata', {
        nama : e.nama.value,
        email : e.email.value,
        alamat : e.alamat.value,
        nomor_hp : e.nomor_hp.value,
        gander : e.gander.value,
        birthday : e.birthday.value,
        id: e.idproduk.value
    })
  }

  render() {

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

      <div>
    <div className="container">
        <h2>Tambah Customer Baru</h2>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="email">Nama :</label>
            <div className="col-sm-10">
              <input type="text" defaultValue={this.state.nama} ref="nama" className="form-control" id="email" placeholder="nama" name="email" />
            </div>
          </div><br/>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="email">Email:</label>
            <div className="col-sm-10">
              <input type="text" ref="email" defaultValue={this.state.email} className="form-control" id="email" placeholder="email" name="email" />
            </div>
          </div><br/>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="email">alamat :</label>
            <div className="col-sm-10">
              <input type="text" ref="alamat" defaultValue={this.state.alamat} className="form-control" id="email" placeholder="alamat" name="email" />
            </div>
          </div><br/>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="email">Nomor hp:</label>
            <div className="col-sm-10">
              <input type="text" ref="nomor_hp" defaultValue={this.state.nomor_hp}  className="form-control" id="email" placeholder="nomor hp" name="email" />
            </div>
          </div><br/>
          
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="email">birthday :</label>
            <div className="col-sm-10">
              <input type="text" ref="birthday" defaultValue={this.state.birthday} className="form-control" id="email" placeholder="ulta kamu" name="email" />
            </div>
          </div><br/>

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
          <input type="hidden" className="form-control" ref="idproduk" defaultValue={this.state.id}/>            
            {/* Letak tombol dimulai */}
            <div className="col-sm-offset-2 col-sm-10">
              <Link to="/adminlist" type="submit" className="btn btn-default" onClick={() => this.value(this.refs)}>Submit</Link>
            </div>
          </div>
      </div>
      
      </div>
        </div>
    )
  }
}
export default connect(mapStateToProps)(FormEdit);