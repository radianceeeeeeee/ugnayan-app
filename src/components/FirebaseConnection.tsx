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
    
    getDocs(colRef)
    .then((snapshot) => {
    let users : any = [];

    snapshot.docs.forEach((doc) => {
            users.push({ ...doc.data(), id: doc.id })
    })

    console.log(users);
    //return users;
    })
    .catch(err => {
        console.log(err.message)
    })

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
