import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { continueWithGoogle, signupEmailPass } from "../firebase/FirebaseLogin";

function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  //const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await signupEmailPass(data);
      //navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  async function googleLogin() {
    try {
      await continueWithGoogle();
      //navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="card w-96 shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Signup</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block">Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="input input-bordered w-full"
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block">Name (BN)</label>
            <input
              type="text"
              {...register("nameBn", {
                required: "Name in Bangla is required",
              })}
              className="input input-bordered w-full"
              placeholder="Enter your name in Bangla"
            />
            {errors.nameBn && (
              <p className="text-red-500 text-sm">{errors.nameBn.message}</p>
            )}
          </div>
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
            <label className="block">Mobile</label>
            <input
              type="text"
              {...register("mobile", { required: "mobile is required" })}
              className="input input-bordered w-full"
              placeholder="Enter your mobile number"
            />
            {errors.mobile && (
              <p className="text-red-500 text-sm">{errors.mobile.message}</p>
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
          <div className="mb-4">
            <label className="block">Confirm Password</label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              className="input input-bordered w-full"
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Signup
          </button>
        </form>
        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="link">
            Login
          </Link>
        </p>
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

export default Signup;
