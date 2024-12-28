/* eslint-disable react/prop-types */
import { useState } from "react"
import { useGetAllDeptQuery } from "../../../redux/api/department"
import { useGetAllBranchQuery } from "../../../redux/api/branch"
import { useCreateAccountMutation } from "../../../redux/api/user"
import { Confirmation } from "../../components/Confirmation"
import { Notification } from "../../components/Notification"

export const Register = ({refetch}) => {
  const {data:allDepts} = useGetAllDeptQuery()
  const {data:allBranches} = useGetAllBranchQuery()
  const [createAccount] = useCreateAccountMutation()
  const [confirmation, setConfirmation] = useState(false)
  const [required, setRequired] = useState(false)
  const sharedChecked = document.getElementsByClassName("sharedChecked")
  const [notMatch, setNotMatch] = useState(false)
  const [success, setSuccess] = useState(false)
  const [eye, setEye] = useState(false)
  const [eyeConfirm, setEyeConfirm] = useState(false)
  const [data, setData] = useState({
    name: "",
    department: "",
    branch: "",
    isTv: false,
    username: "",
    password: "",
    confirmPassword: "",
    shared: []
  })
  
  const handleConfirmation = ()=> {
    if(!data.name || !data.department || !data.branch || !data.username || !data.password || !data.confirmPassword  ) {
      setRequired(true)
      setNotMatch(false)
    } else if (data.password !== data.confirmPassword) {
      setRequired(false)
      setNotMatch(true)
    } else {
      setRequired(false)
      setNotMatch(false)
      setConfirmation(true)
    }
  }

  const handleSubmit = async() => {
    if(!data.isTv) {
      setData({...data, shared: []})
    }
    setTimeout(async()=> {
      const res = await createAccount(data)
      if(!res.error) {
        setConfirmation(false)
        setRequired(false)
        setNotMatch(false)
        setData({
          name: "",
          department: "",
          branch: "",
          isTv: false,
          username: "",
          password: "",
          confirmPassword: "",
          shared: []
        })
        setSuccess(true)
        refetch()
        setTimeout(()=> {
          Array.from(sharedChecked).forEach((element)=> {
            element.checked = false
          })
        })
      }
    })
  }
  
  const handleCheck = ()=> {
    const shared = []
    Array.from(sharedChecked).forEach((element)=> {
      if(element.checked === true){
        shared.push(element.value)
      } else {
        shared.toSpliced(shared.indexOf(element.value),1)
      }
    })
    setData({...data, shared: shared})
  }

  return (
    <>
      <div className="px-10 py-2 w-4/12 flex flex-col justify-center item-center bg-white rounded-md shadow-md shadow-black/50">
        <h1 className="text-2xl font-bold text-center">New Accounts</h1>
        {
          required &&
          <p className="text-xs font-semibold text-red-500 text-center">All fields are required.</p>
        }
        <div className="flex flex-col gap-2 w-full">
          <label className="w-full">
            <span className="font-semibold">Name :</span>
            <input type="text" value={data.name} onChange={(e)=> setData({...data, name: e.target.value})} className="w-full border-2 rounded-md p-1" />
          </label>
          <div className="flex gap-2">
          <label className="w-full">
            <span className="font-semibold">Branch :</span>
            <select value={data.branch} onChange={(e)=> setData({...data, branch: e.target.value})} className="w-full border-2 rounded-md p-1 cursor-pointer" >
              <option value="">Select Branch</option>
              {
                allBranches?.map((branch)=> <option key={branch._id} value={branch.name}>{branch.name}</option>)
              }
            </select>
          </label>
          <label className="w-full">
            <span className="font-semibold">Department :</span>
            <select value={data.department} onChange={(e)=> setData({...data, department: e.target.value})} className="w-full border-2 rounded-md p-1 cursor-pointer">
              <option value="">Select Dept</option>
              {
                allDepts?.map((dept)=> <option key={dept._id} value={dept.name}>{dept.name}</option>)
              }
            </select>
          </label>
          </div>
          <div className="flex flex-col w-full">
            <label className="flex gap-2">
              <input type="checkbox" checked={data.isTv} onChange={()=> {setData({...data, isTv: !data.isTv})}}/>
              <span className="font-semibold">TV</span>
            </label>
            {data.isTv &&
              <div className=" ">
                <p className="font-semibold">Shared: <span className="text-xs">Select two only</span></p>
                <div className="h-28 border-2 p-1 flex flex-wrap items-center justify-center overflow-y-auto rounded-md gap-1">
                  {
                    allDepts?.map((dept) => <label key={dept._id} className="w-36  flex gap-2">
                      <input type="checkbox" value={dept.name} className="sharedChecked" onChange={handleCheck}/>
                      <span>{dept.name}</span>
                    </label>)
                  }
                </div>
              </div>
            }
          </div>
          <label className="w-full" >
            <span className="font-semibold">Username :</span>
            <input type="text" value={data.username} onChange={(e)=> setData({...data, username: e.target.value})} className="border-2 w-full rounded-md p-1" />
          </label>
          <label className="w-full relative" >
            <span className="font-semibold">Password :</span>
            <input type={`${eye ? "text" : "password"}`} value={data.password} onChange={(e)=> setData({...data, password: e.target.value})} className="border-2 w-full rounded-md p-1" />
            <i className={`bi bi-eye-fill absolute top-7 right-3  text-xl ${eye && "hidden"} `} onClick={()=> setEye(true)}></i>
            <i className={`bi bi-eye-slash-fill absolute top-7 right-3 text-xl ${!eye && "hidden"} `} onClick={()=> setEye(false)}></i>
          </label>
          {
            notMatch &&
            <p className="text-xs font-semibold text-red-500">Not match on password.</p>
          }
          <label className="w-full relative" >
            <span className="font-semibold">Confirm Password :</span>
            <input type={`${eyeConfirm ? "text" : "password"}`} value={data.confirmPassword} onChange={(e)=> setData({...data, confirmPassword: e.target.value})} className="border-2 w-full rounded-md p-1" />
            <i className={`bi bi-eye-fill absolute top-7 right-3  text-xl ${eyeConfirm && "hidden"} `} onClick={()=> setEyeConfirm(true)}></i>
            <i className={`bi bi-eye-slash-fill absolute top-7 right-3 text-xl ${!eyeConfirm && "hidden"} `} onClick={()=> setEyeConfirm(false)}></i>
          </label>
          <div className="flex justify-center mt-2">
            <button className="py-2 border-2 px-10 rounded bg-blue-500 text-white font-bold border-blue-500 hover:text-blue-500 hover:bg-white duration-200 ease-in-out" onClick={handleConfirmation}>Submit</button>
          </div>
        </div>
      </div>
      {
        confirmation &&
        <Confirmation color="blue" yes={handleSubmit} no={()=> setConfirmation(false)}>
          Do you want to create this account?
        </Confirmation >
      } 
      {
        success && 
        <Notification color="bg-blue-500" transitions={success} success={()=> setSuccess(false)}>
          New Account Successfully Added
        </Notification>
      }
    </>
  )
}
