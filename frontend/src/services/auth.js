import { codeVaultApi } from "./codeVaultApi";

export const auth = codeVaultApi.injectEndpoints({
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (data) => ({
                url: "/user/login",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Snippets"],
        }),
        signupUser: builder.mutation({
            query: (data) => ({
                url: "/user/register",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Snippets"],
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: "/user/logout",
                method: "POST",
            }),
            invalidatesTags: ["Snippets"],
        }),
    })
})

export const {
    useSignupUserMutation,
    useLoginUserMutation,
    useLogoutUserMutation,
} = auth;