import * as yup from "yup";

export const createPostSchema = yup.object().shape({
  group: yup.string().required("Group is required"),
  title: yup.string().required("Title is required"),
  text: yup.string().required("Text is required"),
  hashtags: yup.array().of(
    yup.object().shape({
      hashtag: yup.string().required("Hashtag is required"),
    }),
  ),
});
