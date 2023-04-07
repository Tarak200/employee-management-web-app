const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const db = require("./queries");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const port = 3001;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(
  cors({
    origin: ["http://localhost:3000"],
    method: ["GET","POST","PUT"],
    credentials: true
  }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true}));

app.use(
  session({
    key: "iitbuser",
    secret:"1234",
    resave:false,
    saveUninitialized:false ,
    cookie: {
      expires: 60*60*24*1000,
    },
  })
);

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

app.post("/login", db.getLogin);
app.get("/logout", db.getLogout);
app.get("/login-session", db.getLoginSession);
app.post("/registration", db.getRegistration);

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
  });