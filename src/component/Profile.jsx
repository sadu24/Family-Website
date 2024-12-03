import { useState, useEffect } from "react";
import { ref, get, child, update } from "firebase/database";
import { database } from "../firebase/RealtimeDB";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/FirebaseConfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, loadingUser, errorUser] = useAuthState(auth);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    nameBn: "",
    email: "",
    mobile: "",
    whatsapp: "",
    about: "",
    photoURL: "",
  });

  useEffect(() => {
    if (user) {
      const fetchUserProfile = async () => {
        try {
          const userRef = ref(database, `FamilyWebApp/Members/${user.uid}`);
          const snapshot = await get(userRef);
          if (snapshot.exists()) {
            setFormData(snapshot.val());
          } else {
            console.log("No user data found");
          }
        } catch (error) {
          console.log("Error fetching user data:", error);
        }
      };

      fetchUserProfile();
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();
  const handleUpdate = async () => {
    try {
      const userRef = ref(database, `FamilyWebApp/Members/${user.uid}`);
      await update(userRef, formData);
      //alert("Profile updated successfully!");
      toast.success("Profile Updated Successfully", {
        onClose: () => navigate("/"),
        toastId: "success1",
      });
      setIsEditing(false);
    } catch (error) {
      toast.error("Error updating profile: " + error.message);
    }
  };

  if (loadingUser) return <div>Loading...</div>;
  if (errorUser) return <div>Error: {errorUser.message}</div>;

  return (
    <div className="max-w-xl mx-auto shadow-md rounded-lg p-6 border border-gray-700 my-10 h-[95vh]">
      <div className="flex items-center space-x-4 mb-6">
        <img
          className="w-20 h-20 rounded-full object-cover"
          src={
            formData.photoURL ||
            "https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png"
          }
          alt="Profile"
        />
        <div>
          <h1 className="text-2xl font-semibold">{formData.name}</h1>
          <p className="text-sm text-gray-400">{formData.email}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400">
            Name
          </label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="input input-bordered w-full"
            />
          ) : (
            <p>{formData.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400">
            Name (Bengali)
          </label>
          {isEditing ? (
            <input
              type="text"
              name="nameBn"
              value={formData.nameBn}
              onChange={handleInputChange}
              className="input input-bordered w-full"
            />
          ) : (
            <p>{formData.nameBn}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400">
            Mobile
          </label>
          {isEditing ? (
            <input
              type="number"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              className="input input-bordered w-full"
            />
          ) : (
            <p>{formData.mobile}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400">
            WhatsApp
          </label>
          {isEditing ? (
            <input
              type="number"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleInputChange}
              className="input input-bordered w-full"
            />
          ) : (
            <p>{formData.whatsapp}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400">
            About
          </label>
          {isEditing ? (
            <textarea
              name="about"
              value={formData.about}
              onChange={handleInputChange}
              maxLength={1200}
              rows={5}
              className="textarea textarea-bordered w-full"
            />
          ) : (
            <p className="whitespace-pre-line">{formData.about}</p>
          )}
        </div>
      </div>

      <div className="mt-6">
        {isEditing ? (
          <div className="flex space-x-4">
            <button className="btn btn-primary" onClick={handleUpdate}>
              Save
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button className="btn btn-accent" onClick={() => setIsEditing(true)}>
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
}

export default Profile;
