const express = require("express");
const app = express();
const path = require("path");

const port = 8080;

app.use(express.static(path.join(__dirname, "/public/css")));
app.use(express.static(path.join(__dirname, "/public/js")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
    res.render("home.ejs");
})

app.get("/home", (req, res) => {
    res.send("Hello");
})

// app.get("/ig/:username", (req, res) => {
//     const followers = ["adam", "bob", "stive", "peter", "mike", "eve"];
//     let { username } = req.params;
//     res.render("instagram.ejs", {username, followers});
// })

app.get("/ig/:username", (req, res) => {
    let { username } = req.params;
    const instaData = require("./data.json");
    const data = instaData[username];
    if(data){
        res.render("instagram.ejs", { data });
    } else {
        res.render("error.ejs");
    }
    
})

app.get("/rolldice", (req, res) => {
    let diceVal = Math.floor(Math.random() * 6) + 1;
    // res.render("rolldice.ejs", { num : diceVal });
    res.render("rolldice.ejs", { diceVal });
})

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})