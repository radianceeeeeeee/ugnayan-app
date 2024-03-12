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

export function fetchOrgData() {
    const db = getFirestore();
    const colRef = collection(db, "organizations");
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

export async function addOrgData(orgName: string) {
    const db = getFirestore();

    const docRef = await addDoc(collection(db, "organizations"), {
        orgName: orgName
    });

    alert("Organization has been added to database");
}