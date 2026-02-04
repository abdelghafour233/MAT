import React from 'react';
import { Category } from '../types';
import { CATEGORIES } from '../constants';

interface CategoryFilterProps {
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="w-full overflow-x-auto py-6 scrollbar-hide">
      <div className="flex gap-3 px-4 sm:px-0 min-w-max justify-center sm:justify-start">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 whitespace-nowrap border
              ${
                selectedCategory === cat.id
                  ? 'bg-secondary text-primary border-secondary shadow-lg transform scale-105'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary'
              }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;