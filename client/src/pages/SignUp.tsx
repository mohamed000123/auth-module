import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "../styles/signIn.module.css";
import { Navigate, useNavigate } from "react-router-dom";
import { API } from "../config.ts";
import { useEffect, useState } from "react";

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
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await API.get("/auth/check");
        setIsAuth(true);
      } catch (error) {
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);
  if (loading) return <div>Loading...</div>;
  if (isAuth) return <Navigate to="/" />;
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Sign Up</h2>
      <Formik
        initialValues={{ email: "", name: "", password: "" }}
        validationSchema={SignUpSchema}
        onSubmit={async (values, { setSubmitting }) => {
          await API.post("/auth/signup", values);
          setSubmitting(false);
          alert("Account created successfully");
          navigate("/");
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
