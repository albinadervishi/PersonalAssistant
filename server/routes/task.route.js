const TaskController = require("../controllers/task.controller");

module.exports = (app) => {
  app.get("/api/tasks/:userId", TaskController.findAllTaskss);
  app.post("/api/task/:userId", TaskController.createTask);
  app.patch('/api/task/edit/:id', TaskController.updateTask);
  app.delete('/api/task/:id', TaskController.deleteTask);
};
