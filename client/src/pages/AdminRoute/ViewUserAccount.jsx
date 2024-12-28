/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useChangePasswordMutation, useUpdateOnlineMutation, useUpdateSharedMutation } from "../../redux/api/user"
import { Confirmation } from "../components/Confirmation"
import { useGetAllDeptQuery } from "../../redux/api/department"

export const ViewUserAccount = () => {

  const {state} = useLocation()
  const [changePass] = useChangePasswordMutation()
  const [confirmation, setConfirmation] = useState(false)
  const [required, setRequired] = useState(false)
  const [notMatch, setNotMatch] = useState(false)
  const {data:allDepts} = useGetAllDeptQuery()
  const [requiredShared, setRequiredShared] = useState(false)
  const [confirmationShared, setConfirmationShared] = useState(false)
  const [updateShared] = useUpdateSharedMutation()
  const [confirmationIsOnline, setConfirmationIsOnline] = useState(false)
  const [updateIsOnline] = useUpdateOnlineMutation()

  const [data, setData] = useState({
    password: "",
    confirmPassword: ""
  })
  const navigate = useNavigate()
  const [shared, setShared] = useState([])
  const handleConfirmation = ()=> {
    if(data.password !== data.confirmPassword) {
      setNotMatch(true)
      setRequired(false)
    } else if(!data.password || !data.confirmPassword) {
      setRequired(true)
      setNotMatch(false)
    } else {
      setConfirmation(true)
      setNotMatch(false)
      setRequired(false)
    }

  }
  console.log(state._id)
  useEffect(()=> {
    setShared(state.shared)
  },[state.shared])

  const handleSubmit = async() => {
    const res = await changePass({id: state._id, data: data})
    if(!res.error){
    
      navigate('/accounts?updatedpassword=true')
    }
  }
  const checkboxDept = document.getElementsByClassName('checkboxDept')
  useEffect(()=> {
    Array.from(checkboxDept).forEach((element)=> {
      if(state?.shared.includes(element.value)){
        element.checked = true;
      }
    })
  },[state?.shared])

  const checkboxonchange = () => {
    const newShared = []
    Array.from(checkboxDept).forEach((element)=> {
      if(element.checked === true){
        newShared.push(element.value)
      } else {
        newShared.toSpliced(newShared.indexOf(element.value),1)
      }
    })
    setShared(newShared)
  }

  const handleChangedShared = ()=> {
    if(shared.length === 0) {
      setRequiredShared(true)
    } else {
      setRequiredShared(false)
      setConfirmationShared(true)
    }
  }

  const handleSubmitShared = async()=> {
    const res = await updateShared({id: state._id, shared: shared})
    if(!res.error) {
      setRequiredShared(false)
      setConfirmationShared(false)
      navigate('/accounts?updatedshared=true')
    }
  }

  const handleIsOnline = () => {
    setConfirmationIsOnline(true)
  }

  const handleSubmitOnline = async() => {
    const res = await updateIsOnline(state._id)
    if(!res.error) {
      setConfirmationIsOnline(false)
      navigate('/accounts?updatedIsOnline=true')
    }
  }

  return (
    <>
      <main className="h-full m-2 gap-5 flex flex-col justify-center items-center bg-white rounded-md relative">
        <h1 className="text-3xl font-bold">User Information</h1>
        <div className="flex gap-10">

          <div className="flex flex-col gap-4">
            <div>
              <div className="font-semibold">Name:</div>
              <div className="w-96 border-2 rounded p-2">{state.name.toUpperCase()}</div>
            </div>
            <div >
              <div className="font-semibold">Department:</div>
              <div className="w-96 border-2 rounded p-2">{state.department.toUpperCase()}</div>
            </div>
            <div>
              <div className="font-semibold">Branch:</div>
              <div className="w-96 border-2 rounded p-2">{state.branch.toUpperCase()}</div>
            </div>
            <div>
              <div className="font-semibold">Username:</div>
              <div className="w-96 border-2 rounded p-2">{state.username}</div>
            </div>
            <div className="flex itens-center justify-between">
              <div>{state.isOnline ? "Online" : "Offline"}</div>
              {
                state.isOnline &&   
                <button className="w-32 py-2 border-2 rounded-md border-green-500 bg-green-500 text-white hover:text-green-500 hover:bg-white duration-200 ease-in-out font-bold" onClick={handleIsOnline}>Offline</button>
              }
            </div>
          </div>
          
          <div className="flex flex-col gap-4">
            <h1 className="text-xl font-semibold text-center">Reset Password</h1>
            {
              notMatch && 
              <p className="font-semibold text-red-500 text-xs text-center">Not match.</p>
            }

            {
              required && 
              <p className="font-semibold text-red-500 text-xs text-center">All fields are required.</p>
            }
            <label>
              <div className="font-semibold">New Password:</div>
              <input type="text" value={data.password} onChange={(e)=> setData({...data, password: e.target.value})} className="p-2 w-96 border-2 rounded" />
            </label>
            <label>
              <div className="font-semibold">Confirm Password:</div>
              <input type="text" value={data.confirmPassword} onChange={(e)=> setData({...data, confirmPassword: e.target.value})} className="p-2 w-96 border-2 rounded" />
            </label>
            <div className="flex items-center justify-center ">
              <button className="py-2 px-10 border-2 rounded-md border-orange-500 bg-orange-500 text-white hover:text-orange-500 hover:bg-white duration-200 ease-in-out font-bold" onClick={handleConfirmation}> Reset Password </button>
            </div>
          </div>
          {
            state.isTv && 
            <div className="w-96 flex flex-col  gap-5">
              <div className="text-center font-semibold text-xl">TV Shared</div>
              <div className={`w-full h-52 border-2 ${requiredShared ? "border-red-500" : ""} rounded-md flex flex-wrap gap-2 justify-center overflow-y-auto p-3`}>
                {allDepts?.map((dept) => 
                  <label key={dept._id} className="w-32 flex gap-2">
                    <input type="checkbox" value={dept.name} className="checkboxDept" onChange={checkboxonchange}/>
                    <span>{dept.name}</span>
                  </label>
                )}
                
              </div>
              <div className="flex items-center justify-center">
              <button className="py-2 px-10 border-2 rounded-md border-orange-500 bg-orange-500 text-white hover:text-orange-500 hover:bg-white duration-200 ease-in-out font-bold" onClick={handleChangedShared}> Update Shared </button>
              </div>
            </div>
          }
        </div>
        <Link to="/accounts" className="absolute left-5 top-5 w-24 flex items-center gap-2">
        <i className="bi bi-arrow-left-circle-fill text-3xl"></i>
          <span className="text-2xl ">Back</span>
        </Link>
      </main>
      {
        confirmation &&
        <Confirmation color="orange" yes={handleSubmit} no={()=> setConfirmation(false)}>
          You want to change the password?
        </Confirmation>
      }
      {
        confirmationShared &&
        <Confirmation color="orange" yes={handleSubmitShared} no={()=> setConfirmationShared(false)}>
          You want to change the shared?
        </Confirmation>
      }
      {
        confirmationIsOnline &&
        <Confirmation color="green" yes={handleSubmitOnline} no={()=> setConfirmationIsOnline(false)}>
          Forced offline this account?
        </Confirmation>
      }
    
    </>
  )
}
