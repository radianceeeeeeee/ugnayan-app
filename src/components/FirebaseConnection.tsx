import React, { useState } from 'react'
import "../FirebaseConfig";
import { collection, getDocs, addDoc, getFirestore } from "firebase/firestore";

/*
Used for setting connection to Firebase
https://www.youtube.com/watch?v=-lAlGo5nRms
https://www.youtube.com/watch?v=2yNyiW_41H8
*/

export function fetchUserData() {
    const db = getFirestore();
    const colRef = collection(db, "users");
    let users : any = [];

    getDocs(colRef)
    .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
            users.push({ ...doc.data(), id: doc.id })
    })})
    .catch(err => {
        console.log(err.message)
    })

    return users;
}

export async function addUserData(firstName: string, middleName: string, lastName: string, studentId: string) {
    const db = getFirestore();

    const docRef = await addDoc(collection(db, "users"), {
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        studentId: studentId
    });

    alert("User has been added to database");
}

export async function fetchOrgData() {
    try {
        const db = getFirestore();
        const colRef = collection(db, "organizations");
        const users = [];

        const snapshot = await getDocs(colRef);

        snapshot.docs.forEach(doc => {
            users.push({ ...doc.data(), id: doc.id });
        });

        return users;
    } catch (err) {
        console.error(err.message);
        throw err; // Rethrow the error to be handled elsewhere if needed
    }
}

export async function addOrgData(orgId: string,
                                 orgLogo: string,
                                 orgName: string,
                                 orgAcronym: string,
                                 orgPictures: string[],
                                 orgBio: string,
                                 orgTags: string[],
                                 dateFounded: string,
                                 orgLocation: string,
                                 orgAffiliations: string[],
                                 orgEmails: string[],
                                 orgWebsite: string,
                                 orgFacebook: string,
                                 orgDescription: string,
                                 orgScope: string,
                                 openForApplications: string
                                 
    ) {
    const db = getFirestore();

    const docRef = await addDoc(collection(db, "organizations"), {
        orgId: orgId,
        orgLogo: orgLogo,
        orgName: orgName,
        orgAcronym: orgAcronym,
        orgPictures: orgPictures,
        orgBio: orgBio,
        orgTags: orgTags,
        dateFounded: dateFounded,
        orgLocation: orgLocation,
        orgAffiliations: orgAffiliations,
        orgEmails: orgEmails,
        orgFacebook: orgFacebook,
        orgWebsite: orgWebsite,
        orgDescription: orgDescription,
        orgScope: orgScope,
        openForApplications: openForApplications
    });

    alert("Organization has been added to database");
}