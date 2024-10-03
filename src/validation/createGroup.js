import * as yup from "yup";

export const createGroupSchema = yup.object().shape({
  groupName: yup.string().required("Group Name is required"),
  description: yup.string().required("Description is required"),
});
