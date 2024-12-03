import { useOutletContext } from "react-router-dom";
import MemberCard from "./MemberCard"

function AllMembers() {
     // Access the context passed from `Home`
  const { filteredMembers } = useOutletContext();
  return (
    <div className="p-4 min-h-[95vh]">
        <h1 className="text-2xl font-bold mb-4">Family Members</h1>
        <div className="p-5 flex flex-wrap items-center justify-center gap-5">
          {filteredMembers.map((member) => (
            <MemberCard key={member.uid} member={member} />
          ))}
        </div>
      </div>
  )
}

export default AllMembers
