// npm modules
import express from "express";
import _ from "lodash";

//controlers
import authCtrl from "../Controllers/Authentication";


const router = express.Router();

router.post("/register", authCtrl.register);
router.post("/login-user", authCtrl.login);
router.post("/userData",authCtrl.getUser);


export default router;
