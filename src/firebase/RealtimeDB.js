import { signOut } from "firebase/auth";
import { app, auth } from "./FirebaseConfig";
import { useList } from 'react-firebase-hooks/database';
import { getDatabase, onValue, push, ref, set, update } from "firebase/database";

export const database = getDatabase(app);

export function addUser(user) {
  /*const userRef = ref(database, "FamilyWebApp/Members"); // Database path
  const newUserRef = push(userRef); // Generate a unique key for the new user
  */
  // Use the user's unique UID as the key
  const userRef = ref(database, `FamilyWebApp/Members/${user.uid}`); // Path includes the user's UID

  return set(userRef, user) // Return the promise from set
    .then(() => {
      console.log("User added successfully!");
      //return signOut(auth); // Only sign out after successful database write
    })
    .then(() => {
      //console.log("User signed out successfully!");
      return true; // for email verification...
    })
    .catch((error) => {
      return signOut(auth); // Only sign out after successful database write
    });
}

export function updateUserData(user) {
  const userRef = ref(database, `FamilyWebApp/Members/${user.uid}`);
  return update(userRef, user)
    .then(() => {
      console.log("User update successfully!");
    })
    .catch((error) => {
      console.error("Error adding user or signing out:", error);
      return signOut(auth); // Only sign out after successful database write
    });
}
export function fetchUsers() {
  const userRef = ref(database, "FamilyWebApp/Members");
  return new Promise((resolve, reject) => {
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const users = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        resolve(users);
      } else {
        reject("No users found!");
      }
    });
  });
}

/*
function fetchUsers() {
    const userRef = ref(database, "users");

    onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            const users = Object.keys(data).map((key) => ({
                id: key,
                ...data[key],
            }));
            console.log("Fetched users:", users);
        } else {
            console.log("No users found!");
        }
    });
}

// Call fetchUsers to start listening for changes
// fetchUsers();

import { update } from "firebase/database";

function updateUser(userId, updatedData) {
 const userRef = ref(database, `users/${userId}`);
 update(userRef, updatedData)
   .then(() => {
     console.log("User updated successfully!");
   })
   .catch((error) => {
     console.error("Error updating user:", error);
   });
}
import { remove } from "firebase/database";

function deleteUser(userId) {
 const userRef = ref(database, `users/${userId}`);
 remove(userRef)
   .then(() => {
     console.log("User deleted successfully!");
   })
   .catch((error) => {
     console.error("Error deleting user:", error);
   });
}

 */
