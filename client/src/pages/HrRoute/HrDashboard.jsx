import { NewAnnouncement } from "./HrComponents/NewAnnouncement"
import { useSelector } from "react-redux"
import { useGetAllAnnouncementQuery } from "../../redux/api/announcement"
import { UpdateImages } from "../components/UpdateImages"
import { UpdateTvVideo } from "../components/UpdateTvVideo"
import { UpdateVideo } from "../components/UpdateVideo"
import { useState } from "react"
import { UpdateAnnouncement } from "../components/UpdateAnnouncement"


export const HrDashboard = () => {
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

  console.log(isLoadingAnnouncement)
  return (
    <>
      <main className="h-full m-2 grid grid-cols-2 grid-rows-2 gap-2 overflow-hidden">

      { aa?.length > 0 ? (
          <>
            <div className="bg-white rounded-md p-2 grid grid-cols-2 gap-2">
              <UpdateAnnouncement 
                confirmationChildren="You want to change announcement into text?"
                notificationChildren="Announcement successfully updated"
                title="Announcement"
                isLoadingUpdating={(loading)=> setIsLoadingAnnouncement(loading)}
                isLoadingUpdateImage={isLoadingUpdateImage}
                isLoadingUpdateTvVideo={isLoadingUpdateTvVideo}
                isLoadingUpdateSecondVideo={isLoadingUpdateSecondVideo}
              />
            </div>
            <div className="bg-white rounded-md p-2 grid grid-cols-2 gap-2">
              <UpdateImages 
                confirmationChildren="You want to change announcement into image?"
                title="Announcement Image"
                notificationChildren="Announcement successfully updated"
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
                isLoadingUpdateSecondVideo={isLoadingUpdateSecondVideo}
                isLoadingUpdating={(loading)=> setIsLoadingUpdateTvVideo(loading)}
              />
            </div>
            <div className="bg-white rounded-md p-2 grid grid-cols-2 gap-2">
              <UpdateVideo 
                confirmationChildren="You want to change announcement into video?"
                title="Announcement Video"
                notificationChildren="Announcement successfully updated"
                isLoadingAnnouncement={isLoadingAnnouncement} 
                isLoadingUpdateImage={isLoadingUpdateImage} 
                isLoadingUpdateTvVideo={isLoadingUpdateTvVideo}
                isLoadingUpdating={(loading)=> setIsLoadingSecondVideo(loading)}
              />
            </div>
          </>
          ) : (
          <div className="row-span-2 col-span-2 bg-white rounded flex items-center justify-center">
          <NewAnnouncement refetch={handleRefetch} title="HR Announcement"/>
          </div>
        )} 



 
      </main>
    </>
  )
}
