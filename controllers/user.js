const UserModel = require("../models/user"); //.. means search outside the folder

// Function to get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({}, { password: 0 });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

// Function to get a single user by ID
const getSingleUser = async (req, res) => {
  try {
    const { userID } = req.params;
    const user = await UserModel.findById({ _id: userID }, { password: 0 });
    res.json(user ? user : "User Not Found");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

// Function to update a user
const updateUser = async (req, res) => {
  const { userID } = req.params;
  try {
    const user = await UserModel.findByIdAndUpdate(userID, req.body, {
      new: true,
    });
    res.status(200).json(user);
  } catch (err) {
    console.log("Something went wrong");
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

// Function to delete a user
const deleteUser = async (req, res) => {
  const { userID } = req.params;
  try {
    const user = await UserModel.findByIdAndDelete(userID);
    res.status(200).json(user);
  } catch (err) {
    console.log("Something went wrong");
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

// Exporting the controller functions
module.exports = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
