// creates a document in the user data collection for new users
// Reference: Firebase Docs (https://firebase.google.com/docs/firestore/quickstart#web-version-9_2)
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const CreateNewUser = ( uid, username, email ) => {
    addDoc(collection(db, "users"), {
        uid: uid,
        username: username,
        email: email,
        miles: 0,
        backgrounds: [],
        rooms: []
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((err) => {
        console.error("Error adding document: ", err);
    });
};

export default CreateNewUser;