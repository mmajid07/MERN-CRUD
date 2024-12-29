import User from "../models/userModel.js";

export const Create = async (req, res) => {
  try {
    const userData = new User(req.body);
    if (!userData) {
      return res.status(404).json({ msg: "User Data not found" });
    }

    await userData.save();
    res.status(200).json({ msg: "User Added Successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const GetAll = async (req, res) => {
  try {
    const userData = await User.find();

    if (!userData) {
      return res.status(404).json({ msg: "User Data not Found" });
    }

    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const GetOne = async (req, res) => {
  try {
    const id = req.params.id;
    const findOne = await User.findById(id);
    if (!findOne) {
      return res.status(404).js({ msg: "User One Data not Found" });
    }
    res.status(200).json(findOne);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

export const UpdateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const dataExist = await User.findById(id);
    if (!dataExist) {
      res.status(401).json({ msg: "User Data not found" });
    }
    await User.findOneAndUpdate({ _id: id }, { $set: req.body }, { new: true });
    res.status(200).json({ msg: "User Updated Successfully" });
  } catch (error) {
    return res.status(500).json({ error: `Custom error of 500 ${error}` });
  }
};

export const DeleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const existUser = await User.findById(id);
    if (!existUser) {
      res.status(401).json({ msg: "User not found" });
    }
    await User.findByIdAndDelete({ _id: id });
    res.status(200).json({ msg: "User Deleted Successfully" });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};
