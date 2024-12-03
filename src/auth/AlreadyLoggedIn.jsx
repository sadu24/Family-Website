import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/FirebaseConfig";
import { Navigate } from "react-router-dom";
import Loading from "../component/Loading";

function AlreadyLoggedIn({ children }) {
  const [user, loading, error] = useAuthState(auth);
  if (loading) return <Loading />;
  return user?.emailVerified ? <Navigate to={"/"} /> : children;
}

export default AlreadyLoggedIn;
