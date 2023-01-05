const express = require("express");
const path = require("path");
const hbs = require("hbs");

// DATA DB
require("./db/conn");
const Register = require("./models/registers");
const { json } = require("express");

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

app.get("/register", (req, res) => {
    res.render("register");
});
// Create a new Students --------------->
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
            res.status(201).render("index");
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
        if (useremail.password === password) {
            res.status(201).render("index");
        } else {
            res.send("invalid login Details")
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