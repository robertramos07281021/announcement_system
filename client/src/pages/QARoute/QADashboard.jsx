import { useSelector } from "react-redux"
import { useGetAllAnnouncementQuery } from "../../redux/api/announcement"
import { UpdateAnnouncement } from "../components/UpdateAnnouncement"
import { UpdateImages } from "../components/UpdateImages"
import { UpdateTvVideo } from "../components/UpdateTvVideo"
import { UpdateVideo } from "../components/UpdateVideo"
import { NewAdvisory } from "../components/NewAdvisory"
import { useState } from "react"

export const QADashboard = () => {
  const {userInfo} = useSelector((state)=> state.auth)
  const {data: allAnnouncement, refetch} = useGetAllAnnouncementQuery()
  const aa = allAnnouncement?.filter((aa)=> aa.user == userInfo._id )
  const [isLoadingAnnouncement, setIsLoadingAnnouncement] = useState(false)
  const [isLoadingUpdateImage, setIsLoadingUpdateImage] = useState(false) 
  const [isLoadingUpdateSecondVideo, setIsLoadingSecondVideo] = useState(false)
  const [isLoadingUpdateTvVideo, setIsLoadingUpdateTvVideo] = useState(false)
  const handleRefetch = ()=> {
    refetch()
  }

  return (
  <>
      <main className="h-full m-2 grid grid-cols-2 grid-rows-2 gap-2 overflow-hidden">

      { aa?.length > 0 ? (
          <>
            <div className="bg-white rounded-md p-2 grid grid-cols-2 gap-2">
              <UpdateAnnouncement 
                confirmationChildren="You want to change QA into text?"
                notificationChildren="QA successfully updated"
                title="QA Updates"
                isLoadingUpdating={(loading)=> setIsLoadingAnnouncement(loading)}
                isLoadingUpdateImage={isLoadingUpdateImage}
                isLoadingUpdateTvVideo={isLoadingUpdateTvVideo}
                isLoadingUpdateSecondVideo={isLoadingUpdateSecondVideo}
              />
            </div>
            <div className="bg-white rounded-md p-2 grid grid-cols-2 gap-2">
              <UpdateImages 
                confirmationChildren="You want to change QA into image?"
                title="QA Image"l
                notificationChildren="QA successfully updated"
                isLoadingAnnouncement={isLoadingAnnouncement} 
                isLoadingUpdateSecondVideo={isLoadingUpdateSecondVideo}
                isLoadingUpdateTvVideo={isLoadingUpdateTvVideo}
                isLoadingUpdating={(loading)=> setIsLoadingUpdateImage(loading)}
              />
            </div>
            <div className="bg-white rounded-md p-2 grid grid-cols-2 gap-2">
              <UpdateTvVideo 
                isLoadingAnnouncement={isLoadingAnnouncement}
                isLoadingUpdateImage={isLoadingUpdateImage}
                isLoadingUpdateSecondVideo={isLoadingUpdateSecondVideo}isLoadingUpdating={(loading)=> setIsLoadingUpdateTvVideo(loading)}
              />
            </div>
            <div className="bg-white rounded-md p-2 grid grid-cols-2 gap-2">
              <UpdateVideo 
                confirmationChildren="You want to change QA into video?"
                title="QA Video"
                notificationChildren="QA successfully updated"
                isLoadingAnnouncement={isLoadingAnnouncement} 
                isLoadingUpdateImage={isLoadingUpdateImage} 
                isLoadingUpdateTvVideo={isLoadingUpdateTvVideo}
                isLoadingUpdating={(loading)=> setIsLoadingSecondVideo(loading)}
              />
            </div>
          </>
          ) : (
          <div className="row-span-2 col-span-2 bg-white rounded flex items-center justify-center">
          <NewAdvisory refetch={handleRefetch} title="New QA Updates"/>
          </div>
        )} 



 
      </main>
    </>
  )
}
