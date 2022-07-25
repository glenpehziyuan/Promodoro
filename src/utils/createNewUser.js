// creates a document in the user data collection for new users
// Reference: Firebase Docs (https://firebase.google.com/docs/firestore/quickstart#web-version-9_2)
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const DEFAULT_BACKGROUNDS = ["cafe", "aurora", "library", "newyork", "rainforest", "rain", "sakura"];

const createNewUser = ({ uid, username, email }) => {
    addDoc(collection(db, "users"), {
        uid: uid,
        username: username,
        email: email,
        backgrounds: DEFAULT_BACKGROUNDS,
        tasks: []
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((err) => {
        console.error("Error adding document: ", err);
    });
};

export default createNewUser;