import {Router} from "express"
import { addBranch, allBranches, deleteBranch, updateBranch } from "./branchController.js"
const router = Router()

router.post('/new-branch', addBranch)
router.put('/update-branch/:id', updateBranch)
router.delete('/delete-branch/:id',deleteBranch)
router.get('/all-branches', allBranches)

export {router as BranchRouter}