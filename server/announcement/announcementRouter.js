import {Router} from "express"
import { getAdminAnnouncement, getAllAnnouncement, getAnnouncement, getHrAnnouncement, getOpsAnnouncement, getQaAnnouncement, getTvAnnouncement, newAnnouncment, updateAnnouncement, updateImage, updateSecondVideo, updateVideo } from "./announcementController.js"
import auth from "../../middlewares/auth.js"
import upload from "../../middlewares/multer.js"
const router = Router()

router.post('/new-announcement', auth, upload.single('video'), newAnnouncment)
router.put('/update-video/:id', auth, upload.single('video'), updateVideo)
router.put('/update-image/:id', auth, upload.single('images'), updateImage)
router.put('/update-second-video/:id', auth, upload.single('second_video'), updateSecondVideo)
router.put('/update-announcement/:id', auth, updateAnnouncement)
router.get('/get-user-announcement/:userId', getAnnouncement)
router.get('/get-all-announcement', getAllAnnouncement)
router.get('/get-tv-announcement/:userId', getTvAnnouncement)
router.get('/get-admin-announcement/:userId', getAdminAnnouncement)
router.get('/get-qa-announcement/:userId', getQaAnnouncement)
router.get('/get-hr-announcement', getHrAnnouncement)
router.get('/get-ops-announcement/:userId', getOpsAnnouncement)

export {router as AnnouncementRouter}