import { Express } from "express";
const router = express.Router()
import User from "../database/models/user";
import passport from ("passport");

const app = express();

app.use('/user', User);