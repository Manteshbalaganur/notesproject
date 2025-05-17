import { v4 as uuidv4 } from 'uuid';
import { Note, Category } from '../types';

// Default categories
const defaultCategories: Category[] = [
  { id: '1', name: 'Personal', color: '#4f46e5' },
  { id: '2', name: 'Work', color: '#10b981' },
  { id: '3', name: 'Ideas', color: '#f59e0b' },
  { id: '4', name: 'Tasks', color: '#ef4444' },
];

// Initialize storage with defaults if empty
const initializeStorage = () => {
  if (!localStorage.getItem('notes')) {
    localStorage.setItem('notes', JSON.stringify([]));
  }
  
  if (!localStorage.getItem('categories')) {
    localStorage.setItem('categories', JSON.stringify(defaultCategories));
  }
};

// Get all notes
export const getNotes = (): Note[] => {
  initializeStorage();
  return JSON.parse(localStorage.getItem('notes') || '[]');
};

// Get all categories
export const getCategories = (): Category[] => {
  initializeStorage();
  return JSON.parse(localStorage.getItem('categories') || '[]');
};

// Get a single note by ID
export const getNoteById = (id: string): Note | undefined => {
  const notes = getNotes();
  return notes.find(note => note.id === id);
};

// Create a new note
export const createNote = (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Note => {
  const notes = getNotes();
  const now = new Date().toISOString();
  
  const newNote: Note = {
    ...note,
    id: uuidv4(),
    createdAt: now,
    updatedAt: now,
    isImportant: note.isImportant || false,
    isPublic: note.isPublic || false
  };
  
  notes.push(newNote);
  localStorage.setItem('notes', JSON.stringify(notes));
  return newNote;
};

// Update an existing note
export const updateNote = (id: string, updatedNote: Partial<Omit<Note, 'id' | 'createdAt'>>): Note | undefined => {
  const notes = getNotes();
  const index = notes.findIndex(note => note.id === id);
  
  if (index !== -1) {
    const now = new Date().toISOString();
    notes[index] = {
      ...notes[index],
      ...updatedNote,
      updatedAt: now
    };
    
    localStorage.setItem('notes', JSON.stringify(notes));
    return notes[index];
  }
  
  return undefined;
};

// Move a note to trash
export const trashNote = (id: string): Note | undefined => {
  return updateNote(id, { isTrashed: true });
};

// Restore a note from trash
export const restoreNote = (id: string): Note | undefined => {
  return updateNote(id, { isTrashed: false });
};

// Archive a note
export const archiveNote = (id: string): Note | undefined => {
  return updateNote(id, { isArchived: true });
};

// Unarchive a note
export const unarchiveNote = (id: string): Note | undefined => {
  return updateNote(id, { isArchived: false });
};

// Favorite a note
export const favoriteNote = (id: string): Note | undefined => {
  return updateNote(id, { isFavorite: true });
};

// Unfavorite a note
export const unfavoriteNote = (id: string): Note | undefined => {
  return updateNote(id, { isFavorite: false });
};

// Delete a note (move to trash)
export const deleteNote = (id: string): boolean => {
  const trashed = trashNote(id);
  return !!trashed;
};

// Create a new category
export const createCategory = (category: Omit<Category, 'id'>): Category => {
  const categories = getCategories();
  
  const newCategory: Category = {
    ...category,
    id: uuidv4()
  };
  
  categories.push(newCategory);
  localStorage.setItem('categories', JSON.stringify(categories));
  return newCategory;
};
