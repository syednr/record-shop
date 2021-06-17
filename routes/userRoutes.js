const express = require("express");

const Route = express.Router();
const {
  getUsers,
  getSingleUser,
  postUser,
  patchUser,
  deleteUser,
} = require("../controllers/userControllers");
//import data from modals
/* const users = require("../modals/data") */

//CRUD operation
//create
//read
//updated
//delete

//creating routes
//get request for all users

Route.get("/", getUsers);
//route to get a single user
Route.get("/:id", getSingleUser);
//get post request (create a new user)
Route.post("/", postUser);
//get patch request (update)
Route.patch("/:id", patchUser);
//get delete request (delete)
Route.delete("/:id", deleteUser);

/* Route.route("/")
.get(getUsers)
.post(postUser);

Route.route("/:id")
.get(getSingleUser)
.patch(patchUser)
.delete(deleteUser); */

module.exports = Route;
