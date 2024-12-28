import express from "express";
const app = express()
import mongoose from "mongoose"
import { UserRouter } from "./server/users/usersRouter.js";
import { DeptRouter } from "./server/department/departmentRouter.js";
import "dotenv/config.js"
import { AnnouncementRouter } from "./server/announcement/announcementRouter.js";
import { BranchRouter } from "./server/branch.js/branchRouter.js";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/api/users",UserRouter)
app.use('/api/department',DeptRouter)
app.use('/api/announcement', AnnouncementRouter)
app.use('/api/branch', BranchRouter)
app.use("/uploads",express.static(path.join(path.resolve() + "/uploads")))
app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/client/dist/index.html"));
});
mongoose
  .connect("mongodb://127.0.0.1:27017/announcement_revise")
  .then(()=> {
    console.log("Connection on mongodb is on.")
  })
  .catch((err) => {
    console.log(err)
  })

app.listen(process.env.PORT,()=> {
  console.log(`Your application is running on port http://localhost:${process.env.PORT}`)
})
