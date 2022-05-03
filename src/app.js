const path = require("path");
const forecast =  require("./utils/forecast")
const geocode = require("./utils/geocode");
const express = require("express");
const hbs = require("hbs");
const app = express();

const pubDir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
app.use(express.static(pubDir));
hbs.registerPartials(partialsPath);

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Taiwo",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text printing",
    title: "Help",
    name: "Taiwo",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Taiwo",
  });
});

app.get("/weather", (req, res) => {
  if(!req.query.address){
    return res.send({
      error: "Provide a search term"
    })
  }
  geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if (error){
      return res.send({error})
    }
      forecast(latitude, longitude, (error, forecasData) => {
        if(error){
          return res.send(error)
        }
      return res.send({
        forecast: forecasData,
        location: location,
        address: req.query.address

      }
      )
      })
  })
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    name: "Taiwo",
    title: "404",
    mssg: "help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    name: "Taiwo",
    title: "404",
    mssg: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
