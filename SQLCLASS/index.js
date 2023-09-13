const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'delta_app',
  password: 'Rohit@4423'
});

let getRandomUser = () => {
  return [
    faker.datatype.uuid(),
    faker.internet.userName(),
    faker.internet.email(),
    faker.internet.password(),
  ];
}

// // Inserting New Data
// let q = "INSERT INTO user (id, username, email, password) VALUES ?";

// let data = [];
// for(let i=1; i<=100; i++){
//   data.push(getRandomUser());   // 100 fake user data
// }

// Home Route
app.get("/", (req, res) => {
  let q = `SELECT count(*) FROM user`;
  try{
    connection.query(q, (err, result) => {
      if (err) throw err;
      let count = result[0]["count(*)"];
      res.render("home.ejs", { count });
    })
  } catch(err) {
    console.log(err);
    res.send("some error in database");
  }
});

// Show Route
app.get("/user", (req, res) => {
  let q = `SELECT * FROM user`;
  try{
    connection.query(q, (err, users) => {
      if (err) throw err;
      res.render("showusers.ejs", { users });
    })
  } catch(err) {
    console.log(err);
    res.send("some error in database");
  }
});

// Edit Route
app.get("/user/:id/edit", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE id='${id}'`;
  try{
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      res.render("edit.ejs", { user });
    })
  } catch(err) {
    console.log(err);
    res.send("some error in database");
  }
});

// UPADATE (DB) Route
app.patch("/user/:id", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE id='${id}'`;
  let {password: formPass, username: newUsername} = req.body;

  try{
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      if(formPass != user.password){
        res.send("Wrong Password !");
      } else {
        let q2 = `UPDATE user SET username='${newUsername}' WHERE id='${id}'`;
        connection.query(q2, (err, result) => {
          if(err) throw err;
          res.redirect("/user");
        })
      }
    })
  } catch(err) {
    console.log(err);
    res.send("some error in database");
  }
});



// ADD newUser Route
app.get("/user/new", (req, res) => {
  res.render("addUser.ejs");
});

app.post("/user", (req, res) => {
  let { id, username, email, password } = req.body;
  let q = "INSERT INTO user (id, username, email, password) VALUES (?, ?, ?, ?)";
  let newAdded = [id, username, email, password];
  try{
    connection.query(q, newAdded, (err, result) => {
      if (err) throw err;
      console.log(result);
    })
  } catch(err) {
    console.log(err);
    res.send("some error in database");
  }
  res.redirect("/user");
});


// DELETE User Route
app.get("/user/:id/delete", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE id='${id}'`;

  try{
    connection.query(q, (err, result) => {
      if (err) throw err;
      console.log(result);
      let user = result[0];
      res.render("delete.ejs", { user });
    })
  } catch(err) {
    console.log(err);
    res.send("some error in database");
  }
});

app.delete("/user/:id", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE id='${id}'`;
  let {password: formPass, username: newUsername} = req.body;

  try{
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      if((newUsername == user.username) && (formPass == user.password)){
        let q2 = `DELETE FROM user WHERE id='${id}'`;
        connection.query(q2, (err, result) => {
          if(err) throw err;
          res.redirect("/user");
        })
      } else {
        res.send("Username Or Password Wrong!");
      }
    })
  } catch(err) {
    console.log(err);
    res.send("some error in database");
  }
});


app.listen("8080", () => {
  console.log("server is litsening to port 8080");
});
