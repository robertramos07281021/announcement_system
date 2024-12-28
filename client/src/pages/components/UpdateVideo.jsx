/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { ViewFilesModal } from "./ViewFilesModal"
import {  useGetAnnouncementQuery, useUpdateSecondVideoMutation } from "../../redux/api/announcement"
import { Confirmation } from "./Confirmation"
import { useSelector } from "react-redux"
import { Notification } from "./Notification"

export const UpdateVideo = ({
  isLoadingAnnouncement, 
  isLoadingUpdateImage , 
  isLoadingUpdateTvVideo , 
  isLoadingUpdating,
  confirmationChildren,
  title
}) => {
  const {userInfo,token} = useSelector((state)=> state.auth)
  const [openImage, setOpenImage] = useState(false)
  const handleOpen = ()=> {
    setOpenImage(true)
  }
  const [updateSecond, {isLoading}] = useUpdateSecondVideoMutation()
  const [file, setFile] = useState({})
  const [update, setUpdate] = useState(false)
  const [required, setRequired] = useState(false)
  const {data, refetch} = useGetAnnouncementQuery(userInfo._id)
  const [success, setSuccess] = useState(false)
  
  const handleUpdate = ()=> {
    if(file?.name === undefined) {
      setRequired(true)
    } else {
      setRequired(false)
      setUpdate(true)


    }
  }
  const formData = new FormData()
  formData.append('second_video',file)

  const handleSubmit = async() => {
    const res = await updateSecond({id: data._id, data: formData, token})
    if(!res.error) {
      refetch()
      setRequired(false)
      setUpdate(false)
      setSuccess(true)
    }
  }

  useEffect(()=> {
    isLoadingUpdating(isLoading)
    console.log(isLoading)
  },[isLoading])

  return (
    <>
      {
        !isLoadingAnnouncement && !isLoadingUpdateImage && !isLoadingUpdateTvVideo && !isLoading ? (
          <>
            <div className="flex flex-col ">
              <h1 className="text-2xl font-semibold">{title}</h1>
              <label  className="cursor-pointer mb-2">
                <div className={`h-52 border-2 ${required ? "border-red-500" : ""} rounded flex flex-col items-center justify-center`}>
                  <div className="w-24 h-24 rounded-full border-4 border-dashed flex items-center justify-center border-black">
                  <i className="bi bi-cloud-plus-fill text-5xl"></i>
                  </div>
                  <h1 className="font-bold">Uploads</h1>
                </div>
                <input type="file" accept="video/*" onChange={(e)=> setFile(e.target.files[0])} hidden/>
              </label>
              <button className="border-2 border-orange-500 rounded bg-orange-500 text-white font-bold text-2xl h-full hover:bg-white hover:text-orange-500 duration-200 ease-in-out" onClick={handleUpdate}>Update</button>
            </div>
            <div className="rounded border-2" >
              {
                data?.second_video ? (
                  <video src={`/uploads/${data?.second_video}`} onClick={handleOpen} className="cursor-pointer w-full h-full"></video>
                ) : (
                  <div className="flex items-center justify-center w-full h-full font-bold text-xl">No Video Uploded</div>
                )
              }
              
            </div>
          </>
        ) : (
          <div className="col-span-2 flex flex-col items-center justify-center">
            asdddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
            <p className="text-2xl font-black animate-pulse">Loading</p>
            <div className="border-8 border-black rounded-full animate-spin w-20 h-20 border-dotted"></div>
          </div>
        )
      }
      {
        openImage && 
        <ViewFilesModal close={()=> setOpenImage(false)} title="Video" src={data?.second_video}/>
       

      }
      {
        update && !isLoading && 
        <Confirmation color="orange" yes={handleSubmit} no={()=> setUpdate(false)}>
          {/* You want to update IT Advisory into video? */}
          {confirmationChildren}
        </Confirmation>
      }
      {
        success && 
        <Notification color="bg-orange-500" transitions={success} success={()=> setSuccess(false)}>
          Announcement successfully update
        </Notification>
      }
    </>
  )
}
