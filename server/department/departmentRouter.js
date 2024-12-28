import {Router} from "express"
import { addDept, deleteDept, updateDept, allDepts } from "./departmentController.js"
const router = Router()

router.post("/add-dept", addDept)
router.delete("/delete-dept/:id", deleteDept)
router.put("/update-dept/:id", updateDept)
router.get("/all-depts", allDepts)

export {router as DeptRouter}