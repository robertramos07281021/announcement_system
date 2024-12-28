/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { ViewFilesModal } from "./ViewFilesModal"
import { Confirmation } from "./Confirmation"
import { useGetAnnouncementQuery, useUpdateAnnouncementImageMutation } from "../../redux/api/announcement"
import { useSelector } from "react-redux"
import { Notification } from "./Notification"


export const UpdateImages = ({
  isLoadingAnnouncement, 
  isLoadingUpdating , 
  isLoadingUpdateSecondVideo , 
  isLoadingUpdateTvVideo,
  confirmationChildren,
  notificationChildren,
  title
}) => {
  const {userInfo,token} = useSelector((state)=> state.auth)
  const [openImage, setOpenImage] = useState(false)
  const {data, refetch} = useGetAnnouncementQuery(userInfo._id)
  const [updateImage,{isLoading}] = useUpdateAnnouncementImageMutation()
  const [file, setFile] = useState({})
  const formData = new FormData()
  formData.append('images',file)
  const [isUpdate, setIsUpdate] = useState(false)
  const [required, setRequired] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleOpen = ()=> {
    setOpenImage(true)
  }
  const handleIsUpdate = ()=> {
    if(file?.name !== undefined) {
      setIsUpdate(true)
      setRequired(false)
    } else {
      setRequired(true)
    }
  }
  const handleSubmit = async()=> {
    const res = await updateImage({id:data._id, data: formData, token})
    if(!res.error) {
      refetch()
      setRequired(false)
      setIsUpdate(false)
      setSuccess(true)
    }
  }
  useEffect(()=> {
    isLoadingUpdating(isLoading)
  },[isLoading])

  return (
    <>
      {
        !isLoadingAnnouncement && !isLoading && !isLoadingUpdateSecondVideo && !isLoadingUpdateTvVideo  ? (
        <>
          <div className="flex flex-col ">
            <h1 className="text-2xl font-semibold">{title}</h1>
            <label  className="cursor-pointer mb-2">
              <div className={`h-52 border-2  rounded flex flex-col items-center justify-center ${required ? "border-red-500" : ""}`}>
                <div className="w-24 h-24 rounded-full border-4 border-dashed flex items-center justify-center border-black">
                <i className="bi bi-cloud-plus-fill text-5xl"></i>
                </div>
                <h1 className="font-bold">Uploads</h1>
              </div>
              <input type="file" onChange={(e)=> setFile(e.target.files[0])} accept="image/*" hidden />
            </label>
            <button className="border-2 border-orange-500 rounded bg-orange-500 text-white font-bold text-2xl h-full hover:bg-white hover:text-orange-500 duration-200 ease-in-out" onClick={handleIsUpdate}>Update</button>
          </div>
          <div className="rounded border-2 " >
            {
              data?.image ? (
                
                <img src={`/uploads/${data?.image}`} alt="images_upload" className="cursor-pointer w-full h-full" onClick={handleOpen}/>
              ) : (
                <div className="flex items-center justify-center w-full h-full font-bold text-xl">No Image Uploded</div>
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
        <ViewFilesModal close={()=> setOpenImage(false)} title="Image" src={data?.image}/>
 
      }
      {
        isUpdate && !isLoading && 
        <Confirmation color="orange" yes={handleSubmit} no={()=> {setIsUpdate(false); setFile({})}}>
          {confirmationChildren}
        </Confirmation>
      }
        {
        success && 
        <Notification color="bg-orange-500" transitions={success} success={()=> setSuccess(false)}  >
          {notificationChildren}
        </Notification>
      }
    </>
    )
}
