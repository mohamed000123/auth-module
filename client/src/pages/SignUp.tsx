import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import styles from "../styles/signIn.module.css";

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
    <div className={styles.container}>
      <h2 className={styles.title}>Sign Up</h2>
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
            <Field
              name="email"
              type="email"
              placeholder="Email"
              className={styles.formField}
            />
            <ErrorMessage
              name="email"
              component="div"
              className={styles.errorMsg}
            />

            <Field
              name="name"
              placeholder="Name"
              className={styles.formField}
            />
            <ErrorMessage
              name="name"
              component="div"
              className={styles.errorMsg}
            />

            <Field
              name="password"
              type="password"
              placeholder="Password"
              className={styles.formField}
            />
            <ErrorMessage
              name="password"
              component="div"
              className={styles.errorMsg}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.submitBtn}
            >
              Sign Up
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
