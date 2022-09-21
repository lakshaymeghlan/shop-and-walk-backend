// npm modules
import bcrypt from "bcryptjs";
import _ from "lodash";
import jwt from "jsonwebtoken";
import Wishlistdetails from "../Schema/Wishlistdetails";
import Cart from "../Schema/CartDetails";

//schema
import UserSchema from "../Schema/userDetails";
// constants
const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";

  // TODO @lakshay  fix the format of all responses
const register = async (req, res) => {
  const { name,  email, password } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  console.log("encrypted Password", encryptedPassword);
  try {
    const oldUser = await UserSchema.findOne({ email });

    if (oldUser) {
      console.log("user exist", oldUser);
      return res.json({ error: "User Exists" });
    }
    console.log("existing user not found creating new");
    const newUser = await UserSchema.create({
      name,
      email,
      password: encryptedPassword,
    });
    let newWishlist = new Wishlistdetails({ userID: newUser._id });
    newWishlist = await newWishlist.save();

    let newCart = new Cart({ userID: newUser._id });
    newCart = await newCart.save();

    console.log("new user created");
    return res.send({ status: "user created", newUser });
  } catch (error) {
    console.log("error found while creating a new user", error);
    return res.send({ status: "error", error: error });
  }
};

  // TODO @lakshay  fix the format of all responses
const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await UserSchema.findOne({ email });
  if (!user) {
    return res.json({ error: "User Not found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET);

    if (res.status(201)) {
      return res.json({ status: "ok", data: user, token:token });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "InvAlid Password" });
};



const getUser = async (req, res) => {
  const { token } = req.body;
  try {
    console.log("token-------------->", token)
    const user = jwt.verify(token, JWT_SECRET);
    console.log("user-------------------->", user);

    const useremail = user.email;
    UserSchema.findOne({ email: useremail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {console.log(error)}
};

export default { register, login, getUser };
