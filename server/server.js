const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const port = 8000;
const cron = require("node-cron");
const { monthlyTask } = require("./cronTask");

app.use(express.json(), express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

require("dotenv").config();
require("./config/mongoose.config");
require("./routes/user.route")(app);
require("./routes/wallet.route")(app);
require("./routes/transactions.route")(app);
require("./routes/task.route")(app);

//posting the monthly task every first day of the month
cron.schedule(
  "0 0 1 * *",
  () => {
    monthlyTask();
  },
  {
    scheduled: true,
    timezone: "Europe/Tirane",
  }
);

const server = app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});

//   const io = socket(server, {
//     cors: {
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST'],
//         allowedHeaders: ['*'],
//         credentials: true,
//     }
//   });

//   io.on("connection", socket => {
//     console.log('socket id: ' + socket.id);

//     socket.on("event_from_client", data => {
//         // send a message with "data" to ALL clients EXCEPT for the one that emitted the
//     	//     "event_from_client" event
//         socket.broadcast.emit("event_to_all_other_clients", data);
//     });
// });

// module.exports.io = io;
