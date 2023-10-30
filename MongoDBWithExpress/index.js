const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");
const ExpressError = require("./ExpressError");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({exteneded: true}));
app.use(methodOverride("_method"));

main()
.then(() => {
    console.log("connection successful");
})
.catch((err) => {
    console.log(err)});

async function main(){
  await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsapp');
}

// Index Route
app.get("/chats", async (req, res) => {
    try{
        let chats = await Chat.find();
        // console.log(chats);
        res.render("index.ejs", {chats});
    } catch(err) {
        next(err);
    }
});

// New Route
app.get("/chats/new", (req, res) => {
    //  throw new ExpressError(404, "Page Not Found");
    res.render("new.ejs");
});

// Create Route
app.post("/chats", asyncWrap(async(req, res, next) => {
    let { from, msg, to } = req.body;
    let newChat = new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date(),
        updated_at: new Date(),
    });

    await newChat.save();
    // newChat.save()
    // .then(res => {"chat was saved!"})
    // .catch(err => {console.log(err)});  
    res.redirect("/chats");
}));

function asyncWrap(fn) {
    return function(req, res, next) {
        fn(req, res, next).catch((err) => next(err));
    };
}

// NEW - Show Route
app.get("/chats/:id", asyncWrap(async (req, res, next) => {
        let { id } = req.params;
        let chat = await Chat.findById(id);
        if(!chat) {
            next(new ExpressError(500, "Chat Not Found"));
        }
        res.render("show.ejs", { chat });
    })
);

// Edit Route
app.get("/chats/:id/edit", asyncWrap(async (req, res) => {
        let { id } = req.params;
        let chat = await Chat.findById(id);
        res.render("edit.ejs", { chat });
    })
);

// Update Route
app.put("/chats/:id", asyncWrap(async (req, res) => {
        let { id } = req.params;
        let { msg: newMsg } = req.body;
        console.log(newMsg);
        let newDate = new Date();
        let updatedChat = await Chat.findByIdAndUpdate(id, {msg: newMsg, updated_at: newDate}, {runValidators: true, new: true});  
        console.log(updatedChat);
        res.redirect("/chats");
    })
);

// Distroy Route
app.delete("/chats/:id", asyncWrap(async (req, res) => {
        let { id } = req.params;
        let deletedChat = await Chat.findByIdAndDelete(id);
        console.log(deletedChat);
        res.redirect("/chats");
    })
);

app.get ("/", (req, res) => {
    res.send("root is working");
});

const handleValodationError = (err) => {
    console.log("This was a Validation Error. Please follow the rules");
    console.dir(err.message);
    return err;
}

app.use((err, req, res, next) => {
    console.log(err.name);
    if(err.name === "ValidationError") {
        err = handleValodationError(err);
    }
    next(err);
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    let {status=500, message="Some Error Occured"} = err;
    res.status(status).send(message);
});

app.listen(8080, () => {
  console.log("srever is listening on port : 8080");
});