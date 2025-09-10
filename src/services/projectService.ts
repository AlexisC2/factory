import { collection, addDoc, getDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { Project } from '../types';
import { ref, onValue, set, push, update, remove } from 'firebase/database';
import { realtimeDb } from '../firebase';

const projectsCollection = collection(db, 'projects');

export const createProject = async (projectData: Omit<Project, 'id'>): Promise<string> => {
  const docRef = await addDoc(projectsCollection, {
    ...projectData,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return docRef.id;
};

export const getProject = async (id: string): Promise<Project | null> => {
  const docRef = doc(projectsCollection, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Project;
  }
  return null;
};

export const getProjects = async (): Promise<Project[]> => {
  const querySnapshot = await getDocs(projectsCollection);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
};

export const updateProject = async (id: string, updates: Partial<Project>): Promise<void> => {
  const docRef = doc(projectsCollection, id);
  await updateDoc(docRef, { ...updates, updatedAt: new Date() });
};

export const deleteProject = async (id: string): Promise<void> => {
  const docRef = doc(projectsCollection, id);
  await deleteDoc(docRef);
};

export const subscribeToProjects = (callback: (projects: Project[]) => void) => {
  const projectsRef = ref(realtimeDb, 'projects');
  onValue(projectsRef, (snapshot) => {
    const data = snapshot.val();
    const projects: Project[] = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
    callback(projects);
  });
};

export const createProjectRealtime = async (projectData: Omit<Project, 'id'>): Promise<string> => {
  const projectsRef = ref(realtimeDb, 'projects');
  const newProjectRef = push(projectsRef);
  await set(newProjectRef, {
    ...projectData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  return newProjectRef.key!;
};

export const updateProjectRealtime = async (id: string, updates: Partial<Project>): Promise<void> => {
  const projectRef = ref(realtimeDb, `projects/${id}`);
  await update(projectRef, { ...updates, updatedAt: new Date().toISOString() });
};

export const deleteProjectRealtime = async (id: string): Promise<void> => {
  const projectRef = ref(realtimeDb, `projects/${id}`);
  await remove(projectRef);
};