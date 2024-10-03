import * as yup from "yup";

export const signInSchema = yup.object().shape({
  identifier: yup.string().required("Identifier is required"),
  password: yup.string().required("Password is required"),
});

export const signUpEmail = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
});

export const signUpSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must be same")
    .required("Confirm password is required"),
});
