const mongoose = require('mongoose');

main()
.then(() => {
    console.log("connnection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
}

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
});

const User = mongoose.model("User", userSchema);
// const Employee = mongoose.model("Employee", userSchema);

// const user1 = new User ({
//   name: "Adam",
//   email: "adam@yahoo.in",
//   age: 48,
// });

// user1.save()

// const user2 = new User ({
//   name: "Eve",
//   email: "eve@yahoo.in",
//   age: 48,
// });

// user2.save()
// .then((res) => {
//   console.log(res);
// })
// .catch((err) => {
//   console.log(err);
// })


// User.insertMany([
//   {name: "Tony", email: "tony@gmail.com", age: 50},
//   {name: "Peter", email: "peter@gmail.com", age: 30},
//   {name: "Bruce", email: "bruce@gmail.com", age: 48},
// ]).then((res) => {
//   console.log(res);
// });

// User.findById("65040698f22ac2f568521389")
// .then(res => {
//   console.log(res);
// })
// .catch(err => {
//   console.log(err);
// });

// User.findOneAndUpdate( {name: "Bruce"}, {age: 42}, {new: true})
// .then((res) => {
//   console.log(res);
// })
// .catch((err) => {
//   console.log(err);
// });

User.findByIdAndDelete("65040698f22ac2f568521388")
.then((res) => {
  console.log(res);
}).catch((err) => {
  console.log(err);
});