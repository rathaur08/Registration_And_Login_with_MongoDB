const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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

//  ADD function Secure Password using BcryptJS in Nodejs ------------->
employeSchema.pre("save", async function(next){
    if(this.isModified("password")){
        console.log(`the current password is ${this.password}`);
        this.password = await bcrypt.hash(this.password, 10);
        console.log(`the current password is ${this.password}`);
        this.confirmpassword = undefined;
    }
    next();
})

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

//  ADD Secure Password using BcryptJS in Nodejs ------------->
//  const bcrypt = require("bcryptjs");
// const securePassword = async (password) => {
//     const passwordHash = await bcrypt.hash(password, 10);
//     console.log(passwordHash);

//     // compare Passwords
//     const passwordMatch = await bcrypt.compare(password, passwordHash);
//     console.log(passwordMatch);
// }
// securePassword("Sunny");