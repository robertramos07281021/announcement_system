import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints:(builder) => ({
    //create account
    createAccount: builder.mutation({
      query: (data) => ({
        url: "/api/users/register",
        method: "POST",
        body: data
      })
    }),
    //login
    login: builder.mutation({
      query: (data) => ({
        url: "/api/users/login",
        method: "POST",
        body: data
      })
    }),
    //logout
    logout: builder.mutation({
      query: (id) => ({
        url: `/api/users/logout/${id}`,
        method: "POST",
      }),
    }),
    //update is online
    updateOnline: builder.mutation({
      query: (id) => ({
        url: `/api/users/update-is-online/${id}`,
        method: "PUT",
      })
    }),
    //change password
    changePassword: builder.mutation({
      query: ({id, data}) => ({
        url: `/api/users/change-password/${id}`,
        method: "PUT",
        body: data
      }) 
    }),
    //update urgent
    updateUrgent: builder.mutation({
      query: (token) => ({
        url: "/api/users/update-urgent-users",
        method: "PUT",
        headers: 
        { Authorization: `Bearer ${token}` }
        ,
      })
    }),
    // update urget it
    updateUrgentIt: builder.mutation({
      query: (id)=> ({
        url: `/api/users/update-urgent-it/${id}`,
        method: "PUT"
      })
    }),
    //update shared
    updateShared: builder.mutation({
      query: ({id, shared})=> ({
        url: `/api/users/update-shared/${id}`,
        method: "PUT",
        body: {shared}
      })
    }),
    updateIsOnlineIt: builder.mutation({
      query: (query)=> ({
        url: `/api/users/update-is-online-it?username=${query}`,
        method: "PUT",
      })
    }),
    getAllUsers: builder.query({
      query: ()=> `/api/users/all-users`
    })
  })  
})

export const {
  useCreateAccountMutation,
  useLoginMutation,
  useLogoutMutation,
  useUpdateSharedMutation,
  useUpdateUrgentItMutation,
  useUpdateOnlineMutation,
  useChangePasswordMutation,
  useUpdateUrgentMutation,
  useGetAllUsersQuery,
  useUpdateIsOnlineItMutation
} = userApiSlice;



