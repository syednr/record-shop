//import db from database
const UsersModel = require("../models/UserSchema");
const createError = require("http-errors");

exports.getUsers = async (req, res, next) => {
  try {
      //get all users from users collection
    let users = await UsersModel.find({});
    res.json({ success: true, data: users });
  } catch (err) {
    next(err);
  }
};

exports.getSingleUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    //get a single user from users collection
    const user = await UsersModel.findById(id);
    if (user) {
      return res.json({ success: true, data: user });
    } else {
      next(new createError.BadRequest("no such user found in our collection"));
    }
  } catch (err) {
    next(err);
  }
};

exports.postUser = async (req, res, next) => {
 //add new user into our users collection
    try{
        const user = new UsersModel(req.body)
        await user.save()
        res.send({success:true, data:user})
    }
    catch(err){
        console.log(err.message)
        next(err)
    }

};

exports.patchUser = async (req, res, next) => {

    try{
        const {id} =req.params
        //update user in our users collection
        const user = await UsersModel.findByIdAndUpdate(id, req.body, {new:true})
        res.send({success:true, data:user})

    }
    catch(err){
        next(err)
    }
};

exports.deleteUser = async (req, res, next) => {
    try{
        const {id}= req.params
        const user = await UsersModel.findByIdAndDelete(id)
        res.send({success:true, data:user})
    }
    catch(err){
        next(err)
    }
};
