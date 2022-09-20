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

// TODO @lskshay move controller to controller file
router.post("/login-user", async (req, res) => {
  const { email, password } = req.body;

  const user = await users.findOne({ email });
  console.log(user);
  if (!user) {
    return res.json({ error: "User Not found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET);

    if (res.status(201)) {
      return res.json({ status: "ok", data: user,token });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "InvAlid Password" });
});

router.post("/userData", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    console.log(user);

    const useremail = user.email;
    UserSchema.findOne({ email: useremail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});

export default router;
