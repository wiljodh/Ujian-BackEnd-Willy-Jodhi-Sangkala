var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var url = bodyParser.urlencoded({ extended: false })

const mysql = require('mysql');
const crypto = require('crypto');
const secret = 'abcdefg';

const fileUpload = require('express-fileupload');
app.use(fileUpload());

// include ini untuk bisa menampilkan semua file foto di public
app.use(express.static(__dirname));
///////////////////////////////////////////////////////////////

// Untuk membuat unic id (permili second)
var uniqid = require('uniqid');
/////////////////////////////////////////////


// untuk include cors (semua orang bisa akses)
var cors = require('cors')
app.use(cors());

// boddy parser yang kita terima berbentuk jason dari react jadi harus di include
app.use(bodyParser.json());


const db = mysql.createConnection({
  host: 'localhost',
  port: '3307',
  user: 'root',
  password: 'usbw',
  database: 'bank_ade'
});

db.connect();


///////////////////////// Star for user////////////////////// 

//Login form

app.post('/login', function (req, res) {

  // console.log(req.body.username)
  // console.log(req.body.password)

  var sql = `SELECT * FROM admin`;
  db.query(sql, (error, result) => {
    if (error) {
      throw error;
    } else {
      var username = req.body.username;
      var password = req.body.password;

      for (var i = 0; i < result.length; i++) {
        if (username === result[i].username && password === result[i].password) {
          var status = "1";
          res.send(status);
          break;
        } else if (i === result.length - 1) {
          res.send("2");
        }
      }
    }
  });
})


app.post('/tambahcustomer', function (req, res) {

  // console.log(req.body.gander)
  // console.log(req.body.nama)
  // console.log(req.body.rekening)
  var rekening = req.body.rekening
  var sql = `SELECT * FROM customer`;
  db.query(sql, (error, result) => {
    for (var i = 0; i < result.length; i++) {
      if (rekening == result[i].rekening) {
        var status = 'adasama';
        // res.send(status)
        break;
      }
      else if (i === result.length - 1) {
        var status = 'tidaksama';
        // varres.send(status)
      }
    }

    // console.log(status);
    if (status != "adasama") {

      var data = {
        nama: req.body.nama,
        email: req.body.email,
        alamat: req.body.alamat,
        nomor_hp: req.body.nomor_hp,
        gander: req.body.gander,
        birthday: req.body.birthday,
      };
      var sql = 'INSERT INTO customer_ditel SET ?';
      db.query(sql, data, (err, result) => {
        if (err) throw err;
        console.log(result);
      });

      var data2 = {
        rekening: req.body.rekening,
        kode_pin: req.body.kode_pin
      };
      var sql = 'INSERT INTO customer SET ?';
      db.query(sql, data2, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("berhasil")
      });
    } else {
      res.send("Gagal bro")
    }

  })
})


app.get('/allviewcustomer', function (req, res) {

  // console.log(req.body.username)
  // console.log(req.body.password)

  var sql = `SELECT * FROM customer_ditel`;
  db.query(sql, (error, result) => {
    res.send(result)
  });
})

// get data product ditel
app.get('/getdata/:id', (req, res) => {
  /** Menyiapkan query untuk ke MySQL */
  var grabData = `SELECT * FROM customer_ditel WHERE id = ${req.params.id}`;

  db.query(grabData, (err, hasilquery) => {
    if (err) {
      /** Mengeluarkan pesan error apabila terjadi kesalahan */
      throw err;
    } else {
      /** Menyiapkan hasil query untuk siap dikirim */
      res.send(hasilquery);
    }
  })
});

// Update data dari product ditel
/** Untuk mengupdate data */
app.post('/updatedata', (req, res) => {


  var nama = req.body.nama
  var email = req.body.email
  var alamat = req.body.alamat
  var nomor_hp = req.body.nomor_hp
  var gander = req.body.gander
  var birthday = req.body.birthday
  var id = req.body.id

  var sql = 'UPDATE `customer_ditel` SET `nama`=?,`email`=?,`alamat`=?,`nomor_hp`=?,`gander`=?,`birthday`=? WHERE `id`=?'
  db.query(sql, [nama, email, alamat, nomor_hp, gander, birthday, id], (err, result) => {
    if (err) throw err;
    console.log(result);
  });

})

