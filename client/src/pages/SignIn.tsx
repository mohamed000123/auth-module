import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import styles from "../styles/signIn.module.css";

const API = axios.create({ baseURL: "http://localhost:5000", withCredentials: true });

export default function SignIn() {
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
