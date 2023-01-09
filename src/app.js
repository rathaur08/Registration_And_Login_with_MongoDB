const express = require("express");
const path = require("path");
const hbs = require("hbs");
const bcrypt = require("bcryptjs");

// DATA DB
require("./db/conn");
const Register = require("./models/registers");
const Employe =require("./models/addEmploye");

const app = express();
const port = process.env.PORT || 8000;

const templatePath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// To set the view engine
app.set("view engine", "hbs");
app.set("views", templatePath)
hbs.registerPartials(partialsPath);

// templete engine route
app.get("/", (req, res) => {
    res.render("index");
});

app.get("/about", (req, res) => {
    res.render("about");
});

// Create a  Employee --------------->
app.post("/crud", async (req, res) => {
    try {
            const Employes = new Employe({
                ename: req.body.ename,
                department: req.body.department,
                salary: req.body.salary
            });
            const CreateRegister = await Employes.save();
            res.status(201).redirect("crud");
    } catch (err) {
        res.status(400).send(err);
    }
})
// Get/Read a  Employee Data --------------->
app.get("/crud", async (req, res) => {
    try {
            const result = await Employe.find();
            // console.log(result);
            res.status(201).render("crud", {docs: result});
    } catch (err) {
        res.status(400).send(err);
    }
})

// Get/Edit a  Employee Data --------------->
app.get("/crud/edit/:id", async (req, res) => {
    try {
            const result = await Employe.findById(req.params.id);
            // console.log(result);
            res.status(201).render("edit", {data: result});
    } catch (err) {
        res.status(400).send(err);
    }
})
// Post/Update a  Employee Data --------------->
app.post("/crud/update/:id", async (req, res) => {
    try {
            const result = await Employe.findByIdAndUpdate(req.params.id, req.body);
            // console.log(result);
            res.status(201).redirect("/crud");
    } catch (err) {
        res.status(400).send(err);
    }
})

// Post/Delete a  Employee Data --------------->
app.post("/crud/delete/:id", async (req, res) => {
    try {
            const result = await Employe.findByIdAndDelete(req.params.id);
            // console.log(result);
            res.status(201).redirect("/crud");
    } catch (err) {
        res.status(400).send(err);
    }
})
// -----------------------------------------------------------------------
app.get("/register", (req, res) => {
    res.render("register");
});
//  Register new Employee --------------->
app.post("/register", async (req, res) => {
    try {
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;
        if (password === cpassword) {
            const Registers = new Register({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                gender: req.body.gender,
                phone: req.body.phone,
                age: req.body.age,
                password: password,
                confirmpassword: cpassword
            });
            const CreateRegister = await Registers.save();
            res.status(201).render("index",{firstname});
        } else {
            res.send("Data not matching")
        }
    } catch (err) {
        res.status(400).send(err);
    }
})

app.get("/login", (req, res) => {
    res.render("login");
});

// ADD login validation check ------------->
app.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        // console.log(`${email} and password is ${password}`);

        const useremail = await Register.findOne({ email: email });

        // ADD Login Form with Validation and BcryptJS---------------->
        const passwordMatch = await bcrypt.compare(password, useremail.password);

        if (passwordMatch) {
            res.status(201).render("index");
        } else {
            res.send("invalid password Details")
        }
    } catch (err) {
        res.status(400).send("invalid login Details");
    }
});


app.get("/about/*", (req, res) => {
    res.render("404", {
        errorcomemnt: "Opps this aboutUs page couldn't be found..",
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        errorcomemnt: "Opps page couldn't be found..",
    });
});

// Create HTTP Server Using Express
app.listen(port, () => {
    console.log(`listing the port at http://localhost:${port}`);
});