import app from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyDALnwGCBlg3FKGxuvXv_p9DRMDAo8lTa8',
  authDomain: 'flowersnap-35832.firebaseapp.com',
  databaseURL: 'https://flowersnap-35832.firebaseio.com',
  projectId: 'flowersnap-35832',
  storageBucket: 'flowersnap-35832.appspot.com',
  messagingSenderId: '722997584386',
  appId: '1:722997584386:web:2ef6b0793729dd5b6cbd1b',
  measurementId: 'G-WCDK1VTJBS'
};

export default app.initializeApp(firebaseConfig);
