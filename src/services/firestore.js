import firebase from 'firebase';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyDn1TAlqsOhXFJ6bE2RMVtSOQatsSolaac',
  authDomain: 'kod-ilan.firebaseapp.com',
  databaseURL: 'https://kod-ilan.firebaseio.com',
  projectId: 'kod-ilan',
  storageBucket: 'kod-ilan.appspot.com',
  messagingSenderId: '642738977784',
};

const firebaseApp = firebase.initializeApp(config);
const firestore = firebaseApp.firestore();

firestore.settings({
  timestampsInSnapshots: true,
});

export default firestore;
