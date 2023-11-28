import { Link } from "react-router-dom";

export default function LoginPage({ changeLoginState }) {
  return (
    <div>
      <p>p</p>
      <p>p</p>
      <Link to="/">
        <button onClick={changeLoginState}>Sign In</button>
      </Link>
    </div>
  );
}
