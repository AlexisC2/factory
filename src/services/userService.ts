import { collection, addDoc, getDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { User } from '../types';

const usersCollection = collection(db, 'users');

export const createUser = async (userData: Omit<User, 'id'>): Promise<string> => {
  const docRef = await addDoc(usersCollection, {
    ...userData,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return docRef.id;
};

export const getUser = async (id: string): Promise<User | null> => {
  const docRef = doc(usersCollection, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as User;
  }
  return null;
};

export const getUsers = async (): Promise<User[]> => {
  const querySnapshot = await getDocs(usersCollection);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User));
};

export const updateUser = async (id: string, updates: Partial<User>): Promise<void> => {
  const docRef = doc(usersCollection, id);
  await updateDoc(docRef, { ...updates, updatedAt: new Date() });
};

export const deleteUser = async (id: string): Promise<void> => {
  const docRef = doc(usersCollection, id);
  await deleteDoc(docRef);
};