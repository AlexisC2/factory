import { User, Project, Template } from '../types';
import { getUsers, createUser, updateUser } from '../services/userService';
import { getProjects, createProject, updateProject } from '../services/projectService';
import { getTemplates, createTemplate, updateTemplate } from '../services/templateService';

// Local storage keys
const USERS_KEY = 'offline_users';
const PROJECTS_KEY = 'offline_projects';
const TEMPLATES_KEY = 'offline_templates';

// Utility functions for local storage
export const saveToLocalStorage = (key: string, data: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const loadFromLocalStorage = (key: string): any => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return null;
  }
};

// Sync users
export const syncUsers = async () => {
  if (navigator.onLine) {
    try {
      const remoteUsers = await getUsers();
      saveToLocalStorage(USERS_KEY, remoteUsers);
      return remoteUsers;
    } catch (error) {
      console.error('Error syncing users:', error);
      return loadFromLocalStorage(USERS_KEY) || [];
    }
  } else {
    return loadFromLocalStorage(USERS_KEY) || [];
  }
};

// Sync projects
export const syncProjects = async () => {
  if (navigator.onLine) {
    try {
      const remoteProjects = await getProjects();
      saveToLocalStorage(PROJECTS_KEY, remoteProjects);
      return remoteProjects;
    } catch (error) {
      console.error('Error syncing projects:', error);
      return loadFromLocalStorage(PROJECTS_KEY) || [];
    }
  } else {
    return loadFromLocalStorage(PROJECTS_KEY) || [];
  }
};

// Sync templates
export const syncTemplates = async () => {
  if (navigator.onLine) {
    try {
      const remoteTemplates = await getTemplates();
      saveToLocalStorage(TEMPLATES_KEY, remoteTemplates);
      return remoteTemplates;
    } catch (error) {
      console.error('Error syncing templates:', error);
      return loadFromLocalStorage(TEMPLATES_KEY) || [];
    }
  } else {
    return loadFromLocalStorage(TEMPLATES_KEY) || [];
  }
};

// Upload local changes when online
export const uploadLocalChanges = async () => {
  if (!navigator.onLine) return;

  // For simplicity, assume local data is the source of truth when offline
  // In a real app, you'd track changes and merge
  const localUsers = loadFromLocalStorage(USERS_KEY);
  if (localUsers) {
    for (const user of localUsers) {
      try {
        await updateUser(user.id, user);
      } catch (error) {
        console.error('Error uploading user:', error);
      }
    }
  }

  const localProjects = loadFromLocalStorage(PROJECTS_KEY);
  if (localProjects) {
    for (const project of localProjects) {
      try {
        await updateProject(project.id, project);
      } catch (error) {
        console.error('Error uploading project:', error);
      }
    }
  }

  const localTemplates = loadFromLocalStorage(TEMPLATES_KEY);
  if (localTemplates) {
    for (const template of localTemplates) {
      try {
        await updateTemplate(template.id, template);
      } catch (error) {
        console.error('Error uploading template:', error);
      }
    }
  }
};