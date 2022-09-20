// npm modules
import express from "express";
import bcrypt from "bcryptjs";
import _ from "lodash";
import jwt from "jsonwebtoken";

//controlers
import authCtrl from "../Controllers/Authentication";

//schema
import users from "../Schema/userDetails";
// constants
const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";

const router = express.Router();

router.post("/register", authCtrl.register);
router.post("/login-user", authCtrl.login);
router.post("/userData",authCtrl.getUser)
export default router;
