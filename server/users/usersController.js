import asyncHandler from "../../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs"
import User from "../../models/user.js";
import jwt from "jsonwebtoken"
import "dotenv/config.js"

// token generator==========================================================
const createToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.SECRET);
  return token
};

//register ======================================
export const register = asyncHandler(async(req, res)=> {
  const {name, username, password, department, branch, shared, isTv} = req.body
  const existingUser = await User.findOne({username})
  if(existingUser) {
    return res.status(400).json({message: "Username is already exists!"})
  } else {
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)
    try {
      if(!isTv) {
        await User.create({
          name, username, password: hashPassword, department, branch
        })
      } else {
        await User.create({
          name, username, password: hashPassword, department, branch, shared , isTv
        })

      }
      return res.status(200).json({message: "New Account added"})
    } catch(err) {
      
      return res.status(500).json({error: err.message})
    }
  }
})

//login ===========================================
export const login = asyncHandler(async(req, res) => {
  const {username, password} = req.body
  const user = await User.findOne({username})
  if(user) {
    const match = await bcrypt.compare(password, user.password);
    if(match) {
      if(!user.isOnline) {
        const token = createToken(user._id)
        await user.updateOne({isOnline: true})
        return res.status(200).json({user: {...user._doc, password: "", isOnline: true},token})
      } else {
        return res.status(401).json({message: "Already"})
      }
    } else {
      return res.status(400).json({message: "Incorrect"})
    }
  } else {
    return res.status(400).json({message: "Incorrect"})
  }
})

//logout =========================================
export const logout = asyncHandler(async(req,res) => {
  const loggedOut = await User.findByIdAndUpdate(req.params.id, {isOnline: false, forcedOffline: false})
  if(!loggedOut) return res.status(404).json({message: "User not found"})
  return res.status(200).json({message: "successfully logout"})
})

//updateShared ==================================
export const updateShared = asyncHandler(async (req, res) => {
  const {shared} = req.body
  const {id} = req.params
  const user = await User.findByIdAndUpdate(id, {shared})
  if(!user) return res.status(404).json({message: "User not found"})
  return res.status(200).json({message: "User successfully updated"})
})

//update isOnline ===============================
export const updateIsOnline = asyncHandler(async(req,res) => {
  const {id} = req.params
  const updateUser = await User.findByIdAndUpdate(id, {isOnline: false, forcedOffline: true})
  if(!updateUser) return res.status(404).json({message: "User not found"})
    return res.status(200).json({message: "User account updated"})
})

// change password ===============================
export const changePass = asyncHandler(async(req,res) => {
  const {id} = req.params
  const {password} = req.body
  const user = await User.findById(id)
  console.log(user)
  if(!user) return res.status(404).json({message: "User not found"})
  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(password, salt)
  try {
    await user.updateOne({password: hashPassword})
    return res.status(200).json({message: "User successfully change password"})
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
})

//update is urgent ======================================
export const updateUrgentUsers = asyncHandler(async(req, res) => {

  const user = await User.findByIdAndUpdate(req.user, {isUrgent: true})
  if(!user) return res.status(404).json({message: "User not found"})
  return res.status(200).json({message: "Urgent, It Please Check"})
})

//update is urgent IT ===================================
export const updateUrgentIt = asyncHandler(async (req,res) => {
  const {id} = req.params
  const user = await User.findByIdAndUpdate(id, {isUrgent: false})
  if(!user) return res.status(404).json({message: "User not found"})
  return res.status(200).json({message: "Urgent successfully solved"})
})

// get all users =========================================
export const allUsers = asyncHandler(async(req, res) => {
  try {
    const users = await User.find()
    return res.status(200).json(users)
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
})

//it update is online ======================
export const updateItIsOnline = asyncHandler(async(req, res) => {
  const {username} = req.query
  const user = await User.findOne({username})
  if(!user) return res.status(404).json({message: "User not found"})

  if(user.department === "ADMIN" && !user.isTv) {
    user.isOnline = false
    await user.save()
    return res.status(200).json({message: "Successfully offline"})
  } else {
    return res.status(500).json({message: "Unauthorize"})
  }
})