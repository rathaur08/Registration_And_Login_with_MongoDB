const mongoose = require("mongoose");
const validator = require("validator");

// schema
// A mongoose schema defines the structure of the document,
// default value, validators, etc.,
const employeSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Email id Already Present..."]
    },
    gender: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        min: 10,
        required: true,
        unique: [true, "Phone Number Already Present..."],
    },
    age: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmpassword: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// creation a new collection 
const Register = new mongoose.model("Register", employeSchema);

module.exports = Register;

// insrt data manualy in database ---------->
// const createDocument = async () =>{
//     try {
//         const Registers = new Register({
//                 firstname: "Sunny",
//                 lastname: "Rathaur",
//                 email: "sunny@gmail.com",
//                 gender: "Male",
//                 phone: 8266881450,
//                 age: 25,
//                 password: 123,
//                 confirmpassword: 123
//         });
//         const InsertData = await Registers.save();
//         console.log(InsertData); 
//     } catch (err) {
//         console.log(err);
//     }
// }
// createDocument();
