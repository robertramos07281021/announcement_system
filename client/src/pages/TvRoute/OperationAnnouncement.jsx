import { useEffect} from 'react'
import { useGetOpsAnnouncementQuery, useGetQaAnnouncementQuery } from '../../redux/api/announcement'
import { useSelector } from 'react-redux'

export const OperationAnnouncement = () => {
  const {userInfo} = useSelector((state)=> state.auth)
  const {data:opsAnnouncement, refetch} = useGetOpsAnnouncementQuery(userInfo._id)
  const {data:qaAnnouncement, refetch:qaRefetch } = useGetQaAnnouncementQuery(userInfo._id)
  useEffect(()=> {
    refetch()
    qaRefetch()
  })

  useEffect(()=> {
    document.getElementById("opsAudio").play()
  },[opsAnnouncement])

  useEffect(()=> {
    document.getElementById("qaAudio").play()
  },[qaAnnouncement])

  return (
    <>
      <div className="bg-white rounded shadow-md shadow-black/20 flex flex-col overflow-hidden">
        <h1 className=" w-full p-1 text-3xl font-bold">Operations Updates</h1>
        {
          opsAnnouncement?.announcement && 
          <p className="w-full px-5 h-full flex items-center justify-center text-center font-semibold text-xl">
              {opsAnnouncement?.announcement.toUpperCase()}
          </p>
        }
        {
          opsAnnouncement?.second_video &&     
          <div className="flex h-full justify-center items-center">
            <video src={`/uploads/${opsAnnouncement?.second_video}`} className={`w-full`} loop muted autoPlay>
            </video>          
          </div>             
        }
        {
          opsAnnouncement?.image &&                  
          <img src={`/uploads/${opsAnnouncement?.image}`} alt="Hr_Image" className={`h-full`}/>
        }
        <audio hidden controls id="opsAudio">
          <source src="/operationNotify.mp3" type="audio/mpeg" />
        </audio>
      </div>

      <div className="bg-white rounded shadow-md shadow-black/20 flex flex-col overflow-hidden">
        <h1 className=" w-full p-1 text-3xl font-bold">QA Updates</h1>
          {
            qaAnnouncement?.announcement && 
            <p className="w-full px-5 h-full flex items-center justify-center text-center font-semibold text-xl">
                {qaAnnouncement?.announcement.toUpperCase()}
            </p>
          }
          {
            qaAnnouncement?.second_video &&     
            <div className="flex h-full justify-center items-center">
              <video src={`/uploads/${qaAnnouncement?.second_video}`} className={`w-full`} loop muted autoPlay>
              </video>          
            </div>             
          }
          {
            qaAnnouncement?.image &&                  
            <img src={`/uploads/${qaAnnouncement?.image}`} alt="Hr_Image" className={`h-full`}/>
          }
          <audio hidden controls id="qaAudio">
            <source src="/qaNotify.mp3" type="audio/mpeg" />
          </audio>
      </div> 
    </>
  )
}
