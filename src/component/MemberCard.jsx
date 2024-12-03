import { useState } from "react";
import { FaUserCircle, FaInfoCircle } from "react-icons/fa";
import MemberModal from "./MemberModal";

function MemberCard({ member }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const defImage = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2016%2F08%2F08%2F09%2F17%2Favatar-1577909_1280.png";

  return (
    <div className="card memberItem w-80 bg-base-100 shadow-md p-4 border border-gray-600">
      <div className="flex items-center gap-4">
        <img
          className="w-16 h-16 rounded-full"
          src={member?.photoURL || defImage}
          alt={`${member.name}'s Profile`}
          onError={(e) => (e.target.src = defImage)}
          title={`${member.name}'s Profile`}
        />
        <div>
          <h3 className="text-lg font-semibold">{member.name}</h3>
          <p className="text-sm text-gray-500">{member.nameBn || "No Bengali Name"}</p>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button className="btn btn-primary btn-sm flex items-center gap-2 text-gray-200" onClick={openModal}>
          <FaInfoCircle /> Show Details
        </button>
      </div>
      {isModalOpen && <MemberModal member={member} closeModal={closeModal} />}
    </div>
  );
}

export default MemberCard;
