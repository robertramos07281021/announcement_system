/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux"
import { useGetAllUsersQuery } from "../../redux/api/user"
import { Register } from "./AdminComponents/Register"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { setAllUsers } from "../../redux/features/auth/authSlice"
import { Notification } from "../components/Notification"

export const Accounts = () => {
  const {allUsers} = useSelector((state)=> state.auth)
  const {data: aas, refetch:allUsersRefetch} = useGetAllUsersQuery()
  const dispatch = useDispatch()
  const [successChangePass, setSuccessChangePass] = useState(false)
  const [successShared, setSuccessShared] = useState(false)
  const navigate = useNavigate()
  const [successOffline, setSuccessOffline] = useState(false)
  const [search, setSearch] = useState('')
  const searchQuery = aas?.filter((a)=> a.name.includes(search.toLowerCase()) )

  const handleSearch = (e)=> {
    setSearch(e.target.value)
   
  }

  useEffect(()=> {
    if(search !== "") {
      dispatch(setAllUsers(searchQuery))
    } else {
      dispatch(setAllUsers(aas))
    }
  },[search])
  
  useEffect(()=> {
    if(window.location.search === "?updatedpassword=true") {
      setSuccessChangePass(true)
    }
    if(window.location.search === "?updatedshared=true") {
      setSuccessShared(true)
    }
    if(window.location.search === "?updatedIsOnline=true") {
      setSuccessOffline(true)
    }
    navigate('/accounts')
  },[window.location.search])

  useEffect(()=> {
    dispatch(setAllUsers(aas))
  },[aas])

  useEffect(()=> {
    allUsersRefetch()
  })

  return (
    <>
      <main className="h-full m-2 gap-2 rounded flex">
        <Register refetch={()=> allUsersRefetch()}/>
        <div className="flex flex-col px-5 bg-white w-full h-full rounded">
          <div className="p-2 flex justify-end">
            <input type="text" className="border-2 rounded-s p-1" value={search} onChange={handleSearch} placeholder="Searh Here..." />
          </div>
          <hr className="border-black border"/>
          <div className="grid grid-cols-7 text-center font-bold my-2 divide-x-2 divide-black">
            <div className="col-span-2">Name</div>
            <div>Department</div>
            <div>Branch</div>
            <div>Type</div>
            <div>Username</div>
            <div>Status</div>
          </div>
          <hr className="border-black border"/>
          <div className="w-full h-[73vh] mt-2 px-3 overflow-y-auto">
            {
              allUsers?.map((account) => 
                <Link to="/view-account" state={account} key={account._id} className="grid grid-cols-7 text-center text-sm odd:bg-slate-200 py-2 hover:border-slate-300 border-2 border-white">
                  <div className="col-span-2">{account.name.toUpperCase()}</div>
                  <div>{account.department}</div>
                  <div>{account.branch}</div>
                  <div>{account.isTv ? "TV" : ""}</div>
                  <div>{account.username}</div>
                  <i className={`bi bi-circle-fill ${account.isOnline ? "text-green-500" : ""}`}></i>
                </Link>
              )
            }
          </div>
        </div>
      </main>
      {
        successChangePass && 
        <Notification color="bg-orange-500" transitions={successChangePass} success={()=> setSuccessChangePass(false)}>
          User Password Successfully Changed
        </Notification>
      }
      {
        successShared && 
        <Notification color="bg-orange-500" transitions={successShared} success={()=> setSuccessShared(false)}>
          TV Shared Successfully Changed
        </Notification>
      }
        {
        successOffline &&
        <Notification color="bg-green-500" transitions={successOffline} success={()=> setSuccessOffline(false)}>
          Account Successfully Offline
        </Notification>
      }

    </>
  )
}
