import { useNavigate } from 'react-router-dom';
import { Archive, Folder, LayoutGrid, Star, Tag, Trash } from 'lucide-react';
import { Category } from '../types';

interface SidebarProps {
  isOpen: boolean;
  categories: Category[];
}

export default function Sidebar({ isOpen, categories }: SidebarProps) {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  return (
    <aside className={`bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-full transition-all duration-300 ${isOpen ? 'w-64' : 'w-0'} overflow-hidden`}>
      <div className="p-4 h-full flex flex-col justify-between">
        <nav className="space-y-1">
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
          >
            <LayoutGrid size={18} />
            <span>All Notes</span>
          </button>
          <div className="py-2">
            <div className="px-3 mb-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Categories
            </div>
            <div className="space-y-1">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => navigate(`/category/${category.id}`)}
                  className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                >
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="py-2">
            <div className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Tags
            </div>
            <button
              onClick={() => navigate('/tags')}
              className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-200 rounded-lg"
            >
              <Tag size={18} />
              <span>All Tags</span>
            </button>
          </div>
          <div className="pt-4 mt-4 border-t border-gray-200">
            <button
              onClick={() => navigate('/favorites')}
              className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-200 rounded-lg"
            >
              <Star size={18} />
              <span>Favorites</span>
            </button>
            <button
              onClick={() => navigate('/archived')}
              className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-200 rounded-lg"
            >
              <Archive size={18} />
              <span>Archived</span>
            </button>
            <button
              onClick={() => navigate('/trash')}
              className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-200 rounded-lg"
            >
              <Trash size={18} />
              <span>Trash</span>
            </button>
          </div>
        </nav>
        <div className="mt-8 text-center text-xs text-gray-500 dark:text-gray-400">
          © {currentYear} Notely. All rights reserved.
        </div>
      </div>
    </aside>
  );
}
