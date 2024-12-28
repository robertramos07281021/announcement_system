/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { ViewFilesModal } from "./ViewFilesModal"
import { useSelector } from "react-redux"
import { useGetAnnouncementQuery, useUpdateTvVideoMutation } from "../../redux/api/announcement"
import { Confirmation } from "./Confirmation"
import { Notification } from "./Notification"


export const UpdateTvVideo = ({
  isLoadingAnnouncement, 
  isLoadingUpdateImage, 
  isLoadingUpdating, 
  isLoadingUpdateSecondVideo,
}) => {
  const [openImage, setOpenImage] = useState(false)
  const {userInfo, token} = useSelector((state)=> state.auth)
  const {data, refetch} = useGetAnnouncementQuery(userInfo._id)
  const [file, setFile] = useState({})
  const [confirmation, setConfirmation] = useState(false)
  const [required, setRequired] = useState(false)
  const [updateTvVideo, {isLoading}] = useUpdateTvVideoMutation()
  const [success,setSuccess] = useState(false)
  const handleUpdate = ()=> {
    if(file?.name === undefined) {
      setRequired(true)
    } else {
      setRequired(false)
      setConfirmation(true)
    }
  }
  const handleOpen = ()=> {
    setOpenImage(true)
  }
  const formData = new FormData()
  formData.append('video', file)
  const submitUpdate = async()=> {
    const res = await updateTvVideo({id: data._id,data: formData, token })
    if(!res.error) {
      refetch()
      setRequired(false)
      setConfirmation(false)
      setSuccess(true)
    }
  }
  useEffect(()=> {
    isLoadingUpdating(isLoading)
  },[isLoading])
  return (
    <>
      {
        !isLoadingAnnouncement && !isLoadingUpdateImage && !isLoading && !isLoadingUpdateSecondVideo ? (
        <>
          <div className="flex flex-col ">
            <h1 className="text-2xl font-semibold">Tv Video</h1>
            <label  className="cursor-pointer mb-2">
              <div className={`h-52 border-2 rounded flex flex-col items-center justify-center ${required ? "border-red-500" : ""}`}>
                <div className="w-24 h-24 rounded-full border-4 border-dashed flex items-center justify-center border-black">
                <i className="bi bi-cloud-plus-fill text-5xl"></i>
                </div>
                <h1 className="font-bold">Uploads</h1>
              </div>
              <input type="file" onChange={(e) => setFile(e.target.files[0])} hidden/>
            </label>
            <button className="border-2 border-orange-500 rounded bg-orange-500 text-white font-bold text-2xl h-full hover:bg-white hover:text-orange-500 duration-200 ease-in-out" onClick={handleUpdate}>Update</button>
          </div>
          <div className="rounded border-2" >
            {
              data?.video ? (
                <video src={`/uploads/${data?.video}`} loop autoPlay muted className="w-full h-full cursor-pointer" onClick={handleOpen}/>
              ) : (
                <div className="flex items-center justify-center w-full h-full font-bold text-xl">No Video Uploded</div>
              )
            }
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
        openImage && 
        <ViewFilesModal close={()=> setOpenImage(false)} title="Tv Video" src={data?.video}/>
      }
      {
        confirmation && !isLoading &&
        <Confirmation color="orange" yes={submitUpdate} no={()=> setConfirmation(false)}>
          You want to update your TV Videos?
        </Confirmation>
      }
        {
        success && 
        <Notification color="bg-orange-500" transitions={success} success={()=> setSuccess(false)}  >
          TV video successfully updated
        </Notification>
      }
    </>
  )
}
