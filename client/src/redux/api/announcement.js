import { apiSlice } from "./apiSlice";

export const announcementApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //get announcement
    getAnnouncement: builder.query({
      query: (id)=> `/api/announcement/get-user-announcement/${id}`
    }),
    //get all announcement
    getAllAnnouncement: builder.query({
      query: ()=> "/api/announcement/get-all-announcement"
    }),
    //get tv announcement
    getTvAnnouncement: builder.query({
      query: (id)=> `/api/announcement/get-tv-announcement/${id}`
    }),
    //get hr announcement
    getHrAnnouncement: builder.query({
      query: () => `/api/announcement/get-hr-announcement`
    }),
    //get admin announcement
    getAdminAnnouncement: builder.query({
      query:(id) => `/api/announcement/get-admin-announcement/${id}`
    }),
    //get qa announcement
    getQaAnnouncement: builder.query({
      query:(id) => `/api/announcement/get-qa-announcement/${id}`
    }),
    //get opts announcement
    getOpsAnnouncement: builder.query({
      query:(id) => `/api/announcement/get-ops-announcement/${id}`
    }),


    //new announcement
    newAnnouncement: builder.mutation({
      query: ({data, token})=> ({
        url: '/api/announcement/new-announcement',
        method: "POST",
        headers: 
        { Authorization: `Bearer ${token}` }
        ,
        body: data
      })
    }),
    //update video
    updateTvVideo: builder.mutation({
      query: ({id,data,token})=> ({
        url: `/api/announcement/update-video/${id}`,
        method: "PUT",
        headers: 
        { Authorization: `Bearer ${token}` }
        ,
        body: data
      })
    }),
    //update image
    updateAnnouncementImage: builder.mutation({
      query: ({id, data, token}) => ({
        url: `/api/announcement/update-image/${id}`,
        method: "PUT",
        headers: 
        { Authorization: `Bearer ${token}` }
        ,
        body: data
      })
    }),
    //update second video
    updateSecondVideo: builder.mutation({
      query: ({id, data, token}) => ({
        url: `/api/announcement/update-second-video/${id}`,
        method: "PUT",
        headers: 
        { Authorization: `Bearer ${token}` }
        ,
        body: data
      })
    }),

    updateAnnouncement: builder.mutation({
      query: ({id, announcement, token}) => ({
        url: `/api/announcement/update-announcement/${id}`,
        method: "PUT",
        headers: 
        { Authorization: `Bearer ${token}` }
        ,
        body: {announcement}
      })
    })


  })
})


export const {
  useGetAllAnnouncementQuery,
  useGetAnnouncementQuery,
  useNewAnnouncementMutation,
  useUpdateAnnouncementImageMutation,
  useUpdateAnnouncementMutation,
  useUpdateTvVideoMutation,
  useUpdateSecondVideoMutation,
  useGetTvAnnouncementQuery,
  useGetAdminAnnouncementQuery,
  useGetHrAnnouncementQuery,
  useGetOpsAnnouncementQuery,
  useGetQaAnnouncementQuery

} = announcementApiSlice ;


