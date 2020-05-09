/*  Require Express  */
const express = require("express");

/*  Require Mongoose */
const mongoose = require("mongoose");

/*  Require Body-Parser */
const bodyParser = require("body-parser");

/*  Require CORS */
const cors = require("cors");

/*  Require Bcrypt JS */
const bcrypt = require("bcryptjs");

/*  Require Path */
const path = require('path');

/*  Secure Variables  */
require('dotenv').config();

/*  Use Express  */
const app = express();

/*  CORS Options  */
let corsOptions = {
  origin: "https://auth-unlockit.herokuapp.com"
};

/*  Use CORS  */
app.use(cors(corsOptions));

/*  Body-Parser Middleware  */
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

/*  Static Assets  */
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
}

/*  Include Role and User Models  */
const db = require("./models");
const Role = db.role;
const User = db.user;

/*  Auth and User Routes  */
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

/*  Connect to MongoDB */
db.mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/pocAuthentication", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connected to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("MongoDB connection error", err);
    process.exit();
  });

/*  User Roles  */

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "teacher"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'teacher' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    };
    initialusers();
  });
}

/*  Create Admin User Account */
function initialusers() {
  User.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new User ({
        username: "admin@unlockit.com",
        first: "Admin",
        last: "User",
        email: "admin@unlockit.com",
        password: bcrypt.hashSync("p@ssw0rd", 8),
        roles: ["5eb6656b9e5adc002ab84867"]
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'admin user' to user collection");
      });
    };
  });
}


/*  Simple Route */
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Unlock It!." });
});

/*  Server Port Configuration */
const PORT = process.env.PORT || 3001;

/*  Start Server */
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});