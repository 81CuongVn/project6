import { onValue, ref, set } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";

const AddWord: React.FC = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    id: "",
    word: "",
    meaning: "",
    example: "",
    category: "",
  });

  useEffect(() => {
    const wordsRef = ref(db, "words");

    const unsubscribe = onValue(wordsRef, (snapshot) => {
      const firebaseData = snapshot.val();
      const categoriesList = firebaseData ? Object.keys(firebaseData) : [];

      setCategories(categoriesList);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      setFormData((prev) => ({
        ...prev,
        category: categories[0],
      }));
    }
  }, [categories]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const wordKey = formData.word;
    const wordRef = ref(db, `words/${formData.category}/${wordKey}`);

    set(wordRef, {
      ...formData,
      id: formData.word,
      category: formData.category,
    })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-blue-800 mb-8 text-center">
        Add New Word
      </h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label
            htmlFor="word"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Word
          </label>
          <input
            type="text"
            id="word"
            name="word"
            value={formData.word}
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="meaning"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Meaning
          </label>
          <input
            type="text"
            id="meaning"
            name="meaning"
            value={formData.meaning}
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="example"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Example
          </label>
          <input
            type="text"
            id="example"
            name="example"
            value={formData.example}
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow hover:bg-blue-700 transition duration-300"
        >
          Add Word
        </button>
      </form>
    </div>
  );
};

export default AddWord;
