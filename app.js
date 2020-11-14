import express from "express";
import indexRoutes from "./routes/index.js";
import usersRoutes from "./routes/users.js";
import expressLayouts from "express-ejs-layouts";
import mongoose from "mongoose";
import { keys } from "./config/keys.js";
import flash from "connect-flash";
import session from "express-session";
import passport from "passport";

const app = express();

// Passport config
import passportConfig from "./config/passport.js";
passportConfig(passport);

// DB Config
const db = keys.MongoURI;

// Connect to Mongo
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(error));

// EJS
app.set("view engine", "ejs");
app.use(expressLayouts);

// Bodyparser
app.use(express.urlencoded({ extended: false }));

// Express Session
app.use(
  session({
    secret: "Steven Gerrard",
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// Routes
app.use("/", indexRoutes);
app.use("/users", usersRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
