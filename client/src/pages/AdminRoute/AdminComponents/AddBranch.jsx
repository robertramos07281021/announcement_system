/* eslint-disable react/prop-types */
import { useState } from "react"
import { useAddBranchMutation } from "../../../redux/api/branch"
import { Confirmation } from "../../components/Confirmation"
import { Notification } from "../../components/Notification"

export const AddBranch = ({refetch}) => {
  const [branch, setBranch] = useState('')
  const [addBranch] = useAddBranchMutation()
  const [confirmation, setConfirmation] = useState(false)
  const [required, setRequired] = useState(false)
  const [success, setSuccess] = useState(false)
  
  const handleConfirm = ()=> {
    if(branch.trim() === "") {
      setRequired(true)
    } else {
      setConfirmation(true)
      setRequired(false)
    }
  }

  const handleSubmit = async() => {
    const res = await addBranch({name: branch})
    if(!res.error) {
      setBranch("")
      setConfirmation(false)
      setRequired(false)
      setSuccess(true)
      refetch()
    }
  }

  return (
    <>
      <div className="bg-white rounded-md gap-5 flex flex-col items-center justify-center px-20">
        <h1 className="text-2xl font-bold">Add Branch</h1>
        <label className="w-full">
          <span className="text-lg font-semibold">Branch Name</span>
          <input type="text" value={branch} onChange={(e)=> setBranch(e.target.value)} className={`w-full border-2  ${required ? "border-red-500" : "border-slate-300" } rounded-md p-2`}/>
        </label>
        <div >
          <button className="text-lg font-bold text-white bg-blue-500 border-2 border-blue-500 hover:text-blue-500 hover:bg-white py-1 px-10 rounded-md duration-200 ease-in-out" onClick={handleConfirm}>Submit</button>
        </div>
      </div> 
      {
       confirmation &&
       <Confirmation color="blue" yes={handleSubmit} no={()=> setConfirmation(false)}>
        You Add New Department?
       </Confirmation>
      }
      {
        success && 
        <Notification color="bg-blue-500" transitions={success} success={()=> setSuccess(false)}>
          New Advisory Successfully Added
        </Notification>
      }
    </>
  )
}