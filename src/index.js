const express = require("express");
const app = express();
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const port = process.env.PORT;

// Blocking requests
// app.use((req, res, next) => {
//   if (req.method === "GET") {
//     res.send("get requests disabled");
//   } else {
//     next();
//   }
// });

// app.use((req, res, next) => {
//   if (
//     req.method === "GET" ||
//     req.method === "POST" ||
//     req.method === "PATCH" ||
//     req.method === "DELETE"
//   ) {
//     res.status(503).send("Cannot process request as maintainence taking place");
//   } else {
//     next();
//   }
// });

const multer = require("multer");
const upload = multer({
  dest: "images"
});
app.post("/upload", upload.single("upload"), (req, res) => {
  res.send();
});

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});

//Playing with populate

// const Task = require("./models/task");
// const User = require("./models/user");

// const main = async () => {
//   // const task = await Task.findById("5ed61ca74175d7a087a97dc3");
//   // await task.populate('owner').execPopulate()
//   // console.log(task.owner);

//   const user = await User.findById("5ed619864175d7a087a97dc1");
//   await user.populate("tasks").execPopulate();
//   console.log(user.tasks);
// };

// main();
