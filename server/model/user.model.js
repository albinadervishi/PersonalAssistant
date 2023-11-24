const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Wallet = require("../model/wallet.model");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      minlength: [3, "This field should be longer then 3 characters "],
      required: [true, "This field is required"],
    },
    password: {
      type: String,
      required: [true, "This field is required"],
    },
    email: {
      type: String,
      required: [true, "This field is required"],
      validate: {
        validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: "Please enter a valid email",
      },
    },
    wage: {
      amount: {
        type: Number,
      },
      wallet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Wallet",
      },
    },
  },
  { timestamps: true }
);

//create a virtual field for confirmPassword, not stored anywhere
UserSchema.virtual("confirmPassword")
  .get(() => this._confirmPassword)
  .set((value) => (this._confirmPassword = value));

//validate password and confirmPassword
UserSchema.pre("validate", function (next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate("confirmPassword", "Password must match confirm password");
  }
  next();
});

//hashing the password before saving it to the database
UserSchema.pre("save", function (next) {
  bcrypt.hash(this.password, 10).then((hash) => {
    //replace password with hashed password
    this.password = hash;
    console.log(this.password);
    //proceed to saving the user
    next();
  });
});

module.exports = mongoose.model("User", UserSchema);
