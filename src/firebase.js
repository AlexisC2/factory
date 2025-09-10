import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "placeholder_api_key",
  authDomain: "placeholder_project.firebaseapp.com",
  projectId: "placeholder_project_id",
  storageBucket: "placeholder_project.appspot.com",
  messagingSenderId: "placeholder_sender_id",
  appId: "placeholder_app_id"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const realtimeDb = getDatabase(app);