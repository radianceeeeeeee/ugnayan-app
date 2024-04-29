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
                role: "User"
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

export const doCreateOrgWithEmailAndPassword = async (formData: any) => {
    return createUserWithEmailAndPassword(auth, formData.email, formData.password).then(async (cred: any) =>  {
        const db = getFirestore(app);
        const orgRef = doc(db, "organizations", cred.user.uid);

        await setDoc(orgRef, {
                orgConnectedEmail: formData.orgConnectedEmail,
                orgId: formData.orgId,
                orgLogo: formData.orgLogo,
                orgName: formData.orgName,
                orgAcronym: formData.orgAcronym,
                orgPictures: formData.orgPictures,
                orgBio: formData.orgBio,
                orgTags: formData.orgTags,
                dateFounded: formData.dateFounded,
                orgLocation: formData.orgLocation,
                orgAffiliations: formData.orgAffiliations,
                orgEmails: formData.orgEmails,
                orgFacebook: formData.orgFacebook,
                orgWebsite: formData.orgWebsite,
                orgDescription: formData.orgDescription,
                orgScope: formData.orgScope,
                openForApplications: formData.openForApplications,
            });
    });
}

export const doTestCreateOrgWithEmailAndPassword = async (formData: any) => {
    return createUserWithEmailAndPassword(auth, formData.orgConnectedEmail, formData.orgPassword).then(async (cred: any) =>  {
        const db = getFirestore(app);
        const userRef = doc(db, "organizations-test", cred.user.uid);

        await setDoc(userRef, {
                orgConnectedEmail: formData.orgConnectedEmail,
                orgName: formData.orgName,
            });
    });
}