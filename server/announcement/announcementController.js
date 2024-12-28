import asyncHandler from "../../middlewares/asyncHandler.js";
import Announcement from "../../models/announcement.js";
import User from "../../models/user.js";
import fs from "fs"

//new announcement
export const newAnnouncment = asyncHandler(async(req, res) => {
  const { announcement } = req.body
  const user = await User.findById(req.user)
  if(!user) return res.status(404).json({message: "User not found"})
  let data = {}
  if(user.department === "HR" || user.department === "ADMIN" || user.department === "OPERATIONS" || user.department === "QA") {
    data = { announcement, branch: user.branch, department: user.department, user: user._id }
  } else {
    data = { video: req.file.filename, branch: user.branch, department: user.department, user: user._id }
  }
  try {
    const announcement = await Announcement.create(data)
    return res.status(200).json(announcement)
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
})

//update video
export const updateVideo = asyncHandler(async(req, res) => {
  const {id} = req.params
  const announcement = await Announcement.findById(id)
  if(!announcement) return res.status(404).json({message: "Announcement not found"})
  if(!req.file){
    await announcement.updateOne({video: announcement.video})
    return res.status(200).json({message: "Announcement successfully updated"})
  } else {
    if(announcement.video) {
      fs.unlink(`./uploads/${announcement.video}`, (err) => {
        if(err) {
          return res.status(500).json({error: err})
        }
      })
    }
    try {
      await announcement.updateOne({video: req.file.filename})
      return res.status(200).json({message: "Announcement successfully updated"})
    } catch (error) {
      return res.status(500).json({error: error.message})
    }
  }
})


// update announcment
export const updateAnnouncement = asyncHandler(async(req, res) => {
  const {id} = req.params
  const {announcement} = req.body
  const updateAnnouncement = await Announcement.findById(id)

  if(!updateAnnouncement) return res.status(404).json({message: "Announcement not found"})
    if(updateAnnouncement.image !== "") {
      fs.unlink(`./uploads/${updateAnnouncement.image}`,(err)=> {
        if(err) {
          return res.status(500).json({error: err})
        }
      })
    }
    if(updateAnnouncement.second_video !== "") {
      fs.unlink(`./uploads/${updateAnnouncement.second_video}`,(err)=> {
        if(err) {
          return res.status(500).json({error: err})
        }
      })
    }
    try {
      await updateAnnouncement.updateOne({announcement: announcement, second_video: "", image: ""})
      return res.status(200).json({message: "Announcement successfully updated"})
      
    } catch (error) {
      return res.status(500).json({error: error})
    }
})


// update Image 
export const updateImage = asyncHandler(async(req, res) => {
  const {id} = req.params

  const updateImage = await Announcement.findById(id)
  if(!updateImage) return res.status(404).json({message: "Announcement not found"})
  if(updateImage.second_video) {
    fs.unlink(`./uploads/${updateImage.second_video}`, (err) => {
      if(err) {
        return res.status(500).json({error: err})
      }
    })
  }
  if(req.file) {
    try {
      if(updateImage.image) {
        fs.unlink(`./uploads/${updateImage.image}`,(err)=> {
          if(err) {
            return res.status(500).json({error: err})
          }
        })
      }
      await updateImage.updateOne({announcement: "",image: req.file.filename, second_video: ""})
      return res.status(200).json({message: "Announcement successfully updated"})
    } catch (error) {
      return res.status(500).json({error: error})
    }
  } else {
    try {
      await updateImage.updateOne({announcement: "",image: updateImage.image})
      return res.status(200).json({message: "Announcement successfully updated"})
    } catch (error) {
      return res.status(500).json({error: error})
    }
  }
})

//update Second Video
export const updateSecondVideo = asyncHandler(async(req, res) => {
  const {id} = req.params
  const updateSecondVideo = await Announcement.findById(id)
  if(!updateSecondVideo) return res.status(404).json({message: "Announcement not found"})
  if(updateSecondVideo.image) {
    fs.unlink(`./uploads/${updateSecondVideo.image}`, (err) => {
      if(err) {
        return res.status(500).json({error: err})
      }
    })
  }
  if(req.file) {
    if(updateSecondVideo.second_video) {
      fs.unlink(`./uploads/${updateSecondVideo.second_video}`, (err) => {
        if(err) {
          return res.status(500).json({error: err})
        }
      })
    }
    try {
      await updateSecondVideo.updateOne({announcement: "",second_video: req.file.filename, image: ""})
      return res.status(200).json({message: "Announcement successfully updated"})
    } catch (error) {
      return res.status(500).json({message: error})
    }
  } else {
    try {
      await updateSecondVideo.updateOne({announcement: "",second_video: updateSecondVideo.second_video, image: ""})
      return res.status(200).json({message: "Announcement successfully updated"})
    } catch (error) {
      return res.status(500).json({message: error})
    }
  }
})

//find announcement
export const getAnnouncement = asyncHandler(async(req, res) => {
  const {userId} = req.params
  try {
    const announcement = await Announcement.findOne({user: userId})
    if(!announcement) return res.status(404).json({message: "Announcement Not found"})
    return res.status(200).json(announcement)
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
})

//find all announcement
export const getAllAnnouncement = asyncHandler(async(req,res) => {
  try {
    const getAllAnnouncement = await Announcement.find()
    return res.status(200).json(getAllAnnouncement)
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
})

//find tv announcement
export const getTvAnnouncement = asyncHandler(async (req, res) => {
  const {userId} = req.params
  const user = await User.findById(userId)
  if(!user) return res.status(404).json({message: "User not found"})
  try {
    const announcement = await Announcement.find({$and: [{department: {$in: user.shared}},{branch: {$eq: user.branch}}]})
    return res.status(200).json(announcement)
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
})

//find hr announcement
export const getHrAnnouncement = asyncHandler(async(req, res) => {
  try {
    const announcement = await Announcement.findOne({department: "HR"})
    return res.status(200).json(announcement)
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
})

//find admin announcement
export const getAdminAnnouncement = asyncHandler(async(req,res) => {
  const {userId} = req.params

  const user = await User.findById(userId)
  try {
    const announcement = await Announcement.findOne({$and: [{department: "ADMIN"},{branch: {$eq: user.branch}}]})
    return res.status(200).json(announcement)
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
})

//find operations announcement
export const getOpsAnnouncement = asyncHandler(async(req,res) => {
  const {userId} = req.params

  const user = await User.findById(userId)

  try {
    const announcement = await Announcement.findOne({$and: [{department: "OPERATIONS"},{branch: {$eq: user.branch}}]})
    return res.status(200).json(announcement)
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
})

//find qa announcement
export const getQaAnnouncement = asyncHandler(async(req,res) => {
  const {userId} = req.params

  const user = await User.findById(userId)

  try {
    const announcement = await Announcement.findOne({$and: [{department: "QA"},{branch: {$eq: user.branch}}]})
    return res.status(200).json(announcement)
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
})

