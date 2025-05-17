import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNoteById, updateNote, deleteNote, getCategories } from '../utils/storage';
import { Note, Category } from '../types';
import NoteForm from '../components/NoteForm';

export default function EditNotePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [note, setNote] = useState<Note | undefined>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchedNote = getNoteById(id);
      const fetchedCategories = getCategories();
      
      setNote(fetchedNote);
      setCategories(fetchedCategories);
      setLoading(false);
      
      if (!fetchedNote) {
        navigate('/');
      }
    }
  }, [id, navigate]);

  const handleSave = (noteData: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (id) {
      updateNote(id, noteData);
    }
  };

  const handleDelete = () => {
    if (id && window.confirm('Are you sure you want to delete this note?')) {
      deleteNote(id);
      navigate('/');
    }
  };

  if (loading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="h-full">
      {note && (
        <NoteForm 
          note={note}
          categories={categories}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
