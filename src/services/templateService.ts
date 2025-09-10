import { collection, addDoc, getDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { Template } from '../types';
import { ref, onValue, set, push, update, remove } from 'firebase/database';
import { realtimeDb } from '../firebase';

const templatesCollection = collection(db, 'templates');

export const createTemplate = async (templateData: Omit<Template, 'id'>): Promise<string> => {
  const docRef = await addDoc(templatesCollection, {
    ...templateData,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return docRef.id;
};

export const getTemplate = async (id: string): Promise<Template | null> => {
  const docRef = doc(templatesCollection, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Template;
  }
  return null;
};

export const getTemplates = async (): Promise<Template[]> => {
  const querySnapshot = await getDocs(templatesCollection);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Template));
};

export const updateTemplate = async (id: string, updates: Partial<Template>): Promise<void> => {
  const docRef = doc(templatesCollection, id);
  await updateDoc(docRef, { ...updates, updatedAt: new Date() });
};

export const deleteTemplate = async (id: string): Promise<void> => {
  const docRef = doc(templatesCollection, id);
  await deleteDoc(docRef);
};

export const subscribeToTemplates = (callback: (templates: Template[]) => void) => {
  const templatesRef = ref(realtimeDb, 'templates');
  onValue(templatesRef, (snapshot) => {
    const data = snapshot.val();
    const templates: Template[] = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
    callback(templates);
  });
};

export const createTemplateRealtime = async (templateData: Omit<Template, 'id'>): Promise<string> => {
  const templatesRef = ref(realtimeDb, 'templates');
  const newTemplateRef = push(templatesRef);
  await set(newTemplateRef, {
    ...templateData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  return newTemplateRef.key!;
};

export const updateTemplateRealtime = async (id: string, updates: Partial<Template>): Promise<void> => {
  const templateRef = ref(realtimeDb, `templates/${id}`);
  await update(templateRef, { ...updates, updatedAt: new Date().toISOString() });
};

export const deleteTemplateRealtime = async (id: string): Promise<void> => {
  const templateRef = ref(realtimeDb, `templates/${id}`);
  await remove(templateRef);
};