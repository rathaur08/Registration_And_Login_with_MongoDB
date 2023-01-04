const express = require("express");
const path = require("path");
const hbs = require("hbs");

require("./db/conn");

const app = express();
const port = process.env.PORT || 8000;

const templatePath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

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