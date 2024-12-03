import { FaEnvelope, FaPhone, FaWhatsapp, FaTimes } from "react-icons/fa";

function MemberModal({ member, closeModal }) {
  const defImage =
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2016%2F08%2F08%2F09%2F17%2Favatar-1577909_1280.png";

  return (
    <div className="modal modal-open">
      <div className="modal-box relative">
        <button
          className="btn btn-sm btn-circle absolute right-2 top-2"
          onClick={closeModal}
        >
          <FaTimes />
        </button>
        <h2 className="text-2xl font-bold mb-2 text-center">
          {member.name}
          {member.nameBn && (
            <span className="text-xl text-center block">{member.nameBn}</span>
          )}
        </h2>

        <img
          className="w-24 h-24 rounded-full mx-auto mb-4"
          src={member?.photoURL || defImage}
          alt={`${member.name}'s Profile`}
          onError={(e) => (e.target.src = defImage)}
          title={`${member.name}'s Profile`}
        />
        <ul className="list-none space-y-2">
          <li
            onClick={
              member.email
                ? () => (window.location.href = `mailto:${member.email}`)
                : null
            }
            className={member.email ? "cursor-pointer" : ""}
          >
            <FaEnvelope className="inline mr-2 text-primary" />
            Email: {member.email || "Not provided"}
          </li>
          <li
            onClick={
              member.mobile
                ? () => (window.location.href = `tel:${member.mobile}`)
                : null
            }
            className={member.mobile ? "cursor-pointer" : ""}
          >
            <FaPhone className="inline mr-2 text-primary" />
            Mobile: {member.mobile || "Not provided"}
          </li>
          <li
            onClick={
              member.whatsapp
                ? () =>
                    (window.location.href = `https://wa.me/${member.whatsapp}`)
                : null
            }
            className={member.whatsapp ? "cursor-pointer" : ""}
          >
            <FaWhatsapp className="inline mr-2 text-primary" />
            WhatsApp: {member.whatsapp || "Not provided"}
          </li>

          <li>About: {member.about || "Not provided"}</li>
          {/* <li>
            Created: {member.created}
          </li>
          <li>
            Last Login: {member.lastLogin}
          </li> */}
        </ul>
      </div>
    </div>
  );
}

export default MemberModal;
