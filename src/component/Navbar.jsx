import { signOut } from "firebase/auth";
import { auth } from "../firebase/FirebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar({ onSearch }) {
  const [user, loading, error] = useAuthState(auth);
  const [searchQuery, setSearchQuery] = useState("");

  if (loading) return <div>Loading...</div>;
  if (user) {
    return (
      <div className="navbar bg-base-100 shadow-md sticky top-0 z-50">
        <div className="flex-1">
          <Link to={"/"} className="btn btn-ghost text-xl">
            <img
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn2.iconfinder.com%2Fdata%2Ficons%2Fsweet-and-love-filled-outline%2F128%2Fhand_heart_miniheart_love_valentine_like_favorite-4096.png"
              alt="Logo"
              className="h-10 w-10"
            />
          </Link>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                onSearch(e.target.value); // Call the search handler
              }}
            />
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="DP"
                  src={
                    user?.photoURL ||
                    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pngfind.com%2Fpngs%2Fm%2F610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png"
                  }
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-lg z-[1] mt-3 w-52 p-2 shadow border border-gray-700"
            >
              <li>
                <Link to={"/profile"} className="justify-between  m-1">
                  Profile
                  {/* <span className="badge">New</span> */}
                </Link>
              </li>
              <li>
                <button
                  className="p-2 m-1"
                  onClick={async () => await signOut(auth)}
                >
                  Sign Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
