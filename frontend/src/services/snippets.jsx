import { codeVaultApi } from "./codeVaultApi";

export const snippets=codeVaultApi.injectEndpoints({
    endpoints:(builder)=>({
        getAllSnippets:builder.query({
            query:(filters)=>({
                url:"/snippet/all-snippets",
                method:"GET",
                params:filters
            }),
            providesTags:["Snippets"]
        }),
        getSnippet:builder.query({
            query:(id)=>({
                url:`/snippet/${id}`,
                method:"GET"
            }),
            providesTags:["Snippets"]
        }),
        createSnippet:builder.mutation({
            query:(data)=>({
                url:"/snippet/create",
                method:"POST",
                body:data
            }),
            invalidatesTags:["Snippets"]
        }),
        deleteSnippet:builder.mutation({
            query:(id)=>({
                url:`/snippet/delete/${id}`,
                method:"DELETE"
            }),
            invalidatesTags:['Snippets']
        })
    })
})

export const { useGetAllSnippetsQuery,useGetSnippetQuery,useCreateSnippetMutation,useDeleteSnippetMutation } = snippets
