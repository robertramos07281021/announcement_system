import { AdminAnnouncement } from "./AdminAnnouncement"
import { HrAnnouncement } from "./HrAnnouncement"
import { OperationAnnouncement } from "./OperationAnnouncement"

export const TvDashboard = () => {
  return (
    <main className="h-full m-2 grid grid-rows-5 gap-2 overflow-hidden">
      <div className="row-span-3 grid grid-cols-2 gap-2">
        <HrAnnouncement/>
      </div>
      <div className="grid grid-cols-3 row-span-2 gap-2">
        <OperationAnnouncement/>
        <AdminAnnouncement/>
      </div>
    </main>
  )
}
