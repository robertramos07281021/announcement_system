/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux"
import { useGetAllAnnouncementQuery, useNewAnnouncementMutation, useUpdateTvVideoMutation } from "../../redux/api/announcement"
import { useEffect, useState } from "react"
import { Confirmation } from "../components/Confirmation"
import { Notification } from "../components/Notification"
import { setAnnouncement } from "../../redux/features/announcement/announcementSlice"



export const CampaignDashboard = () => {
  const {userInfo, token} = useSelector((state)=> state.auth)
  const {announcement} = useSelector((state)=> state.announcement)
  const {data: allAnnouncement, refetch:allAnnouncmenerRefetch} = useGetAllAnnouncementQuery()
  const aa = allAnnouncement?.filter((aa)=> aa.user == userInfo._id )
  const [file, setFile] = useState({})
  const [confirmationNew, setConfirmationNew] = useState(false)
  const [required, setRequired] = useState(false)
  const [newAnnouncement,{isLoading}] = useNewAnnouncementMutation()
  const [successAdd, setSuccessAdd] = useState(false)
  const dispatch = useDispatch()
  const [updateTvVideo] = useUpdateTvVideoMutation()
  const [confirmationUpdate, setConfirmationUpdate] = useState(false)
  const [requiredUpdate, setRequiredUpdate] = useState(false)
  const [successUpdate, setSuccessUpdate] = useState(false)
  const [fileUpdate, setFileUpdate] = useState({})

//new announcement =============================================
  const handleConfirmation = ()=> {
    if(file.name === undefined) {
      setRequired(true)
    } else {
      setConfirmationNew(true)
      setRequired(false)
    }
  }
  useEffect(()=> {
    dispatch(setAnnouncement({...aa}))
  },[allAnnouncement])

  const formData = new FormData()
  formData.append('video',file)

  const handleSubmitNew = async()=> {
    const res = await newAnnouncement({data:formData, token})
    if(!res.error) {
      setRequired(false)
      setConfirmationNew(false)
      setSuccessAdd(true)
      allAnnouncmenerRefetch()
    }
  }
// ================================================================

// update announcment ============================================
  const handleConfirmationUpdate = ()=> {
    if(fileUpdate.name === undefined) {
      setRequiredUpdate(true)
    } else {
      setConfirmationUpdate(true)
      setRequiredUpdate(false)
    }
  }

  const formDataUpdate = new FormData()
  formDataUpdate.append('video',fileUpdate)
  const handleSubmitUpdate = async()=> {
    const res = await updateTvVideo({data:formDataUpdate , id: announcement[0]?._id, token })
    if(!res.error) {
      setRequiredUpdate(false)
      setConfirmationUpdate(false)
      setSuccessUpdate(true)
      allAnnouncmenerRefetch()
    }
  }
// ==================================================================

  return (
    <>
      <main className="h-full m-2 rounded-md flex items-center justify-center bg-white">
        {
          aa?.length === 0 ? (
            <div className="flex flex-col gap-5 items-center justify-center">
              {
                !isLoading ? (
                  <>
                    <h1 className="text-center text-3xl font-bold">Add Your Video</h1> 
                    <p>No spacing or change space into underscore on file name.</p>
                    <label className={`border-8 border-dashed h-52 w-52 flex items-center justify-center cursor-pointer ${required ? "border-red-500" : ""}`}>
                      <div className="flex flex-col items-center">
                        <i className="bi bi-cloud-plus-fill text-slate-400 text-7xl"></i>
                        <p className="text-3xl font-bold text-slate-400">Uploads</p>
                      </div>
                      <input type="file" accept="video/*" onChange={(e)=> setFile(e.target.files[0])} hidden/>
                    </label>
                    <button className="text-2xl border-2 font-bold text-white bg-blue-500 border-blue-500 hover:text-blue-500 hover:bg-white px-10 rounded py-2 duration-200 ease-in-out" onClick={handleConfirmation}>Submit</button>
                  </>
                ) : (
                  <div className="flex flex-col justify-center items-center">
                    <p className="text-2xl font-black animate-pulse">Loading</p>
                    <div className="w-20 h-20 border-8 border-black border-dotted rounded-full animate-spin"></div>
                  </div>
                )
              }
            </div>
          ) : (
          <div className="flex gap-10 items-center">
            <div className="">
              <video className="w-96 h-72" src={`/uploads/${announcement[0]?.video}`} autoPlay muted loop>
              </video>
              <p>{announcement[0]?.video}</p>
            </div>
            <div className="flex flex-col justify-center items-center w-96 gap-2">
              <h1 className="text-center text-3xl font-bold ">Update Your Video</h1> 
              <p className="text-center">No spacing or change space into underscore on file name.</p>
              <label className={`border-8 border-dashed h-52 w-52 flex items-center justify-center cursor-pointer ${requiredUpdate ? "border-red-500" : ""}`}>
                <div className="flex flex-col items-center">
                  <i className="bi bi-cloud-plus-fill text-slate-400 text-7xl"></i>
                  <p className="text-3xl font-bold text-slate-400">Uploads</p>
                </div>
                <input type="file" accept="video/*" onChange={(e)=> setFileUpdate(e.target.files[0])} hidden/>
              </label>
              <button className="text-2xl mt-5 border-2 font-bold text-white bg-orange-500 border-orange-500 hover:text-orange-500 hover:bg-white px-10 rounded py-2 duration-200 ease-in-out" onClick={handleConfirmationUpdate}>Submit</button>
            </div>
          </div>
          )
        }
      </main>
      {
        confirmationNew && 
        <Confirmation color="blue" yes={handleSubmitNew} no={()=> setConfirmationNew(false)}>
          New video upload?
        </Confirmation>
      } 
      {
        successAdd &&
        <Notification color="bg-blue-500" transitions={successAdd} success={()=> setSuccessAdd(false)}>
          New Video Successfully Added
        </Notification>
      }
      {
        confirmationUpdate && 
        <Confirmation color="orange" yes={handleSubmitUpdate} no={()=> setConfirmationUpdate(false)}>
          Do you want to update uploaded video?
        </Confirmation>
      } 
      {
        successUpdate &&
        <Notification color="bg-orange-500" transitions={successUpdate} success={()=> setSuccessAdd(false)}>
          Video Successfully Update 
        </Notification>
      }
    </>
  )
}
