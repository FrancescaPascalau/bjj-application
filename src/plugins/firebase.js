import axios from 'axios';
import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/firestore';

axios.get('/__/firebase/init.json').then(async response => {
  firebase.initializeApp(await response.data);
});

export default firebase;
