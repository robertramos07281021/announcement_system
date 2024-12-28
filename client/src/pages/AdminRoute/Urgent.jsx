import { useDispatch, useSelector } from "react-redux"
import { useGetAllUsersQuery, useUpdateUrgentItMutation } from "../../redux/api/user"
import { useState } from "react"
import { Confirmation } from "../components/Confirmation"
import { setUser } from "../../redux/features/auth/authSlice"
import { Notification } from "../components/Notification"


export const Urgent = () => {
  const {data:allUsers} = useGetAllUsersQuery()
  const {userInfo,user} = useSelector((state)=> state.auth)
  const [updateUrgentIt] = useUpdateUrgentItMutation()
  const [confirmation, setConfirmation] = useState(false)
  const [notification, setNotification] = useState(false)
  const dispatch = useDispatch()
  const handleConfirmation = (user)=> {
    setConfirmation(true)
    dispatch(setUser(user))
  }

  const handleSubmit = async() => {
    const res = await updateUrgentIt(user._id)
    if(!res.error) {
      setConfirmation(false)
      setNotification(true)
    }
  }

  return (
    <>
      <main className="h-full m-2 gap-5 flex  items-center bg-white rounded-md flex-col">
        <h1 className="text-3xl font-bold m-10">Urgents</h1>
        <div className="w-8/12 h-[450px] flex flex-wrap gap-x-20 justify-center items-center ">
          {
            allUsers?.map((user)=> 
              (user.branch === userInfo?.branch && user.department !== "ADMIN" && !user.isTv) &&
              <div key={user._id} className="relative flex items-center w-24 h-9 justify-center">
                { user.isUrgent ? (
                  <>
                    <div className=" w-24 h-9 top-0 border  bg-red-500 animate-ping rounded-md"></div>
                    <button className="border-2 rounded border-red-500 py-2 w-32 bg-red-500 absolute text-white  font-bold duration-200 ease-in-out hover:text-red-500 hover:bg-white" onClick={()=> handleConfirmation(user)}>{user.department}</button>
                  </> ) : (
                    <div className="border-2 rounded border-green-500 py-2 w-32 bg-green-500 absolute text-white  font-bold text-center">{user.department}</div>
                  )
                }
              </div>
            )
          }
          
        </div>
      </main>
      {
        confirmation && 
        <Confirmation color="red" yes={handleSubmit} no={()=>   setConfirmation(false)}>
          You resolve the urgent on this department?
        </Confirmation>
      }
      {
        notification &&
        <Notification color="bg-red-500" transitions={notification} success={()=> setNotification(false)}>
          Urgent Successfully Resolve
        </Notification>
      }
    </>
  )
}
