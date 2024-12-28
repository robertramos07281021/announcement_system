/* eslint-disable react/prop-types */
import { useState } from "react"
import { useSelector } from "react-redux"
import { useNewAnnouncementMutation } from "../../../redux/api/announcement"
import { Confirmation } from "../../components/Confirmation"
import { Notification } from "../../components/Notification"



export const NewAnnouncement = ({refetch}) => {
  const [announcement, setAnnouncement] = useState('')
  const [required, setRequired] = useState(false)
  const {token} = useSelector((state)=> state.auth)
  const [newAnnouncement, {isLoading}] = useNewAnnouncementMutation()
  const [confirmation, setConfirmation] = useState(false)
  const [success, setSuccess] = useState(false)
  const handleModal = () => {
    if(announcement.trim() === "") {
      setRequired(true)
    } else {
      setRequired(false)
      setConfirmation(true)
    }
  }
 
  const handleSubmit = async()=> {
    const res = await newAnnouncement({data: {announcement: announcement}, token})
    if(!res.error) {
      setRequired(false)
      setConfirmation(false)
      setAnnouncement('')
      setSuccess(true)
      refetch()
    }
  }
  return (
    <>
    {
      !isLoading ? (
      <div className="row-span-2 col-span-2 bg-white rounded flex items-center justify-center">
        <div className="h-4/6 w-4/12 flex flex-col gap-4">
          <h1 className="text-center text-4xl font-bold">New Announcement</h1>
          <textarea value={announcement} onChange={(e)=> setAnnouncement(e.target.value)} className={`w-full border-2 rounded h-52 resize-none p-2${required ? " border-red-500" : ""}`}></textarea>
          <div className="flex  justify-center my-2">
            <button className="text-xl py-2 border-2 border-green-500 bg-green-500 text-white hover:text-green-500 hover:bg-white font-bold duration-200 ease-in-out rounded px-16" onClick={handleModal}>Submit</button>
          </div>
        </div>
      </div>
      ) : (
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold animate-pulse">Loading</h1>
        <div className="w-20 h-20 border-8 border-black border-dotted rounded-full animate-spin">
        </div>
      </div>
      )
      }
      {
        confirmation && 
        <Confirmation color="green" yes={handleSubmit} no={()=> setConfirmation(false)}>
          New Announcement
        </Confirmation>
      }
      {
        success && 
        <Notification color="bg-green-500" transitions={success} success={()=> setSuccess(false)}>
          New Announcement Successfully Added
        </Notification>
   
      }
    </>
  )
}


