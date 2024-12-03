import { useList } from "react-firebase-hooks/database";
import Navbar from "../component/Navbar";
import { database } from "../firebase/RealtimeDB";
import { ref } from "firebase/database";
import Loading from "../component/Loading";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../component/Footer";

function Home() {
  const [snapshots, loading, error] = useList(
    ref(database, `FamilyWebApp/Members`)
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [shuffledMembers, setShuffledMembers] = useState([]); // State to store shuffled members

  useEffect(() => {
    if (snapshots) {
      // Extract data from snapshots
      const rawMembers = snapshots.map((snapshot) => ({
        id: snapshot.key,
        ...snapshot.val(),
      }));

      // Shuffle only once on initial load
      const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      };

      setShuffledMembers(shuffleArray(rawMembers));
    }
  }, [snapshots]); // This effect runs only when snapshots are loaded

  if (loading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  // Filter members based on the search query
  const filteredMembers = shuffledMembers.filter((member) =>
    [member.name, member.nameBn, /*member.email,*/ member.mobile]
      .filter(Boolean) // Avoid null or undefined values
      .some((field) => field.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={true}
        pauseOnHover={true}
        theme="colored"
      />
      <Navbar onSearch={setSearchQuery} />
      {/* Pass `filteredMembers` via context */}
      <Outlet context={{ filteredMembers }}/>
      <Footer/>
    </div>
  );
}

export default Home;
