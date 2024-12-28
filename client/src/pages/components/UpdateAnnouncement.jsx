/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { useGetAnnouncementQuery, useUpdateAnnouncementMutation } from "../../redux/api/announcement"
import { useSelector } from "react-redux"
import { Confirmation } from "./Confirmation"
import { Notification } from "./Notification"

export const UpdateAnnouncement = ({
  isLoadingUpdating,
  isLoadingUpdateImage,
  isLoadingUpdateTvVideo, 
  isLoadingUpdateSecondVideo,
  confirmationChildren,
  notificationChildren,
  title
}) => {
  const {userInfo,token} = useSelector((state)=> state.auth)
  const [itAdvisory,setItAdvisory] = useState('')
  const {data, refetch} = useGetAnnouncementQuery(userInfo._id)
  const [updateAnnouncment,{isLoading}] = useUpdateAnnouncementMutation()
  const [updateModal, setUpdateModal] = useState('')
  const [required, setRequired] = useState(false)
  const [successfully, setSuccessfully] = useState(false)
  const handleSubmit = ()=> {
    if(itAdvisory.trim() === "") {
      setRequired(true)
    } else {
      setRequired(false)
      setUpdateModal(true)
    }
  }
  useEffect(()=> {
    isLoadingUpdating(isLoading)
  },[isLoading])

  const submitItAdvisory = async()=> {
    const res = await updateAnnouncment({id: data._id, announcement: itAdvisory, token})
    if(!res.error) {
      setRequired(false)
      setUpdateModal(false)
      setItAdvisory('')
      setSuccessfully(true)
    }
  }
  useEffect(()=> {
    refetch()
  })

  return (
    <>
      {
        !isLoading && !isLoadingUpdateImage && !isLoadingUpdateTvVideo && !isLoadingUpdateSecondVideo ?(
        <>
          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold">{title}</h1>
            <label >
              <textarea className={`w-full h-52 border-2 rounded resize-none p-2 ${required ? "border-red-500" : ""}`} value={itAdvisory} onChange={(e) => setItAdvisory(e.target.value)}></textarea>
            </label>
            <button className="border-2 border-orange-500 rounded bg-orange-500 text-white font-bold text-2xl h-full hover:bg-white hover:text-orange-500 duration-200 ease-in-out" onClick={handleSubmit}>Update</button>
          </div>
          <div className="flex text-center items-center justify-center rounded border-2">

            {data?.announcement ? (
              data?.announcement
            ) : (
              <div className="flex items-center justify-center w-full h-full font-bold text-xl">No Announcement</div>
            )}
          </div>
        </>
        ) : (
          <div className="col-span-2 flex flex-col items-center justify-center">
            <p className="text-2xl font-black animate-pulse">Loading</p>
            <div className="border-8 border-black rounded-full animate-spin w-20 h-20 border-dotted"></div>
          </div>
        )
      }
      {
        updateModal && !isLoading &&
        <Confirmation color="orange" yes={submitItAdvisory} no={()=> setUpdateModal(false)}>
          {confirmationChildren}
        </Confirmation>
      }
      {
        successfully && 
        <Notification color="bg-orange-500" transitions={successfully} success={()=> setSuccessfully(false)} >
          {notificationChildren}
        </Notification>
      }
    </>
  )
}
