import { Router } from "express"
import { allUsers, changePass, login, logout, register, updateIsOnline, updateItIsOnline, updateShared, updateUrgentIt, updateUrgentUsers } from "./usersController.js"
import auth from "../../middlewares/auth.js"
const router = Router()

router.post("/register", register)
router.post("/login", login)
router.post("/logout/:id", logout)
router.put("/update-shared/:id", updateShared)
router.put("/update-is-online/:id", updateIsOnline)
router.put("/change-password/:id", changePass)
router.put("/update-urgent-users", auth, updateUrgentUsers)
router.put("/update-urgent-it/:id", updateUrgentIt)
router.get('/all-users', allUsers)
router.put('/update-is-online-it',updateItIsOnline)

export {router as UserRouter}