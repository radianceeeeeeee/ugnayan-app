// Authentication Process: https://www.youtube.com/watch?v=WpIDez53SK4

import { createUserWithEmailAndPassword, signInAnonymously, signInWithEmailAndPassword } from "firebase/auth";
import { app, auth } from "../FirebaseConfig";
import { addDoc, collection, doc, getFirestore, setDoc } from "firebase/firestore";

// adding custom data in profile: https://www.youtube.com/watch?v=qWy9ylc3f9U
export const doCreateUserWithEmailAndPassword = async (formData: any) => {
    return createUserWithEmailAndPassword(auth, formData.email, formData.password).then(async (cred: any) =>  {
        const db = getFirestore(app);
        const userRef = doc(db, "users", cred.user.uid);

        await setDoc(userRef, {
                firstName: formData.firstName,
                lastName: formData.lastName,
                studentId: formData.studentNo,
                role: "User",
                course: formData.course,
                email: formData.email
            });
    });
};

export const doSignInWithEmailAndPassword = (formData: any) => {
    return signInWithEmailAndPassword(auth, formData.email, formData.password)
};

export const doSignInAsGuest = () => {
    return signInAnonymously(auth);
};

export const doSignOut = () => {
    return auth.signOut();
}