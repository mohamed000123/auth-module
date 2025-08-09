import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div>
      <h1 >404</h1>
      <p> page is not found </p>
      <Link to="/">go back</Link>
    </div>
  );
}

