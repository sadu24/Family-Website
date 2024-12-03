import { createUserWithEmailAndPassword, GoogleAuthProvider, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from "./FirebaseConfig";
import { addUser, database, updateUserData } from "./RealtimeDB";
import { getDatabase, ref, get } from "firebase/database";
import { formatBDTTime } from "../utils/MyFunctions";

const loginEmailPass = async ({ email, password }) => {
    try {

        // Pass `auth` as the first argument to `signInWithEmailAndPassword`
        const response = await signInWithEmailAndPassword(auth, email, password);

        // Get user information
        const user = response.user;

        if (!user.emailVerified) {
            const confirmResend = window.confirm(
                "Your email is not verified. Would you like to resend the verification email?"
            );
            if (confirmResend) {
                await sendEmailVerification(user);
                alert("Verification email has been resent. Please check your inbox.");
            }
            signOut(auth)
            return; // Stop further execution until email is verified
        }

        // Check if the user exists in the Realtime Database
        const userRef = ref(database, `FamilyWebApp/Members/${user.uid}`);
        const userSnapshot = await get(userRef);

        if (!userSnapshot.exists()) {
            console.log("User not found in the database");
            throw new Error("User not registered. Please sign up first.");
        }
        const userData = {
            uid: user.uid,
            lastLogin: formatBDTTime(user.metadata.lastLoginAt)   // Add lastLogin timestamp
        };
        await updateUserData(userData);

        console.log("User logged in and last login timestamp updated:", userData);

    } catch (error) {
        console.error("Error during email/password login:", error.message);
        throw error;
    }
};

const signupEmailPass = async ({ email, password, name, nameBn, mobile }) => {
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        const user = response.user;
        await updateProfile(user, {
            displayName: name,
        });
        await sendEmailVerification(user);
        const userData = {
            name: name,
            email: email,
            uid: user.uid,
            mobile: mobile,
            nameBn: nameBn,
            whatsapp: mobile,
            photoURL: "",
            isApproved: false,
            about: "",
            created: formatBDTTime(user.metadata.createdAt),     // Add created timestamp
            lastLogin: formatBDTTime(user.metadata.lastLoginAt)     // Add lastLogin timestamp
        };

        await addUser(userData); // Wait for addUser to complete
        alert("Verification Email Sent...");
        await signOut(auth);
    } catch (error) {
        throw error
    }
};

const googleAuth = new GoogleAuthProvider();

const continueWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleAuth);
        const user = result.user;

        // Check if user already exists in the database
        const userRef = ref(getDatabase(), `FamilyWebApp/Members/${user.uid}`);
        const userSnapshot = await get(userRef);

        if (userSnapshot.exists()) {
            const userData = {
                uid: user.uid,
                photoURL: user.photoURL,   // Add created timestamp
                lastLogin: formatBDTTime(user.metadata.lastLoginAt)   // Add lastLogin timestamp
            };
            await updateUserData(userData);
            // User already exists, no need to add again
            console.log("User already exists in the database");
            return user;
        } else {
            const userData = {
                name: user.displayName,
                email: user.email,
                uid: user.uid,
                mobile: "",
                nameBn: "",
                whatsapp: "",
                photoURL: user.photoURL || "",
                isApproved: false,
                about: "",
                created: formatBDTTime(user.metadata.createdAt),     // Add created timestamp
                lastLogin: formatBDTTime(user.metadata.lastLoginAt)   // Add lastLogin timestamp
            };
            // User does not exist, add them to the database
            await addUser(userData);
            console.log("User added to the database");
            return user;
        }
    } catch (error) {
        console.error("Error during Google sign in:", error);
        signOut(auth);
        throw error;
    }
};


export { loginEmailPass, signupEmailPass, continueWithGoogle }