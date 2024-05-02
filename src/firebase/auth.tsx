// Authentication Process: https://www.youtube.com/watch?v=WpIDez53SK4

import { createUserWithEmailAndPassword, signInAnonymously, signInWithEmailAndPassword } from "firebase/auth";
import { app, auth } from "../FirebaseConfig";
import { doc, getFirestore, setDoc } from "firebase/firestore";

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

export const doCreateSiteAdminWithEmailAndPassword = async (email: string, password: string, formData: any) => {    
    console.log(formData);
    return createUserWithEmailAndPassword(auth, email, password).then(async (cred: any) =>  {
        const db = getFirestore(app);
        const userRef = doc(db, "site-admin", cred.user.uid);

        await setDoc(userRef, {
                firstName: formData.adminFirstName,
                lastName: formData.adminLastName,
                role: "Site Admin",
                email: formData.adminEmail,
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
        const userRef = doc(db, "organizations", cred.user.uid);

        await setDoc(userRef, {
                orgConnectedEmail: formData.orgConnectedEmail,
                orgId: formData.orgName.replace(/\s/g, '_'), // https://stackoverflow.com/questions/5963182/how-to-remove-spaces-from-a-string-using-javascript
                orgLogo: formData.orgLogo,
                orgName: formData.orgName,
                orgAcronym: formData.orgAcronym,
                orgPictures: formData.orgPictures !== "" ? formData.orgPictures.toString().split(",") : [],
                orgBio: formData.orgBio,
                // orgTags: formData.orgTags !== "" ? formData.orgTags.split(",").toString().split(",") : [],
                orgTags: formData.orgTags !== "" ? formData.orgTags.toString().split(",").toString().split(",") : [],


                dateFounded: formData.dateFounded,
                orgLocation: formData.orgLocation,
                orgAffiliations: formData.orgAffiliations !== "" ? formData.orgAffiliations.toString().split(",") : [],
                orgEmails: formData.orgEmails !== "" ? formData.orgEmails.toString().split(",") : [],
                orgFacebook: formData.orgFacebook,
                orgWebsite: formData.orgWebsite,
                orgDescription: formData.orgDescription,
                orgScope: formData.orgScope,
                openForApplications: formData.openForApplications,
            });
    });
}