import asyncHandler from "../../middlewares/asyncHandler.js";
import Branch from "../../models/branch.js";


//add dept
export const addBranch = asyncHandler(async(req, res) => {
  const {name} = req.body
  console.log('hello')
  try {
    const branch = await Branch.create({name})
    return res.status(200).json(branch)
  } catch (error) {
    return res.status(500).json({error: error.messsage})
  }
})

//delete dept
export const deleteBranch = asyncHandler(async(req, res) => {
  const {id} = req.params
  const deleteBranch = await Branch.findByIdAndDelete(id)
  if(!deleteBranch) return res.status(404).json({message: "Branch not found"})
  return res.status(200).json({message: "Branch successfully deleted"})
})

//update dept
export const updateBranch = asyncHandler(async(req, res) => {
  const {id} = req.params
  const {name} = req.body
  const updateBranch = await Branch.findByIdAndUpdate(id,{name})
  if(!updateBranch) return res.status(404).json({message: "Branch not found"})
  return res.status(200).json({message: "Branch successfully updated"})
})

// get all depts
export const allBranches = asyncHandler(async(req, res) => {
  try {
    const branches = await Branch.find()
    return res.status(200).json(branches)
  } catch (error) {
    return res.status(500).json({error: error.message})    
  }
})



