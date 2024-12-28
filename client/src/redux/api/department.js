import { apiSlice } from "./apiSlice";

export const deptApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //add dept
    addDept: builder.mutation({
      query: ({name}) => ({
        url: `/api/department/add-dept`,
        method: "POST",
        body: {name}
      })
    }),
    //update dept
    updateDept: builder.mutation({
      query: ({name,id}) => ({
        url: `/api/department/update-dept/${id}`,
        method: "PUT",
        body: {name}
      })
    }),
    //delete dept
    deleteDept: builder.mutation({
      query: (id) => ({
        url: `/api/department/delete-dept/${id}`,
        method: "DELETE",

      })
    }),
    //get all dept
    getAllDept: builder.query({
      query: () =>`/api/department/all-depts`
    }),

  })
})

export const {
  useAddDeptMutation,
  useUpdateDeptMutation,
  useDeleteDeptMutation,
  useGetAllDeptQuery
} = deptApiSlice;
