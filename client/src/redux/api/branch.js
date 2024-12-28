import { apiSlice } from "./apiSlice";

export const branchApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //new branch
    addBranch: builder.mutation({
      query: ({name})=> ({
        url: `/api/branch/new-branch`,
        method: "POST",
        body: {name}
      })
    }),
    //update branch
    updateBranch: builder.mutation({
      query: ({name,id})=> ({
        url: `/api/branch/update-branch/${id}`,
        method: "PUT",
        body: {name}
      })
    }),

    //delete branch
    deleteBranch: builder.mutation({
      query: (id)=> ({
        url: `/api/branch/delete-branch/${id}`,
        method: "DELETE",
      })
    }),

    //get all branch
    getAllBranch: builder.query({
      query: ()=> `/api/branch/all-branches`
    }),
  })
})

export const {
  useAddBranchMutation,
  useUpdateBranchMutation,
  useDeleteBranchMutation,
  useGetAllBranchQuery
} = branchApiSlice;
