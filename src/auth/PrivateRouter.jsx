import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/FirebaseConfig";
import Loading from "../component/Loading";
import { Navigate } from "react-router-dom";
function PrivateRouter({ children }) {
  const [user, loading, error] = useAuthState(auth);
  if (loading) return <Loading />;
  return user?.emailVerified ? children : <Navigate to={"/login"} />;
}

export default PrivateRouter;
