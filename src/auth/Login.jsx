import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { continueWithGoogle, loginEmailPass } from "../firebase/FirebaseLogin";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //const navigate = useNavigate();
  async function googleLogin() {
    try {
      await continueWithGoogle();
    } catch (error) {
      console.error(error);
    }
  }

  const onSubmit = async (data) => {
    try {
      await loginEmailPass(data);
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="card w-96 shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="input input-bordered w-full"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="input input-bordered w-full"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <p className="text-sm text-gray-500 mb-4">
            A verification email will be sent after login.
          </p>
          <button type="submit" className="btn btn-primary w-full">
            Login with Email
          </button>
        </form>
        <div className="flex justify-between mt-4 text-sm">
          <Link to="/forgot-password" className="link">
            Forgot Password?
          </Link>
          <Link to="/signup" className="link">
            Don't have an account? Signup
          </Link>
        </div>
        <div className="divider">OR</div>
        <button
          className="btn btn-outline btn-accent w-full"
          onClick={googleLogin}
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}

export default Login;
