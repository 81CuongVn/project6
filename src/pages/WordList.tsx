import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WordCard from "../components/WordCard";
import { onValue, ref } from "firebase/database";
import { db } from "../firebaseConfig";

export interface Word {
  id: string;
  word: string;
  meaning: string;
  example: string;
  category: string;
}

interface Category {
  [key: string]: { [key: string]: Word };
}

const WordList: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<Category>({});
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    const wordsRef = ref(db, "words");

    const unsubscribe = onValue(wordsRef, (snapshot) => {
      const firebaseData = snapshot.val();
      setData(firebaseData || {});
    });

    return () => unsubscribe();
  }, []);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const filteredData =
    selectedCategory === "all"
      ? data
      : { [selectedCategory]: data[selectedCategory] };

  return (
    <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Word List</h1>
        <button
          onClick={() => navigate("/add-word")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition duration-300"
        >
          Add New Word
        </button>
      </div>
      <div className="mb-6">
        <label
          htmlFor="category"
          className="block text-lg font-medium text-gray-700 mb-2"
        >
          Filter by Category:
        </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="block w-full max-w-xs p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">All</option>
          {Object.keys(data).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      {Object.entries(filteredData).map(([category, words]) => (
        <div key={category} className="mb-12">
          <h2 className="text-3xl font-bold text-blue-700 capitalize mb-6 border-b-2 border-blue-300 pb-2">
            {category}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Object.values(words).map((word: Word) => (
              <WordCard key={word.id} word={{ ...word, category }} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WordList;
