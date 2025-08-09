import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000", withCredentials: true });

export default function SignIn() {
  return (
    <div>
      <h2>Sign In</h2>
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
            <Field name="email" type="email" placeholder="Email" />
            <ErrorMessage name="email" component="div" />
            
            <Field name="password" type="password" placeholder="Password" />
            <ErrorMessage name="password" component="div" />

            <button type="submit" disabled={isSubmitting}>Sign In</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
