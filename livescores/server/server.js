const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");
const session = require("express-session");
const LocalStratergy = require("passport-local").Strategy;
const User = require("./models/user");

const app = express();

app.listen