//////////////////////////////////////////End of user///////////////////////////////////////////

/////////////////// Start for user///////////////////////////
app.post('/login_customer', function (req, res) {

  var sql = `SELECT * FROM customer`;
  db.query(sql, (error, result) => {
    if (error) {
      throw error;
    } else {
      var rekening = req.body.rekening;
      var kode_pin = req.body.kode_pin;
      var tampung = []
      for (var i = 0; i < result.length; i++) {
        if (rekening == result[i].rekening && kode_pin == result[i].kode_pin) {
          tampung.push(result[i].id)
          res.send(tampung);
          // console.log(status)
          break;
        } else if (i === result.length - 1) {
          res.send(tampung);
          // console.log(status)
        }
      }
    }
  });
})

app.post('/viewcustomer', function (req, res) {
  var id = req.body.id
  var sql = 'SELECT * FROM `customer` JOIN `customer_ditel` ON customer.id = customer_ditel.id WHERE customer.id = ?';
  db.query(sql, id, (error, result) => {
    res.send(result)
  });
})


// Untuk update saldo 
app.post('/update_saldo', (req, res) => {

  var id = req.body.id
  var sql = 'SELECT saldo FROM `customer_ditel` WHERE id=?'

  db.query(sql, id, (err, result) => {
    if (err) throw err;

    var saldo_sebelum = Number(result[0].saldo)
    var saldo = Number(req.body.tambah)
    var jumlah = saldo_sebelum + saldo

    var sql = 'UPDATE `customer_ditel` SET `saldo`=? WHERE `id`=?'
    db.query(sql, [jumlah, id], (err, result) => {
      if (err) throw err;
      console.log(result);
    });

    var sql = 'INSERT INTO `history_stortunai` SET `id_customer`=?,	`jumlah_stor`=?';
    db.query(sql, [id, saldo], (err, result) => {
      if (err) throw err;
      console.log(result);
    });

  });



})



// Untuk update saldo 
app.post('/kirim_rekening', (req, res) => {

  var id = req.body.id
  var nominal = Number(req.body.nominal)
  var kerekening = req.body.kerekening

  var sql = 'SELECT * FROM `customer`'
  db.query(sql, (err, result) => {
    if (err) throw err;
    for (var i = 0; i < result.length; i++) {
      if (kerekening == result[i].rekening) {
        var status = "ada"
        // console.log(status)
        break;
      } else if (i === result.length - 1) {
        var status = "tidakada"
        // console.log(status)
      }
    }


    var sql = 'SELECT saldo FROM `customer_ditel` WHERE id=?'
    db.query(sql, id, (err, result) => {
      if (err) throw err;

      var saldo_sebelum_pengirim = Number(result[0].saldo)
      var sisah_dikirim = saldo_sebelum_pengirim - nominal

      if (status == "ada" && sisah_dikirim > 0) {

        var sql = 'SELECT * FROM `customer` WHERE rekening=?'
        db.query(sql, kerekening, (err, result) => {

          var id_dikirim = result[0].id

        var sql = 'SELECT saldo FROM `customer_ditel` WHERE id=?'
          db.query(sql, id_dikirim, (err, result) => {
            if (err) throw err;

          var saldo_sebelum_penerima = Number(result[0].saldo)
          var hasilkirim = saldo_sebelum_penerima + nominal;

          var sql = 'UPDATE `customer_ditel` SET `saldo`=? WHERE `id`=?'
          db.query(sql, [sisah_dikirim, id], (err, result) => {
            if (err) throw err;
            console.log(result);
          });

          var sql = 'UPDATE `customer_ditel` SET `saldo`=? WHERE `id`=?'
          db.query(sql, [hasilkirim, id_dikirim], (err, result) => {
            if (err) throw err;
            console.log(result);
          });

          var sql = 'INSERT INTO `history_transfer` SET `id_customer`=?,`kerekening`=?,`jumlah_transfer`=?';
          db.query(sql, [id,kerekening,nominal], (err, result) => {
            if (err) throw err;
            console.log(result);
          });
          })
        })
        res.send("berhasil")
      } else {
        res.send("tidak berhasil")
      }

    })
  })
})

  
////////////////////////////////// End for user ////////////////////////////

app.listen(3002);

