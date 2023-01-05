// // Import the functions you need from the SDKs you need
import { doc } from 'firebase/firestore';

import { onSnapshot } from 'firebase/firestore';
import { signInWithPopup, signOut, GoogleAuthProvider } from 'firebase/auth';
import { db, auth } from './global';

//
const whenSignedIn = document.getElementById('whenSignedIn');
const whenSignedOut = document.getElementById('whenSignedOut');
const myLibrary = document.getElementById('libraryBtn');

const signInBtn = document.getElementById('signInBtn');
const signOutBtn = document.getElementById('signOutBtn');

const userDetails = document.getElementById('userDetails');

const provider = new GoogleAuthProvider();
window.userSigned = false;
window.userUid = '';

/// Sign in event handlers

signInBtn.onclick = () => signInWithPopup(auth, provider);

signOutBtn.onclick = () =>
  signOut(auth)
    .then(() => {
      window.userSigned = false;
    })
    .catch(error => {
      // An error happened.
    });

auth.onAuthStateChanged(user => {
  if (user) {
    // signed in
    whenSignedIn.hidden = false;
    whenSignedOut.hidden = true;
    userDetails.innerHTML = `<h3>Hello ${user.displayName}!</h3>`;
    myLibrary.hidden = false;
    window.userUid = true;
  } else {
    // not signed in
    whenSignedIn.hidden = true;
    whenSignedOut.hidden = false;
    userDetails.innerHTML = '';
    myLibrary.hidden = true;
    window.userUid = false;

    if (window.location.href.search('index.html') === -1) {
      console.log(window.location.href);
      window.location.href = 'index.html';
    }
  }
});

///// Firestore /////

let unsubscribe;

auth.onAuthStateChanged(async user => {
  if (user) {
    // Database Reference

    window.userSigned = true;
    window.userUid = user.uid;
    //testy
    // let data = await fetchUserDataFromFirestore(window.userUid);
    // console.log('moje filmy', data);
    // await updateUserQueueData(window.userUid, 16, true);
    // await updateUserQueueData(window.userUid, 12, true);
    // await updateUserQueueData(window.userUid, 14, true);
    // let data2 = await fetchUserDataFromFirestore(window.userUid);
    // console.log('moje filmy po dodaniu trzech filmów do kolejki', data2);
    // await updateUserWatchedData(window.userUid, 12, true);
    // let data3 = await fetchUserDataFromFirestore(window.userUid);
    // console.log('dodanie filmu 12 do obejrzenych', data3);
    // const test1 = await fetchQueueFilmsPerPage(window.userUid, 1, filmsPerPage);
    // const test2 = await fetchWatchedFilmsPerPage(window.userUid, 1, filmsPerPage);
    // console.log(test1);
    // console.log(test2);
    //testy
    // await updateUserWatchedData(window.userUid, 12, false);
    // let data4 = await fetchUserDataFromFirestore(window.userUid);
    // console.log('usunięcie filmu 12 z obejrzenych', data4);
    // await updateUserQueueData(window.userUid, 12, false);
    // let data5 = await fetchUserDataFromFirestore(window.userUid);
    // console.log('usunięcie filmu 12', data5);
    // await deleteUserData(window.userUid);
    //

    unsubscribe = onSnapshot(doc(db, 'films', user.uid.toString()), doc => {
      console.log('Current data: ', doc.data());
    });
  } else {
    // Unsubscribe when the user signs out
    unsubscribe && unsubscribe();
  }
});
