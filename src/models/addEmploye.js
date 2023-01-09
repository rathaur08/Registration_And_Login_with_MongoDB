const mongoose = require("mongoose");

// schema
// A mongoose schema defines the structure of the document,
// default value, validators, etc.,
const employeDataSchema = new mongoose.Schema({
    ename: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// creation a new collection 
const Employe = new mongoose.model("Employe", employeDataSchema);

module.exports = Employe;

// insrt data manualy in database ---------->
// const createDocument = async () =>{
//     try {
//         const Employes = new Employe({
//                 ename: "Sunny Rathaur",
//                 department: "Front-End Devlopers",
//                 salary: "22000"
//         });
//         const InsertData = await Employes.save();
//         console.log(InsertData); 
//     } catch (err) {
//         console.log(err);
//     }
// }
// createDocument();