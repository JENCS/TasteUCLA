import { Link } from "react-router-dom";

export default function SignUpPage({ changeLoginState }) {
  return (
    <div>
      <p>p</p>
      <p>p</p>
      <Link to="/">
        <button onClick={changeLoginState}>Sign Up</button>
      </Link>
    </div>
  );
}
