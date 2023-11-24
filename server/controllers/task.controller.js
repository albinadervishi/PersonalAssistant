const Task = require("../model/task.model");
const User = require("../model/user.model");

module.exports.findAllTaskss = (req, res) => {
  const { userId } = req.params;
  Task.find({ user: userId })
    .populate("user")
    .then((allTasks) => {
      res.json({ tasks: allTasks });
    })
    .catch((err) => {
      res.json({ message: "Something went wrong", error: err });
    });
};

module.exports.createTask = (request, response) => {
  const { userId } = request.params;
  Task.create({
    user: userId,
    ...request.body,
  })
    .then((request) => {
      response.status(200).json({ message: "Task was created", request });
    })
    .catch((err) => {
      console.log("Failed to create the task:", err);
      response.status(500).json({ error: "An error occurred" });
    });
};

module.exports.updateTask = (request, response) => {
  Task.findOneAndUpdate({ _id: request.params.id }, request.body, {
    new: true,
  })
    .then((updatedTask) => response.json(updatedTask))
    .catch((err) => response.status(500).json(err));
};

module.exports.deleteTask = (request, response) => {
  Task.deleteOne({ _id: request.params.id })
    .then((deleteConfirmation) => response.json(deleteConfirmation))
    .catch((err) => response.json(err));
};
