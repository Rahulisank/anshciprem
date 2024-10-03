import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { POST } from "@/constants/httpMethod";
import { allPosts } from "@/mock/Posts";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_KEY }),
  tagTypes: [
    "all-groups",
    "single-groups",
    "joined-groups",
    "my-groups",
    "my-posts",
    "trending-posts",
    "new-posts",
    "single-post",
    "all-comments",
  ],
  endpoints: (builder) => ({
    checkEmail: builder.mutation({
      query: (body) => ({
        url: API_ENDPOINTS.checkEmail,
        method: POST,
        body: body,
      }),
    }),
    signUp: builder.mutation({
      query: (body) => ({
        url: API_ENDPOINTS.signUp,
        method: POST,
        body: body,
      }),
    }),
    login: builder.mutation({
      query: (body) => ({
        url: API_ENDPOINTS.login,
        method: POST,
        body: body,
      }),
    }),
    createGroup: builder.mutation({
      query: (formData) => ({
        url: API_ENDPOINTS.createGroup,
        method: POST,
        body: formData,
      }),
      invalidatesTags: ["my-groups"],
    }),

    singleGroup: builder.query({
      query: (query) => ({
        url: API_ENDPOINTS.singleGroup,
        method: POST,
        body: query,
      }),
      providesTags: ["single-groups"],
    }),

    editGroup: builder.mutation({
      query: (formData) => ({
        url: API_ENDPOINTS.editGroup,
        method: POST,
        body: formData,
      }),
      invalidatesTags: ["single-groups"],
    }),

    joinGroup: builder.mutation({
      query: (data) => ({
        url: API_ENDPOINTS.joinGroup,
        method: POST,
        body: data,
      }),
      invalidatesTags: ["joined-groups", "single-groups"],
    }),

    allGroup: builder.query({
      query: () => ({
        url: API_ENDPOINTS.allGroup,
        method: POST,
      }),
      providesTags: ["all-groups"],
    }),
    joinedGroups: builder.query({
      query: (data) => ({
        url: API_ENDPOINTS.joinedGroups,
        method: POST,
        body: data,
      }),
      providesTags: ["joined-groups"],
    }),
    myGroups: builder.query({
      query: (data) => ({
        url: API_ENDPOINTS.myGroups,
        method: POST,
        body: data,
      }),
      providesTags: ["my-groups"],
    }),
    deleteGroup: builder.mutation({
      query: (formData) => ({
        url: API_ENDPOINTS.deleteGroups,
        method: POST,
        body: formData,
      }),
      invalidatesTags: ["my-groups"],
    }),
    leaveGroup: builder.mutation({
      query: (formData) => ({
        url: API_ENDPOINTS.leaveGroup,
        method: POST,
        body: formData,
      }),
      invalidatesTags: ["single-groups", "joined-groups"],
    }),
    addPosts: builder.mutation({
      query: (formData) => ({
        url: API_ENDPOINTS.addPosts,
        method: POST,
        body: formData,
      }),
      invalidatesTags: ["my-posts", "new-posts", "trending-posts"],
    }),
    allPosts: builder.query({
      query: (data) => ({
        url: API_ENDPOINTS.allPosts,
        method: POST,
        body: data,
      }),
      providesTags: ["new-posts"],
    }),
    trendingPosts: builder.query({
      query: (data) => ({
        url: API_ENDPOINTS.trendingPosts,
        method: POST,
        body: data,
      }),
      providesTags: ["trending-posts"],
    }),
    myPosts: builder.query({
      query: (data) => ({
        url: API_ENDPOINTS.myPosts,
        method: POST,
        body: data,
      }),
      providesTags: ["my-posts"],
    }),
    singlePost: builder.query({
      query: (data) => ({
        url: API_ENDPOINTS.singlePost,
        method: POST,
        body: data,
      }),
      providesTags: ["single-post"],
    }),
    deletePost: builder.mutation({
      query: (data) => ({
        url: API_ENDPOINTS.deletePost,
        method: POST,
        body: data,
      }),
      invalidatesTags: ["my-posts", "new-posts", "trending-posts"],
    }),
    editPost: builder.mutation({
      query: (data) => ({
        url: API_ENDPOINTS.editPost,
        method: POST,
        body: data,
      }),
      invalidatesTags: ["single-post"],
    }),
    likePost: builder.mutation({
      query: (data) => ({
        url: API_ENDPOINTS.likePost,
        method: POST,
        body: data,
      }),
      invalidatesTags: [
        "my-posts",
        "new-posts",
        "trending-posts",
        "single-post",
      ],
    }),
    dislikePost: builder.mutation({
      query: (data) => ({
        url: API_ENDPOINTS.dislikePost,
        method: POST,
        body: data,
      }),
      invalidatesTags: [
        "my-posts",
        "new-posts",
        "trending-posts",
        "single-post",
      ],
    }),
    addComment: builder.mutation({
      query: (data) => ({
        url: API_ENDPOINTS.addComment,
        method: POST,
        body: data,
      }),
      invalidatesTags: ["all-comments"],
    }),
    allComments: builder.query({
      query: (data) => ({
        url: API_ENDPOINTS.allComments,
        method: POST,
        body: data,
      }),
      providesTags: ["all-comments"],
    }),
  }),
});

export const {
  useCheckEmailMutation,
  useSignUpMutation,
  useLoginMutation,
  useCreateGroupMutation,
  useAllGroupQuery,
  useSingleGroupQuery,
  useJoinGroupMutation,
  useEditGroupMutation,
  useJoinedGroupsQuery,
  useMyGroupsQuery,
  useDeleteGroupMutation,
  useLeaveGroupMutation,
  useAddPostsMutation,
  useAllPostsQuery,
  useTrendingPostsQuery,
  useMyPostsQuery,
  useSinglePostQuery,
  useDeletePostMutation,
  useEditPostMutation,
  useLikePostMutation,
  useDislikePostMutation,
  useAddCommentMutation,
  useAllCommentsQuery,
} = api;
