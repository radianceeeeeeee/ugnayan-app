import React, { useState } from "react";
import "../FirebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  getFirestore,
  doc,
  deleteDoc,
  updateDoc,
  FieldValue,
  getDoc,
  setDoc,
} from "firebase/firestore";
import firebase from "firebase/compat/app";

/*
Used for setting connection to Firebase
https://www.youtube.com/watch?v=-lAlGo5nRms
https://www.youtube.com/watch?v=2yNyiW_41H8
*/

export async function fetchUserData() {
  try {
    const db = getFirestore();
    const colRef = collection(db, "users");
    const users: any[] = [];
    const snapshot = await getDocs(colRef);

    snapshot.docs.forEach((doc) => {
      users.push({ ...doc.data(), id: doc.id });
    });

    return users;
  } catch (err) {
    console.error(err.message);
    throw err; // Rethrow the error to be handled elsewhere if needed
  }
}

export async function fetchOrgAccountData() {
  try {
    const db = getFirestore();
    const colRef = collection(db, "organizations-test");
    const users: any[] = [];
    const snapshot = await getDocs(colRef);

    snapshot.docs.forEach((doc) => {
      users.push({ ...doc.data(), id: doc.id });
    });

    return users;
  } catch (err) {
    console.error(err.message);
    throw err; // Rethrow the error to be handled elsewhere if needed
  }
}


export async function fetchUserBookmarks(id: string) {
  try {
    const db = getFirestore();
    const userDoc = doc(db, "users", id);
    const docSnap = await getDoc(userDoc);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return data.orgBookmarks;
    }

  } catch (err) {
    console.error(err.message);
    throw err; // Rethrow the error to be handled elsewhere if needed
  }
}

export async function addUserData(
  firstName: string,
  middleName: string,
  lastName: string,
  studentId: string
) {
  const db = getFirestore();

  const docRef = await addDoc(collection(db, "users"), {
    firstName: firstName,
    middleName: middleName,
    lastName: lastName,
    studentId: studentId,
  });

  alert("User has been added to database");
}

export async function fetchOrgData() {
  try {
    const db = getFirestore();
    const colRef = collection(db, "organizations");
    const users = [];
    const snapshot = await getDocs(colRef);

    snapshot.docs.forEach((doc) => {
      users.push({ ...doc.data(), id: doc.id });
    });

    return users;
  } catch (err) {
    console.error(err.message);
    throw err; // Rethrow the error to be handled elsewhere if needed
  }
}

export async function addOrgData(
  orgConnectedEmail: string,
  orgId: string,
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
    orgConnectedEmail: orgConnectedEmail,
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
    openForApplications: openForApplications,
  });

  // alert("Organization has been added to database");
}
export async function deleteOrg(
  id: string,
  orgName: string,
  orgDescription: string
) {
  const db = getFirestore();
  const orgDoc = doc(db, "organizations", id);
  await deleteDoc(orgDoc);

  const docRef = await addDoc(collection(db, "archived-orgs"), {
    orgName: orgName,
    orgDescription: orgDescription,
  });

  // alert("Organization has been archived");
}

export async function editOrgDescription(id: string, description: string) {
  const db = getFirestore();
  const orgDoc = doc(db, "organizations", id);
  await updateDoc(orgDoc, { orgDescription: description });

  // alert("Organization description has been updated");
}

export async function editOrgBio(id: string, bio: string) {
  const db = getFirestore();
  const orgDoc = doc(db, "organizations", id);
  await updateDoc(orgDoc, { orgBio: bio });
}

export async function editOrgAbout(id: string, founded: Date, location: string, email: string, website: string, facebook: string, affiliations: string) {
  const db = getFirestore();
  const orgDoc = doc(db, "organizations", id);
  await updateDoc(orgDoc, {
    dateFounded: founded,
    orgLocation: location,
    orgEmails: email,
    orgWebsite: website,
    orgFacebook: facebook,
    orgAffiliations: affiliations
  });
}

export async function editOrgDetailsAdmin(
  id: string,
  name: string,
  description: string
) {
  const db = getFirestore();
  const orgDoc = doc(db, "organizations", id);
  await updateDoc(orgDoc, { orgName: name });
  await updateDoc(orgDoc, { orgDescription: description });

  // alert("Organization description has been updated");
}

export async function editOrgPictures(
  id: string,
  pic1: string,
  pic2: string,
  pic3: string
) {
  const db = getFirestore();
  const orgDoc = doc(db, "organizations", id);
  await updateDoc(orgDoc, { orgPictures: [pic1, pic2, pic3] });

  // alert("Organization pictures has been updated");
}

export async function updateAvailabilityOrg(id: string, open: boolean) {
  const db = getFirestore();
  const orgDoc = doc(db, "organizations", id);

  await updateDoc(orgDoc, { openForApplications: open ? "Open" : "N/A" });

  // alert("Organization's availability for application has been updated");
}

export async function updateRoles(id: string, role: string) {
  const db = getFirestore();
  const userDoc = doc(db, "users", id);

  await updateDoc(userDoc, { role: role });

  // alert("User role has been updated");
}

// allows re-setting to true and creating to a new one: https://stackoverflow.com/questions/71769424/how-to-create-a-document-if-the-document-doesnt-exist-or-else-dont-do-anything
export async function updateUserBookmark(userId: string, orgId: string) {
  const db = getFirestore();
  const userDoc = doc(db, "users", userId);
  const docSnap = await getDoc(userDoc);

  if (docSnap.exists()) {
    let isStarred = false;
    if (docSnap.data().orgBookmarks[orgId]) {
      isStarred = true;
    }
    
    await updateDoc(userDoc, { [`orgBookmarks.${orgId}`]: !isStarred });
  } else {
    await setDoc(userDoc, { [`orgBookmarks.${orgId}`]: true });
  }

  alert("User bookmarks has been updated");
}

export async function deleteUserBookmark(userId: string, orgId: string) {
  const db = getFirestore();
  const userDoc = doc(db, "users", userId);

  await updateDoc(userDoc, { [`orgBookmarks.${orgId}`]: false });
  alert("User bookmarks has been updated");
}