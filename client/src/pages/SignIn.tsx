import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from "../styles/signIn.module.css";
import { Navigate } from "react-router-dom";
import { API } from "../config.ts";
import { useEffect, useState } from "react";

export default function SignIn() {
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
      <h2 className={styles.title}>Sign In</h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values, { setSubmitting }) => {
          await API.post("/auth/signin", values);
          setSubmitting(false);
          window.location.href = "/";
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
              Sign In
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
