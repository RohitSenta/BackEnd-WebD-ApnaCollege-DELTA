const mongoose = require('mongoose');
const {Schema} = mongoose;

main()
    .then(() => console.log("connection successful"))
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}

const orderSchema = new Schema({
    item: String,
    price: Number,
});

const customerSchema = new Schema({
    name: String,
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: "Order"
        }
    ]
});

// customerSchema.pre("findOneAndDelete", async() => {
//     console.log("PRE MIDDLEWARE");
// });

customerSchema.post("findOneAndDelete", async(customer) => {
    if(customer.orders.length){
        let res = await Order.deleteMany({_id: {$in: customer.orders}});
        console.log(res);
    }
});

const Order = mongoose.model("Order", orderSchema);
const Customer = mongoose.model("Customer", customerSchema);

const findCustomer = async () => {
    let res = await Customer.find({}).populate("orders");
    console.log(res[0]);
}

// findCustomer();

const addCust = async() => {
    let newCust = new Customer({
        name: "Karan Arjun",
    });

    let newOrder = new Order({
        item: "Burger",
        price: 250
    });

    newCust.orders.push(newOrder);

    await newOrder.save();
    await newCust.save();

    console.log("added new customer");
}

// addCust();

const delCust = async () => {
    let data = await Customer.findByIdAndDelete("6523d9fb56570719d8311a86");
    console.log(data);
}

delCust();

// const addCustomer = async() => {
//     let cust1 = new Customer ({
//         name: "Rahul Kumar",
//     });

//     let order1 = await Order.findOne({item: "Chips"});
//     let order2 = await Order.findOne({item: "Chocolate"});

//     cust1.orders.push(order1);
//     cust1.orders.push(order2);

//     let result = await cust1.save();
//     console.log(result);

// };

// addCustomer();


// const addOrders = async() => {
//     let res = await Order.insertMany([
//         {item: "Samosa", price: 12},
//         {item: "Chips", price: 10},
//         {item: "Chocolate", price: 40}
//     ]);
//     console.log(res);
// }

// addOrders();

