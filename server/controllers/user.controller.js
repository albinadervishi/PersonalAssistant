const User = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

module.exports.forgotPassword = (req, res) => {
  const { email } = req.body;
  //find the user with that email
  User.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.send({ Status: "User doesn't exist" });
    }
    //create a token with user id
    const token = jwt.sign({ id: user._id }, "jwt_secret_key", {
      expiresIn: "1d",
    });
    //declare the account from which u will send the email
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ueda.dervishi@gmail.com",
        pass: "fgum gpmg rlzk nkcf",
      },
    });

    //email body
    var mailOptions = {
      from: "ueda.dervishi@gmail.com",
      to: req.body.email,
      subject: "Reset Password Link",
      text: `http://localhost:3000/reset-password/${user._id}/${token}`,
    };

    //send the email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        return res.send({ Status: "Success" });
      }
    });
  });
};

module.exports.resetPassword = (req, res) => {
  const { id, token } = req.params;
  const { password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ Status: "Passwords do not match" });
  }

  //verify the token
  jwt.verify(token, "jwt_secret_key", (err, decoded) => {
    if (err) {
      return res.json({ Status: "Error with token" });
    } else {
      //hash and update the password
      bcrypt
        .hash(password, 10)
        .then((hash) => {
          User.findByIdAndUpdate({ _id: id }, { password: hash })
            .then((u) => res.send({ Status: "Success" }))
            .catch((err) => res.send({ Status: err }));
        })
        .catch((err) => res.send({ Status: err }));
    }
  });
};

module.exports.register = (req, res) => {
  const { email } = req.body;
  //check if email exists
  User.exists({ email })
    .then((emailExists) => {
      if (emailExists) {
        return Promise.reject({
          errors: {
            email: { message: "An user with this email already exists" },
          },
        });
      } else {
        return User.create(req.body);
      }
    })
    //creating the jwt token with the userId
    .then((user) => {
      const userToken = jwt.sign(
        {
          id: user._id,
        },
        process.env.SECRET_KEY
      );

      //setting a cookie with the generated token
      res
        .cookie("usertoken", userToken, {
          //innaccessible by javascript in browser
          httpOnly: true,
        })
        .json({ msg: "success!", user: user });
    })
    .catch((err) => res.json(err));
};

module.exports.login = async (req, res) => {
  console.log(req.body.password);
  //find the user with the email
  const user = await User.findOne({ email: req.body.email });

  if (user === null) {
    return res.status(400).json({
      errors: { email: { message: "There is no user with this email" } },
    });
  }

  //check the password on the input with the hashed password in the database using bcrypt
  const correctPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );
  console.log(correctPassword);
  if (!correctPassword) {
    return res
      .status(400)
      .json({ errors: { password: { message: "The password is incorrect" } } });
  }

  //generate a token
  console.log("Err");
  const userToken = jwt.sign(
    {
      id: user._id,
    },
    process.env.SECRET_KEY
  );

  res
    .cookie("usertoken", userToken, {
      httpOnly: true,
    })
    .json({ msg: "success login!", user: user });
};

module.exports.logout = (req, res) => {
  //clear the cookie
  res.clearCookie("usertoken");
  res.sendStatus(200);
};

module.exports.findAllUsers = (req, res) => {
  User.find()
    .then((allUsers) => {
      res.json({ user: allUsers });
    })
    .catch((err) => {
      res.json({ message: "Something went wrong", error: err });
    });
};

module.exports.getUser = (request, response) => {
  User.findOne({ _id: request.params.id })
    .then((user) => {
      if (!user) {
        return response.status(400).json({ error: "User not found" });
      } else {
        response.json(user);
      }
    })
    .catch((err) => response.json(err));
};

module.exports.updateUser = (request, response) => {
  User.findOneAndUpdate({ _id: request.params.id }, request.body, { new: true })
    .then((updatedUser) => response.json(updatedUser))
    .catch((err) => response.status(500).json(err));
};

module.exports.deleteUser = (request, response) => {
  User.deleteOne({ _id: request.params.id })
    .then((deleteConfirmation) => response.json(deleteConfirmation))
    .catch((err) => response.json(err));
};
