import { List } from "../../models/list.model.js";

// add list
const addList = async (req, res, next) => {
  req.body.user = req.user.userId;
  await List.insertMany(req.body);
  res.json({ message: "list added successfully" });
};

// get lists
const getLists = async (req, res, next) => {
  // endpoint starts at verifyToken middleware
  const lists = await List.find({ user: req.user.userId }).populate(
    "user",
    "userName email -_id"
  );
  res.json({ message: lists });
};

// update list
const updateList = async (req, res, next) => {
  await List.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "list updated successfully" });
};

// delete list
const deleteList = async (req, res, next) => {
  await List.findByIdAndDelete(req.params.id);
  res.json({ message: "list deleted successfully" });
};

export { addList, getLists, updateList, deleteList };
