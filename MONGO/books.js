const mongoose = require('mongoose');

main()
.then(() => {
    console.log("connnection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/amazon');
}

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 20,
  },
  author: {
    type: String,
  },
  price: {
    type: Number,
    min: [1, "Price is too low for Amazon selling"],
  },
  discount: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    enum: ["friction", "non-friction"],
  },
  genre: [String],
});

const Book = mongoose.model("Book", bookSchema);

// let book1 = new Book({ 
//   title: "Mathematics II",
//   // author: "RD Sharma",s
//   price: 1200,
// });

// book1.save()
// .then((res) => {
//   console.log(res);
// })
// .catch((err) => {
//   console.log(err);
// });

// let book1 = new Book({ 
//   title: "Marvel Comics v2",
//   price: 600,
//   genre: ["comics", "superheroes", "friction"],
// });

// book1.save()
// .then((res) => {
//   console.log(res);
// })
// .catch((err) => {
//   console.log(err);
// });

Book.findByIdAndUpdate("6505e6e7056ba5c7422dc90a", {price: -100}, {runValidators: true})
.then((res) => {
  console.log(res);
})
.catch((err) => {
  console.log(err.errors.price.properties.message);
});

Book.deleteOne({ _id: '6505dbec1b72c2b09454aea9'})
.then((res) => {
  console.log(res);
});