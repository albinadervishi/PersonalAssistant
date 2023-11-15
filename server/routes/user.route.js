const UserController = require('../controllers/user.controller');  

module.exports = (app) => {
    app.get('/api/user',  UserController.findAllUsers);
    app.get('/api/user/:id', UserController.getUser);
    app.post("/api/register", UserController.register);
    app.post("/api/forgot-password", UserController.forgotPassword);
    app.post("/api/reset-password/:id/:token", UserController.resetPassword);
    app.post("/api/login", UserController.login);
    app.post("/api/logout", UserController.logout);
    app.patch('/api/user/edit/:id', UserController.updateUser);
    app.delete('/api/user/:id', UserController.deleteUser);
}