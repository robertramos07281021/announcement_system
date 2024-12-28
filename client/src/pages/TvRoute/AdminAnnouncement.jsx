/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState} from "react"
import { useGetAdminAnnouncementQuery } from "../../redux/api/announcement"
import { useSelector } from "react-redux"

export const AdminAnnouncement = () => {
  const {userInfo} = useSelector((state)=> state.auth)
  const {data:adminAnnouncement, refetch} = useGetAdminAnnouncementQuery(userInfo._id)
  const [newAnnounce,setNewAnnounce] = useState(false)
  const ITAudio = document.getElementById("ITAudio")
  useEffect(()=> {
    refetch()
  })
  
  useEffect(()=> {
    setNewAnnounce(true)
    setTimeout(()=> {
      ITAudio?.play()
    })

  },[adminAnnouncement])

  useEffect(()=> {
    if(ITAudio?.ended) {
      setNewAnnounce(false)
    }
  },[ITAudio])

  return (
    <div className="bg-white rounded shadow-md shadow-black/20 flex flex-col overflow-hidden">
      <h1 className=" w-full p-1 text-4xl font-bold">IT Advisory</h1>
      {
        adminAnnouncement?.announcement && 
        <p className="w-full px-5 h-full flex items-center justify-center text-center font-semibold text-xl">
            {adminAnnouncement?.announcement.toUpperCase()}
        </p>
      }
      {
        adminAnnouncement?.second_video &&     
        <div className="flex h-full justify-center items-center">
          <video src={`/uploads/${adminAnnouncement?.second_video}`} className={`w-full`} loop muted autoPlay>
          </video>          
        </div>             
      }
      {
        adminAnnouncement?.image &&                  
        <img src={`/uploads/${adminAnnouncement?.image}`} alt="Hr_Image" className={`h-72 w-full`}/>
      }
      {
        newAnnounce && 
        <audio hidden controls id="ITAudio">
          <source src="/itAdvisory.mp3" type="audio/mpeg" />
        </audio>
      }
    </div> 
  )
}
