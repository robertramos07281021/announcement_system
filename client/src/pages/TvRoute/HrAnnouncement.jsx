import { useEffect, useRef, useState } from "react"
import { useGetHrAnnouncementQuery, useGetTvAnnouncementQuery } from "../../redux/api/announcement"
import { useSelector } from "react-redux"

export const HrAnnouncement = () => {
  const {data:HrAnnouncement,refetch} = useGetHrAnnouncementQuery()
  const {userInfo} = useSelector((state)=> state.auth)
  const {data:tvas, refetch:refetchTvAnnouncement} = useGetTvAnnouncementQuery(userInfo._id)
  const vidRef1 = useRef();
  const vidRef2 = useRef();
  const vid1 = document.getElementById('vid1')
  const vid2 = document.getElementById('vid2')
  const [ firstVideo, setFirstVideo ] = useState('');
  const [ secondVideo, setSecondVideo ] = useState('hidden');

  useEffect(()=> {
    if(vidRef2?.current) {
      if(!vid2?.ended && !vid1?.ended) {
        vidRef1?.current?.play();   
      }
      if(vid1?.ended){
        setFirstVideo("hidden")
        vidRef2?.current?.play();
        vidRef1?.current?.load();
        setSecondVideo("")
      }
      if(vid2?.ended) {
        setSecondVideo("hidden")
        vidRef1.current?.play(); 
        vidRef2.current?.load();
        setFirstVideo("")
      }
    }

  },[vid1?.ended, vid2?.ended, tvas])

  useEffect(()=> {
    refetch()
    refetchTvAnnouncement()
  })
 
  useEffect(()=> {
    document.getElementById("hrAudio").play()
  },[HrAnnouncement])
  return (
    <>
      <div className="bg-white rounded w-full shadow-md shadow-black/20 flex items-center flex-col overflow-hidden">
         {
        tvas?.map((tva,index)=> 
          <video src={`/uploads/${tva.video}`} muted key={tva._id} autoPlay={tvas > 1 ? false : true} ref={index === 0 ? vidRef1 : vidRef2 } id={index === 0 ? "vid1" : "vid2" } loop={tvas.length > 1 ? false : true} className={`h-full ${ index === 0 ? firstVideo : secondVideo}`}></video>
        )
      }
      </div> 
      <div className="bg-white rounded w-full shadow-md shadow-black/20 flex items-center flex-col overflow-hidden">
        <h1 className=" w-full p-1 text-4xl font-bold">HR / ADMIN Announcement</h1>
        {
          HrAnnouncement?.announcement && 
          <p className="w-full px-5 h-full flex items-center justify-center text-center font-semibold text-3xl">
              {HrAnnouncement?.announcement.toUpperCase()}
          </p>
        }
        {
          HrAnnouncement?.second_video &&     
          <div className="flex h-full justify-center items-center">
            <video src={`/uploads/${HrAnnouncement?.second_video}`} className={`w-full`} loop muted autoPlay>
            </video>          
          </div>             
        }
        {
          HrAnnouncement?.image &&                  
          <img src={`/uploads/${HrAnnouncement?.image}`} alt="Hr_Image" className={`h-full`}/>
        }
        <audio hidden controls id="hrAudio">
          <source src="/hrNotify.mp3" type="audio/mpeg" />
        </audio>
      </div> 
    </>
  )
}
