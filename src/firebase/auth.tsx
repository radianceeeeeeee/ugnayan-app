// Authentication Process: https://www.youtube.com/watch?v=WpIDez53SK4

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../FirebaseConfig";

export const doCreateUserWithEmailAndPassword = async (email: string , password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = (email: string , password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const doSignOut = () => {
    return auth.signOut();
}