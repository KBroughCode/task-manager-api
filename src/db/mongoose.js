const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

// const me = new User({
//   name: "Mitch",
//   email: "mitch@hotmail.com",
//   password: "Misty321"
// });

// me.save()
//   .then(() => {
//     console.log(me);
//   })
//   .catch(error => {
//     console.log(error, "an error");
//   });

// const Task = new mongoose.model("Task", {
//   description: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   completed: {
//     type: Boolean,
//     default: false
//   }
// });

// const shopping = new Task({
//   description: "                             Buy food               "
// });

// shopping
//   .save()
//   .then(() => {
//     console.log(shopping);
//   })
//   .catch(error => {
//     console.log(error, "shopping error");
//   });
