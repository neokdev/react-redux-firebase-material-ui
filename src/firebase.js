import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Replace this with your own config details
var config = {
    apiKey: 'AIzaSyBXwMJ0L5n52INx3F7Tjngu9KMbuyFJtzM',
    authDomain: 'mario-plan-e58d6.firebaseapp.com',
    databaseURL: 'https://mario-plan-e58d6.firebaseio.com',
    projectId: 'mario-plan-e58d6',
    storageBucket: 'mario-plan-e58d6.appspot.com',
    messagingSenderId: '277065317197'
};
firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase; 