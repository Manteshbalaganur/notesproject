import { useState, useEffect } from 'react';
import { createNote, getCategories } from '../utils/storage';
import { Category } from '../types';
import NoteForm from '../components/NoteForm';

export default function NewNotePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  
  useEffect(() => {
    setCategories(getCategories());
  }, []);

  const handleSave = (noteData: Parameters<typeof createNote>[0]) => {
    createNote(noteData);
  };

  return (
    <div className="h-full">
      <NoteForm 
        categories={categories}
        onSave={handleSave}
      />
    </div>
  );
}
