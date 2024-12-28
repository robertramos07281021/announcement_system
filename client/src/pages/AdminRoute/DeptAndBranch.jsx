import { useState } from "react"
import { useDeleteBranchMutation, useGetAllBranchQuery } from "../../redux/api/branch"
import { useDeleteDeptMutation, useGetAllDeptQuery } from "../../redux/api/department"
import { AddBranch } from "./AdminComponents/AddBranch"
import { AddDept } from "./AdminComponents/AddDept"
import { UpdateBranch } from "./AdminComponents/UpdateBranch"
import { useDispatch, useSelector } from "react-redux"
import { setBranch } from "../../redux/features/branch/branchSlice"
import { Notification } from "../components/Notification"
import { Confirmation } from "../components/Confirmation"
import { setDept } from "../../redux/features/department/departmentSlice"
import { UpdateDept } from "./AdminComponents/UpdateDept"

export const DeptAndBranch = () => {
  const {branch} = useSelector((state) => state.branch)
  const {dept} = useSelector((state)=> state.department)
  const {data: branches, refetch:refetchBranch} = useGetAllBranchQuery()
  const {data: depts, refetch:refetchDept} = useGetAllDeptQuery()
  const [isUpdateBranch, setIsUpdateBranch] = useState(false)
  const dispatch = useDispatch()
  const [updateBranchSuccess, setUpdateBranchSuccess] = useState(false)
  const [deleteBranchConfirmation,setDeleteBranchConfirmation ] = useState(false)
  const [delBranch] = useDeleteBranchMutation() 
  const [successDeleteBranch, setSuccessDeleteBranch] = useState(false)
  const [isUpdateDept, setIsUpdateDept] = useState(false)
  const [updateDeptSuccess, setUpdateDeptSuccess] = useState(false)
  const [deleteDeptConfirmation, setDeleteDeptConfirmation] = useState(false)
  const [deleteDept] = useDeleteDeptMutation()
  const [successDeleteDept, setSuccessDeleteDept] = useState(false)

  // update Branch
  const handleUpdateBranch = (branch)=> {
    setIsUpdateBranch(true)
    dispatch(setBranch(branch))
  }

  // delete Branch
  const handleDeleteBranch = (branch)=> {
    setDeleteBranchConfirmation(true)
    dispatch(setBranch(branch))
  }

  //handle Submit Delete Branch
  const handleSubmitDeleteBranch = async() => {
    const res = await delBranch(branch._id)
    if(!res.error) {
      setDeleteBranchConfirmation(false)
      setSuccessDeleteBranch(true)
      refetchBranch()
      setIsUpdateBranch(false)
    }
  }

  //update Dept
  const handleUpdateDept = (dept)=> {
    dispatch(setDept(dept))
    setIsUpdateDept(true)
  }

  //delete dept
  const handleDeleteDept = (dept) => {
    setDeleteDeptConfirmation(true)
    dispatch(setDept(dept))
  }

  //handle submit delete dept
  const handleSubmitDeleteDept = async() => {
    const res = await deleteDept(dept._id)
    if(!res.error) {
      setDeleteDeptConfirmation(false)
      setSuccessDeleteDept(true)
      refetchDept()
      setIsUpdateDept(false)
    }
  }

  return (
    <>
      <main className="h-full p-2 grid grid-cols-3 w-full gap-2 ">
      <div className="grid grid-rows-2 gap-2">
        {isUpdateBranch ? (
          <UpdateBranch 
            success={()=>setUpdateBranchSuccess(true)} 
            refetch={()=> refetchBranch()} 
            cancel={()=> setIsUpdateBranch(false)}
          />
          ) : (
          <AddBranch refetch={()=> refetchBranch()}/>
        )}
        {
          isUpdateDept ? (
            <UpdateDept
              success={()=>setUpdateDeptSuccess(true)} 
              refetch={()=> refetchDept()} 
              cancel={()=> setIsUpdateDept(false)}
            />
          ) : (
            <AddDept refetch={()=> refetchDept()}/>
          )
        }
      </div>

      <div className="bg-white rounded-md h-full p-2 ">
        <div className="relative h-[640px] overflow-y-auto">
          <div className="sticky top-0 bg-white text-3xl p-2">Branches</div>
          {
            branches?.map((branch)=> 
            <div className="flex justify-between px-5 py-1 even:bg-slate-200 hover:border-slate-500 border border-white" key={branch._id}>
              <div>
                {branch.name}
              </div>
              <div className="flex gap-5">
                <i className="bi bi-trash-fill text-red-500 cursor-pointer" onClick={()=> handleDeleteBranch(branch)}></i>
                <i className="bi bi-pencil-square text-green-500 cursor-pointer" onClick={()=> handleUpdateBranch(branch)}></i>
              </div>
            </div>
            )
          }
        </div>
      </div>

      <div className="bg-white rounded-md h-full p-2 ">
        <div className="relative h-[640px] overflow-y-auto">
          <div className="sticky top-0 bg-white text-3xl p-2">Departments</div>
          {
            depts?.map((dept)=> 
            <div className="flex justify-between px-5 py-1 even:bg-slate-200 border border-white hover:border-slate-400" key={dept._id}>
              <div>
                {dept.name}
              </div>
              <div className="flex gap-5">
                <i className="bi bi-trash-fill text-red-500 cursor-pointer" onClick={()=> handleDeleteDept(dept)}></i>
                <i className="bi bi-pencil-square text-green-500 cursor-pointer" onClick={()=> handleUpdateDept(dept)}></i>
              </div>
            </div>
            )
          }
        </div>
      </div>
      </main>
      {
        updateBranchSuccess &&
        <Notification color="bg-orange-500" transitions={updateBranchSuccess} success={()=> setUpdateBranchSuccess(false)}>
          Branch Successfully Updated
        </Notification>
      }
      {
        deleteBranchConfirmation &&
        <Confirmation color="red" yes={handleSubmitDeleteBranch} no={()=> setDeleteBranchConfirmation(false)}>
          You want to delete this department?
        </Confirmation>
      }
      {
        successDeleteBranch &&
        <Notification color="bg-red-500" transitions={successDeleteBranch} success={()=> setSuccessDeleteBranch(false)}>
          Branch Successfully Deleted
        </Notification>
      }
      {
        updateDeptSuccess &&
        <Notification color="bg-orange-500" transitions={updateDeptSuccess} success={()=> setUpdateDeptSuccess(false)}>
          Department Successfully Updated
        </Notification>
      }
      {
        deleteDeptConfirmation &&
        <Confirmation color="red" yes={handleSubmitDeleteDept} no={()=> setDeleteDeptConfirmation(false)}>
          You want to delete this department?
      </Confirmation>
      }
      {
        successDeleteDept && 
        <Notification color="bg-red-500" transitions={successDeleteDept} success={()=> setSuccessDeleteDept(false)}>
          Department Successfully Deleted
        </Notification>
      }
     
    </>
  )
}
