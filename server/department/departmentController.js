import asyncHandler from "../../middlewares/asyncHandler.js";
import Department from "../../models/department.js";

//add dept
export const addDept = asyncHandler(async(req, res) => {
  const {name} = req.body
  try {
    const dept = await Department.create({name})
    return res.status(200).json(dept)
  } catch (error) {
    return res.status(500).json({error: error.messsage  })
  }
})

//delete dept
export const deleteDept = asyncHandler(async(req, res) => {
  const {id} = req.params
  const deleteDept = await Department.findByIdAndDelete(id)
  if(!deleteDept) return res.status(404).json({message: "Department not found"})
  return res.status(200).json({message: "Department successfully deleted"})
})

//update dept
export const updateDept = asyncHandler(async(req, res) => {
  const {id} = req.params
  const {name} = req.body
  const updateDept = await Department.findByIdAndUpdate(id,{name})
  if(!updateDept) return res.status(404).json({message: "Department not found"})
  return res.status(200).json({message: "Department successfully updated"})
})

// get all depts
export const allDepts = asyncHandler(async(req, res) => {
  try {
    const depts = await Department.find()
    return res.status(200).json(depts)
  } catch (error) {
    return res.status(500).json({error: error.message})    
  }
})

