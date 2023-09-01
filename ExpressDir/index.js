const express = require("express");
const app = express();
// console.dir(app);

let port = 8080;  //3000

app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
});

// app.use((req, res) => {
//     // console.log(req);
//     console.log("request recieved");
//     // // res.send("this is a basic response");
//     // res.send({
//     //     name: "Rohit",
//     //     age: 26
//     // });
//     let code = "<h1>Cars</h1> <ul><li>Mustang</li><li>Charger</li><li>Supra</li></ul>";
//     res.send(code);
// });

app.get("/", (req, res) => {
    res.send("hello, i am root path");
});

// app.get("/apple", (req, res) => {
//     res.send("you contected apple path");
// });

// app.get("/orange", (req, res) => {
//     res.send("you contected orange path");
// });

// app.get("*", (req, res) => {
//     res.send("this path does not exist");
// });

// app.post("/", (req, res) => {
//     res.send("you send a post request to root");
// });

app.get("/:username/:id", (req, res) => {
    let { username, id } = req.params;
    let htmlStr = `<h1>welcome to the page of @${username}!</h1>`;
    res.send(htmlStr);
});

app.get('/search', (req, res) => {
    let { q } = req.query;
    if(!q) {
        res.send("<h1>Nothing Searched</h1>");
    }
    res.send(`<h1>search results for query: ${q}</h1>`);
});