import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import NewNotePage from './pages/NewNotePage';
import EditNotePage from './pages/EditNotePage';
import PublicNotesPage from './pages/PublicNotesPage';
import { getCategories } from './utils/storage';
import { Category } from './types';
import { ThemeProvider } from './context/ThemeContext';

export function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [appLoaded, setAppLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Load Google fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Load data
    setCategories(getCategories());
    setAppLoaded(true);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  if (!appLoaded) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="relative flex items-center justify-center w-12 h-12 mx-auto mb-4">
            <div className="absolute h-12 w-12 rounded-full animate-spin bg-gradient-to-b from-blue-500 to-transparent"></div>
            <div className="absolute flex items-center justify-center bg-white rounded-full h-[46px] w-[46px]">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-blue-600"
              >
                <path
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <div className="text-xl font-semibold text-gray-800">NoteMaster</div>
          <div className="text-sm text-gray-500 mt-1">Loading your notes...</div>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <Router>
        <div className="fixed inset-0 flex flex-col dark:bg-gray-900 transition-colors duration-200" style={{ fontFamily: 'Inter, sans-serif' }}>
          <Header toggleSidebar={toggleSidebar} onSearch={handleSearch} />
          <div className="flex flex-1 overflow-hidden">
            <Sidebar isOpen={sidebarOpen} categories={categories} />
            <main className="flex-1 overflow-hidden">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/new" element={<NewNotePage />} />
                <Route path="/edit/:id" element={<EditNotePage />} />
                <Route path="/public" element={<PublicNotesPage />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
