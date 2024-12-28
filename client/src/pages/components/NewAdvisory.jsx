/* eslint-disable react/prop-types */
import { useState } from "react"
import { useNewAnnouncementMutation } from "../../redux/api/announcement"
import { Confirmation } from "./Confirmation"
import { useSelector } from "react-redux"
import { Notification } from "./Notification"

export const NewAdvisory = ({refetch,title}) => {
  const {token} = useSelector((state)=> state.auth)
  const [newAnnouncement, {isLoading}] = useNewAnnouncementMutation()
  const [submitNew, setSubmitNew] = useState(false)
  const [announcement, setAdvisory] = useState("")
  const [required, setRequired] = useState(false)
  const [newAdvisory, setNewAdvisory] = useState(false)

  const handleModal = ()=> {
    if(announcement.trim() === "") {
      setRequired(true)
    } else {
      setRequired(false)
      setSubmitNew(true)
    }
  }

  const submit = async()=> {
    const res = await newAnnouncement({data: {announcement: announcement}, token})
    if(!res.error) {
      refetch()
      setSubmitNew(false)
      setAdvisory("")
      setNewAdvisory(true)
    }
  }

  return (
    <>
      {
        !isLoading ? 
        (
          <div className="h-4/6 w-4/12 flex flex-col gap-4">
            <h1 className="text-center text-4xl font-bold">{title}</h1>
            <textarea value={announcement} onChange={(e)=> setAdvisory(e.target.value)} className={`w-full border-2 rounded h-52 resize-none p-2${required ? " border-red-500" : ""}`}></textarea>
            <div className="flex  justify-center my-2">
              <button className="text-xl py-2 border-2 border-green-500 bg-green-500 text-white hover:text-green-500 hover:bg-white font-bold duration-200 ease-in-out rounded px-16" onClick={handleModal}>Submit</button>
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
        submitNew &&
        <Confirmation color="green" yes={submit} no={()=> setSubmitNew(false)}>
          New It Advisory?
        </Confirmation>
      }
      {
        newAdvisory &&
        <Notification color="bg-green-500" transitions={newAdvisory} success={()=> setNewAdvisory(false)}>
          New Advisory Successfully Added
        </Notification>
      }
    </>
  )
}
