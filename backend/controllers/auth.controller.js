const User = require("../models/User");
const bcryptjs = require("bcryptjs");
let emailPattern = /^\S+@\S+\.\S+$/;
let mobilePattern = /^\d{10}$/;
let passwordPattern = /^(?=.{6,})(?=.*[A-Z])(?=.*[@#$%^&+*!=]).*$/;

async function registerUser(user) {
  try {
    if (!user) {
      return { message: "User Data is incorrect", status: "Error" };
    }
    if (!user.name) {
      return { message: "name is required", status: "Error" };
    }
    if (!user.email) {
      return { message: "email is required", status: "Error" };
    } else {
      isValidEmail = user.email.match(emailPattern);
      if (!isValidEmail) {
        return { message: "Enter a valid email.", status: "Error" };
      }

      let isEmailExists = await User.findOne({ email: user.email });
      if (isEmailExists) {
        return {
          message: "Email is already registered try different one.",
          status: "Error",
        };
      }
    }
    if (!user.mobile) {
      return { message: "mobile is required", status: "Error" };
    } else {
      let isMobileExists = await User.findOne({ mobile: user.mobile });
      if (isMobileExists) {
        return {
          message: "Mobile no. is already registered.",
          status: "Error",
        };
      }

      let isMobileValid = user.mobile.match(mobilePattern);
      if (!isMobileValid) {
        return {
          message: "Enter valid mobile.",
          status: "Error",
        };
      }
    }
    if (!user.password) {
      return { message: "password is required", status: "Error" };
    } else {
      let isPasswordCorrect = user.password.match(passwordPattern);
      if (isPasswordCorrect) {
        user.password = await bcryptjs.hash(user.password, 10);
      } else {
        return { message: "password is not correct.", status: "Error" };
      }
    }
    await User.create(user);
    return {
      message: "Account created successfully.",
      status: "Success",
    };
  } catch (error) {
    return { message: "Internal server Error", status: "Error" };
  }
}

async function loginUser({ email, password }) {
  if (!email) return { message: "email should not be blank.", status: "Error" };
  if (!password)
    return { message: "password should not be blank.", status: "Error" };
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return { message: "User not found.", status: "Error" };
    }
    let isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      return { message: "Password is incorrect", status: "Error" };
    }
    return {
      status: "Success",
      message: "Logged in successfully",
      data: user,
    };
  } catch (error) {
    return { message: "Internal server Error", status: "Error" };
  }
}

module.exports = { registerUser, loginUser };
