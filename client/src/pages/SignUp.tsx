import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000", withCredentials: true });

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  name: Yup.string().min(3, "Too Short!").required("Required"),
  password: Yup.string()
    .min(8, "Too Short!")
    .matches(/[A-Za-z]/, "At least one letter")
    .matches(/\d/, "At least one number")
    .matches(/[^A-Za-z0-9]/, "At least one special char")
    .required("Required"),
});

export default function SignUp() {
  return (
    <div>
      <h2>Sign Up</h2>
      <Formik
        initialValues={{ email: "", name: "", password: "" }}
        validationSchema={SignUpSchema}
        onSubmit={async (values, { setSubmitting }) => {
          await API.post("/auth/signup", values);
          setSubmitting(false);
          alert("Account created! Please sign in.");
          window.location.href = "/login";
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field name="email" type="email" placeholder="Email" />
            <ErrorMessage name="email" component="div" />
            
            <Field name="name" placeholder="Name" />
            <ErrorMessage name="name" component="div" />

            <Field name="password" type="password" placeholder="Password" />
            <ErrorMessage name="password" component="div" />

            <button type="submit" disabled={isSubmitting}>Sign Up</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
