/* eslint-disable react/prop-types */

import { useState } from "react"
import { useSelector } from "react-redux"
import { useUpdateBranchMutation } from "../../../redux/api/branch"
import { Confirmation } from "../../components/Confirmation"



export const UpdateBranch = ({cancel, refetch, success}) => {
  const {branch} = useSelector((state) => state.branch)
  const [updateName, setUpdateName] = useState(`${branch?.name}`)
  const [confirmation, setConfirmation] = useState(false)
  const [updateBranch] = useUpdateBranchMutation()
  const [required, setRequired] = useState(false)


  const handleConfirmation = () => {
    if(updateName.trim() === "") {
      setRequired(true)
    } else {
      setConfirmation(true)
      setRequired(false)
    }
  }

  const handleSubmit = async() => {
    const res = await updateBranch({id: branch._id, name: updateName})
    if(!res.error) {
      setConfirmation(false)
      setRequired(false)
      refetch()
      success()
      cancel()
      
    }
  }

  return (
    <>
      <div className="bg-white rounded-md gap-5 flex flex-col items-center justify-center px-20">
        <h1 className={`text-2xl font-bold `}>Update Branch</h1>
        <label className="w-full">
          <span className="text-lg font-semibold">Branch Name</span>
          <input type="text" value={updateName} onChange={(e)=> setUpdateName(e.target.value)} className={`w-full border-2 ${required ? "border-red-500" : ""} rounded-md p-2`}/>
        </label>
        <div className="flex gap-5">
          <button className="text-lg font-bold text-white bg-orange-500 border-2 border-orange-500 hover:text-orange-500 hover:bg-white py-1 w-32 rounded-md duration-200 ease-in-out" onClick={handleConfirmation}>Update</button>
          <button className="text-lg font-bold text-white bg-slate-500 border-2 border-slate-500 hover:text-slate-500 hover:bg-white py-1 w-32 rounded-md duration-200 ease-in-out" onClick={cancel} >Cancel</button>
        </div>
      </div> 
      {confirmation &&
        <Confirmation color="orange" yes={handleSubmit} no={()=> setConfirmation(false)}> Are you sure you want to Update this branch?
        </Confirmation>
      }
    </>
  )
}
