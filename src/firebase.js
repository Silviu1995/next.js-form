
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc,getDocs } from "firebase/firestore"; 
 
// configuration on firebase
const firebaseConfig = {
    apiKey: "AIzaSyC--OQIHcnWwFd3WUTrzfvrxZJiJq6UzN4",
    authDomain: "technical-test-228c0.firebaseapp.com",
    projectId: "technical-test-228c0",
    storageBucket: "technical-test-228c0.appspot.com",
    messagingSenderId: "370445825815",
    appId: "1:370445825815:web:8eba5be4ae56612738a952"
};

// initializing the firebase app
const app = initializeApp(firebaseConfig);

// initializing the firestore db
const db = getFirestore(app);


// function which add data to a new document in firestore called "user-form"
export  const addDataToFirestore = async (data) => {
    try {
        const docRef = await addDoc(collection(db, "user-form"), data);
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}

// function which get the entire document "user-form" from firestore and console it out as an hashmap of documents with id as key , and data as value
export const getDataFromFirestore = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "user-form"));
        const formMap = {};
        querySnapshot.forEach((docSnapshot) => {
            formMap[docSnapshot.id] = docSnapshot.data()
        });
        console.log("Documents from the user-form colection:")
        console.log(formMap);
        return formMap;
    } catch(e) {
        console.error("Error in getting documents", e)
    }
};
  